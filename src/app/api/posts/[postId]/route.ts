import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import Post from "@/components/Post";

const UPLOAD_DIR = path.join(process.cwd(), "public", "posts");
const PUBLIC_URL_BASE = "/posts";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const POST = await params;
    // Parse postId to integer
    const postId = parseInt(POST.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const postResult = await pool.query(`
      SELECT p.*, 
        json_build_object('id', u.id, 'name', u.name, 'image', u.image, 'role', u.role) as author,
        (SELECT COUNT(*) FROM "Comment" c WHERE c."postId" = p.id) as "commentsCount",
        (SELECT COUNT(*) FROM "PostVote" v WHERE v."postId" = p.id) as "postVotesCount"
      FROM "Post" p
      JOIN "users" u ON p."authorId" = u.id
      WHERE p.id = $1
    `, [postId]);
    const post = postResult.rows[0];
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (typeof post.content === "string") {
      try {
        post.content = JSON.parse(post.content);
      } catch (e) {
        console.log("Error parsing post content:", e);
      }
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth();
    const POST = await params;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse postId to integer
    const postId = parseInt(POST.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const postResult = await pool.query(
      'SELECT "authorId", type, content FROM "Post" WHERE id = $1',
      [postId]
    );
    const post = postResult.rows[0];
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    // Check user permissions
    const userResult = await pool.query('SELECT role FROM users WHERE id = $1', [session.user.id]);
    const user = userResult.rows[0];
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { title, content, subreddit, type, caption } = await req.json();
    // Process content if it's an object
    let processedContent = content;
    if (typeof content === "object") {
      processedContent = JSON.stringify(content);
    }
    // Update the post
    const updateQuery = `
      UPDATE "Post"
      SET title = $1, caption = $2, content = $3, subreddit = $4, type = $5, "updatedAt" = NOW(), "isVerified" = COALESCE($6, "isVerified")
      WHERE id = $7
      RETURNING *
    `;
    const isVerified = user?.role === "ADMIN" ? true : undefined;
    const updatedPostResult = await pool.query(updateQuery, [title, caption, processedContent, subreddit, type, isVerified, postId]);
    const updatedPost = updatedPostResult.rows[0];
    // Parse the content back if it was stored as JSON
    let returnContent = updatedPost.content;
    if (typeof updatedPost.content === "string") {
      try {
        returnContent = JSON.parse(updatedPost.content);
      } catch (e) {}
    }
    return NextResponse.json({
      ...updatedPost,
      content: returnContent,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const POST = await params;

    // Parse postId to integer
    const postId = parseInt(POST.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Fetch the post to verify ownership and get content info
    const postResult = await pool.query('SELECT "authorId", type, content FROM "Post" WHERE id = $1', [postId]);
    const post = postResult.rows[0];
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    // Check user permissions
    const userResult = await pool.query('SELECT role FROM users WHERE id = $1', [session.user.id]);
    const user = userResult.rows[0];
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Handle media file deletion
    if (post.type === "image" || post.type === "video") {
      try {
        let content: any;
        if (typeof post.content === "string") {
          content = JSON.parse(post.content);
        } else {
          content = post.content;
        }
        if (content && content.mediaUrl) {
          const mediaUrl = content.mediaUrl;
          const relativePath = mediaUrl.replace(PUBLIC_URL_BASE, "");
          const filePath = path.join(UPLOAD_DIR, relativePath);
          if (existsSync(filePath)) {
              await unlink(filePath);
          }
        }
      } catch (e) {
        // Ignore file deletion errors
      }
    }
    // Delete related votes and comments
    await pool.query('DELETE FROM "PostVote" WHERE "postId" = $1', [postId]);
    await pool.query('DELETE FROM "Comment" WHERE "postId" = $1', [postId]);
      // Delete the post
    await pool.query('DELETE FROM "Post" WHERE id = $1', [postId]);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}

export const runtime = 'nodejs';
