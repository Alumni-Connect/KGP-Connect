import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";
import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "posts");
const PUBLIC_URL_BASE = process.env.PUBLIC_URL_BASE || "/posts";

import crypto from "crypto";

function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  const extension = path.extname(originalName);
  return `${timestamp}-${randomString}${extension}`;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const subreddit = url.searchParams.get("subreddit");
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const sort = url.searchParams.get("sort") || "new";
    const skip = (page - 1) * limit;

    let whereClause = "";
    let values: any[] = [];
    if (subreddit) {
      whereClause = "WHERE p.subreddit = $1";
      values.push(subreddit);
    }

    let orderBy = "ORDER BY p.\"createdAt\" DESC";
    if (sort === "top") orderBy = "ORDER BY p.score DESC";
    else if (sort === "commented") orderBy = "ORDER BY p.\"commentCount\" DESC";
    else if (sort === "verified") orderBy = "ORDER BY p.\"isVerified\" DESC, p.\"createdAt\" DESC";

    // Main posts query with author and counts
    const postsQuery = `
      SELECT p.*, 
        json_build_object('id', u.id, 'name', u.name, 'image', u.image, 'role', u.role) as author,
        (SELECT COUNT(*) FROM "Comment" c WHERE c."postId" = p.id) as "commentsCount",
        (SELECT COUNT(*) FROM "PostVote" v WHERE v."postId" = p.id) as "postVotesCount"
      FROM "Post" p
      JOIN "users" u ON p."authorId" = u.id
      ${whereClause}
      ${orderBy}
      OFFSET $${values.length + 1}
      LIMIT $${values.length + 2}
    `;
    const postsResult = await pool.query(postsQuery, [...values, skip, limit]);
    const posts = postsResult.rows.map((post) => {
      try {
        if (typeof post.content === "string") {
          return {
            ...post,
            content: JSON.parse(post.content),
            _count: {
              comments: post.commentsCount,
              PostVote: post.postVotesCount,
            },
          };
        }
      } catch (e) {}
      return post;
    });

    // Total count
    const countQuery = `SELECT COUNT(*) FROM "Post" p ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const totalPosts = parseInt(countResult.rows[0].count, 10);

    return NextResponse.json({
      posts,
      pagination: {
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await pool.query("SELECT * FROM \"users\" WHERE id = $1", [session.user.id]);

    if (user.rows.length === 0 || !["ALUM", "ADMIN"].includes(user.rows[0].role)) {
      return NextResponse.json(
        { error: "Forbidden - Only Alumni and Admins can create posts" },
        { status: 403 },
      );
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const subreddit = formData.get("subreddit") as string;
      const caption = (formData.get("caption") as string) || "";
      const mediaFile = formData.get("media") as File;
      const type =
        (formData.get("type") as string) ||
        (mediaFile.type.startsWith("image/") ? "image" : "video");

      if (!title || !subreddit || !mediaFile) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      if (
        !mediaFile.type.startsWith("image/") &&
        !mediaFile.type.startsWith("video/")
      ) {
        return NextResponse.json(
          {
            error: "Invalid media type. Only images and videos are supported.",
          },
          { status: 400 },
        );
      }

      // Use string conversion of user ID for file path
      const userDir = path.join(UPLOAD_DIR, user.rows[0].id.toString());
      const mediaTypeDir = path.join(userDir, type);

      if (!existsSync(mediaTypeDir)) {
        await mkdir(mediaTypeDir, { recursive: true });
      }

      const uniqueFilename = generateUniqueFilename(mediaFile.name);
      const filePath = path.join(mediaTypeDir, uniqueFilename);

      const fileBuffer = Buffer.from(await mediaFile.arrayBuffer());
      await writeFile(filePath, fileBuffer);

      const mediaUrl = `${PUBLIC_URL_BASE}/${user.rows[0].id}/${type}/${uniqueFilename}`;

      const structuredContent = {
        mediaUrl,
        mediaType: mediaFile.type,
        caption,
      };

      const post = await pool.query(`
        INSERT INTO "Post" (title, content, subreddit, type, "authorId", "isVerified", score, "commentCount", caption)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [title, JSON.stringify(structuredContent), subreddit, type, user.rows[0].id, user.rows[0].role === "ADMIN", 0, 0, caption]);

      return NextResponse.json({
        ...post.rows[0],
        content: structuredContent,
      });
    } else {
      const {
        title,
        content,
        subreddit,
        type = "text",
        caption,
      } = await req.json();

      if (!title || !content || !subreddit) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      let processedContent = content;
      if (typeof content === "object") {
        processedContent = JSON.stringify(content);
      }

      const post = await pool.query(`
        INSERT INTO "Post" (title, caption, content, subreddit, type, "authorId", "isVerified", score, "commentCount")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [title, caption, processedContent, subreddit, type, user.rows[0].id, user.rows[0].role === "ADMIN", 0, 0]);

      let returnContent = post.rows[0].content;
      if (typeof post.rows[0].content === "string") {
        try {
          returnContent = JSON.parse(post.rows[0].content);
        } catch (e) {
          console.error("Error parsing post content:", e);
        }
      }

      return NextResponse.json({
        ...post.rows[0],
        content: returnContent,
      });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const postIdParam = url.searchParams.get("id");

    if (!postIdParam) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    // Parse postId to integer
    const postId = parseInt(postIdParam, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 },
      );
    }

    const post = await pool.query("SELECT * FROM \"Post\" WHERE id = $1", [postId]);

    if (post.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const user = await pool.query("SELECT * FROM \"users\" WHERE id = $1", [session.user.id]);

    if (user.rows.length === 0 || (post.rows[0].authorId !== user.rows[0].id && user.rows[0].role !== "ADMIN")) {
      return NextResponse.json(
        { error: "You do not have permission to delete this post" },
        { status: 403 },
      );
    }

    if (post.rows[0].type === "image" || post.rows[0].type === "video") {
      try {
        let content: any;
        if (typeof post.rows[0].content === "string") {
          content = JSON.parse(post.rows[0].content);
        } else {
          content = post.rows[0].content;
        }

        if (content && content.mediaUrl) {
          const mediaUrl = content.mediaUrl;

          const relativePath = mediaUrl.replace(PUBLIC_URL_BASE, "");

          const filePath = path.join(UPLOAD_DIR, relativePath);

          if (existsSync(filePath)) {
            try {
              await unlink(filePath);
              console.log(`Deleted media file: ${filePath}`);
            } catch (fileError) {
              console.error(
                `Error deleting media file: ${filePath}`,
                fileError,
              );
            }
          }
        }
      } catch (contentError) {
        console.error(
          "Error parsing post content for media deletion:",
          contentError,
        );
      }
    }

    await pool.query("DELETE FROM \"PostVote\" WHERE \"postId\" = $1", [postId]);

    await pool.query("DELETE FROM \"Comment\" WHERE \"postId\" = $1", [postId]);

    await pool.query("DELETE FROM \"Post\" WHERE id = $1", [postId]);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const runtime = 'nodejs';
