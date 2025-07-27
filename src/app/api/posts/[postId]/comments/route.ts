import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const parentIdParam = searchParams.get("parentId");
    const sort = searchParams.get("sort") || "best";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const POST = await params;

    // Parse postId to integer
    const postId = parseInt(POST.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Parse parentId to integer if provided
    let parentId: number | null = null;
    if (parentIdParam) {
      parentId = parseInt(parentIdParam, 10);
      if (isNaN(parentId)) {
        return NextResponse.json({ error: "Invalid parent ID" }, { status: 400 });
      }
    }

    let orderBy = 'ORDER BY c."score" DESC, c."createdAt" DESC';
    if (sort === "new") orderBy = 'ORDER BY c."createdAt" DESC';
    else if (sort === "top") orderBy = 'ORDER BY c."score" DESC';
    else if (sort === "controversial") orderBy = 'ORDER BY c."score" ASC, (SELECT COUNT(*) FROM "Comment" r WHERE r."parentId" = c.id) DESC';
    
    // Fetch comments with user vote information if user is logged in
    const userVoteJoin = session?.user?.id 
      ? 'LEFT JOIN "CommentVote" cv ON c.id = cv."commentId" AND cv."userId" = $' + (parentId ? 5 : 4)
      : '';
    const userVoteSelect = session?.user?.id 
      ? ', cv.value as "userVote"'
      : ', NULL as "userVote"';
    
    const commentsQuery = `
      SELECT c.*, 
        json_build_object('id', u.id, 'name', u.name, 'image', u.image, 'role', u.role) as author,
        (SELECT COUNT(*) FROM "Comment" r WHERE r."parentId" = c.id) as repliesCount
        ${userVoteSelect}
      FROM "Comment" c
      JOIN "users" u ON c."authorId" = u.id
      ${userVoteJoin}
      WHERE c."postId" = $1 AND c."parentId" ${parentId ? '= $2' : 'IS NULL'}
      ${orderBy}
      OFFSET $${parentId ? 3 : 2}
      LIMIT $${parentId ? 4 : 3}
    `;
    
    const values = session?.user?.id
      ? (parentId ? [postId, parentId, (page - 1) * limit, limit, session.user.id] : [postId, (page - 1) * limit, limit, session.user.id])
      : (parentId ? [postId, parentId, (page - 1) * limit, limit] : [postId, (page - 1) * limit, limit]);
    
    const commentsResult = await pool.query(commentsQuery, values);
    const comments = commentsResult.rows;
    // Recursive function to fetch nested replies up to depth 3
    const fetchNestedReplies = async (comment: any, currentDepth: number = 0): Promise<any> => {
      if (currentDepth >= 3) {
        return { ...comment, replies: [] };
      }

      const replyUserVoteJoin = session?.user?.id 
        ? 'LEFT JOIN "CommentVote" rcv ON c.id = rcv."commentId" AND rcv."userId" = $2'
        : '';
      const replyUserVoteSelect = session?.user?.id 
        ? ', rcv.value as "userVote"'
        : ', NULL as "userVote"';
      
      const repliesQuery = `
        SELECT c.*, 
          json_build_object('id', u.id, 'name', u.name, 'image', u.image, 'role', u.role) as author,
          (SELECT COUNT(*) FROM "Comment" r WHERE r."parentId" = c.id) as repliesCount
          ${replyUserVoteSelect}
        FROM "Comment" c
        JOIN "users" u ON c."authorId" = u.id
        ${replyUserVoteJoin}
        WHERE c."parentId" = $1 AND c.status = 'active'
        ${orderBy}
        LIMIT 3
      `;
      
      const replyValues = session?.user?.id 
        ? [comment.id, session.user.id]
        : [comment.id];
      
      const repliesResult = await pool.query(repliesQuery, replyValues);
      const replies = repliesResult.rows;

      // Recursively fetch nested replies for each reply
      const nestedReplies = await Promise.all(
        replies.map(reply => fetchNestedReplies(reply, currentDepth + 1))
      );

      return {
        ...comment,
        replies: nestedReplies,
        hasMoreReplies: comment.repliescount > replies.length,
      };
    };

    // Fetch comments with nested replies
    const commentsWithReplies = await Promise.all(
      comments.map(comment => fetchNestedReplies(comment))
    );
    return NextResponse.json(commentsWithReplies);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
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

    const body = await request.json();
    const { content, parentId: parentIdParam } = body;
    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 },
      );
    }

    // Parse parentId to integer if provided
    let parentId: number | null = null;
    if (parentIdParam) {
      parentId = parseInt(parentIdParam, 10);
      if (isNaN(parentId)) {
        return NextResponse.json({ error: "Invalid parent ID" }, { status: 400 });
      }
    }

    const postResult = await pool.query('SELECT id FROM "Post" WHERE id = $1', [postId]);
    if (postResult.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    let path: number[] = [];
    let depth = 0;
    if (parentId) {
      const parentCommentResult = await pool.query('SELECT path, "postId", depth FROM "Comment" WHERE id = $1', [parentId]);
      const parentComment = parentCommentResult.rows[0];
      if (!parentComment) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 },
        );
      }
      if (parentComment.postId !== postId) {
        return NextResponse.json(
          { error: "Parent comment does not belong to this post" },
          { status: 400 },
        );
      }
      
      // Enforce maximum depth of 3
      if (parentComment.depth >= 3) {
        return NextResponse.json(
          { error: "Maximum comment depth reached" },
          { status: 400 },
        );
      }
      
      path = [...parentComment.path, parentId];
      depth = path.length;
    }
    if (!session.user?.id) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 },
      );
    }
    const commentInsertQuery = `
      INSERT INTO "Comment" (content, "postId", "parentId", "authorId", path, depth, score, status)
      VALUES ($1, $2, $3, $4, $5, $6, 0, 'active')
      RETURNING *
    `;
    const commentResult = await pool.query(commentInsertQuery, [content, postId, parentId, session.user.id, path, depth]);
    const comment = commentResult.rows[0];
    // Fetch author info
    const authorResult = await pool.query('SELECT id, name, image, role FROM "users" WHERE id = $1', [session.user.id]);
    comment.author = authorResult.rows[0];
    // Update post comment count
    await pool.query('UPDATE "Post" SET "commentCount" = "commentCount" + 1 WHERE id = $1', [postId]);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  try {
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

    let commentId: number;
    if (POST.commentId) {
      commentId = parseInt(POST.commentId, 10);
      if (isNaN(commentId)) {
        return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
      }
    } else {
      const url = new URL(request.url);
      const commentIdParam = url.searchParams.get("commentId");
      if (!commentIdParam) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 },
        );
      }
      commentId = parseInt(commentIdParam, 10);
      if (isNaN(commentId)) {
        return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
      }
    }

    const commentResult = await pool.query('SELECT "authorId", "postId" FROM "Comment" WHERE id = $1', [commentId]);
    const comment = commentResult.rows[0];

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.postId !== postId) {
      return NextResponse.json(
        { error: "Comment does not belong to this post" },
        { status: 400 },
      );
    }

    const userResult = await pool.query('SELECT role FROM "users" WHERE id = $1', [session.user.id]);
    const user = userResult.rows[0];

    if (comment.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { content } = await request.json();

    const updatedCommentResult = await pool.query('UPDATE "Comment" SET content = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *', [content, new Date(), commentId]);
    const updatedComment = updatedCommentResult.rows[0];

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; commentId: string }> },
) {
  try {
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

    let commentId: number;
    if (POST.commentId) {
      commentId = parseInt(POST.commentId, 10);
      if (isNaN(commentId)) {
        return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
      }
    } else {
      const url = new URL(request.url);
      const commentIdParam = url.searchParams.get("commentId");
      if (!commentIdParam) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 },
        );
      }
      commentId = parseInt(commentIdParam, 10);
      if (isNaN(commentId)) {
        return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
      }
    }

    const commentResult = await pool.query('SELECT "authorId", "postId" FROM "Comment" WHERE id = $1', [commentId]);
    const comment = commentResult.rows[0];

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.postId !== postId) {
      return NextResponse.json(
        { error: "Comment does not belong to this post" },
        { status: 400 },
      );
    }

    const userResult = await pool.query('SELECT role FROM "users" WHERE id = $1', [session.user.id]);
    const user = userResult.rows[0];

    if (comment.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await pool.query('UPDATE "Comment" SET status = $1, content = $2, "updatedAt" = $3 WHERE id = $4', ['deleted', '[deleted]', new Date(), commentId]);

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
