import { auth } from "@/config/auth";
import { NextResponse } from "next/server";
import { pool } from "@/lib/prisma";

async function updatePostScore(postId: number) {
  try {
    const scoreResult = await pool.query(
      'SELECT SUM(value) as total_score FROM "PostVote" WHERE "postId" = $1',
      [postId]
    );
    const totalScore = scoreResult.rows[0]?.total_score || 0;
    await pool.query(
      'UPDATE "Post" SET score = $1 WHERE id = $2',
      [totalScore, postId]
    );
  } catch (error) {
    console.error('Error updating post score:', error);
  }
}

async function updateCommentScore(commentId: number) {
  try {
    const scoreResult = await pool.query(
      'SELECT SUM(value) as total_score FROM "CommentVote" WHERE "commentId" = $1',
      [commentId]
    );
    const totalScore = scoreResult.rows[0]?.total_score || 0;
    await pool.query(
      'UPDATE "Comment" SET score = $1 WHERE id = $2',
      [totalScore, commentId]
    );
  } catch (error) {
    console.error('Error updating comment score:', error);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { itemId: itemIdParam, itemType, value } = body;
    const userId = session.user.id;

    // Parse itemId to integer
    const itemId = parseInt(itemIdParam, 10);
    if (isNaN(itemId) || ![1, -1].includes(value)) {
      return NextResponse.json({ error: "Invalid item ID or vote value" }, { status: 400 });
    }

    if (itemType === "post") {
      // Handle post votes
      const existingVoteResult = await pool.query(
        'SELECT * FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2',
        [userId, itemId]
      );
      const existingVote = existingVoteResult.rows[0];
      
      if (existingVote) {
        await pool.query(
          'UPDATE "PostVote" SET value = $1 WHERE "userId" = $2 AND "postId" = $3',
          [value, userId, itemId]
        );
      } else {
        await pool.query(
          'INSERT INTO "PostVote" ("userId", "postId", value) VALUES ($1, $2, $3)',
          [userId, itemId, value]
        );
      }
      
      // Update post score using proper aggregation
      await updatePostScore(itemId);
    } else {
      // Handle comment votes
      const existingVoteResult = await pool.query(
        'SELECT * FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2',
        [userId, itemId]
      );
      const existingVote = existingVoteResult.rows[0];
      
      if (existingVote) {
        await pool.query(
          'UPDATE "CommentVote" SET value = $1 WHERE "userId" = $2 AND "commentId" = $3',
          [value, userId, itemId]
        );
      } else {
        await pool.query(
          'INSERT INTO "CommentVote" ("userId", "commentId", value) VALUES ($1, $2, $3)',
          [userId, itemId, value]
        );
      }
      
      // Update comment score using proper aggregation
      await updateCommentScore(itemId);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const url = new URL(request.url);
    const itemIdParam = url.searchParams.get("itemId");
    const itemType = url.searchParams.get("itemType");
    const userId = session.user.id;

    if (!itemIdParam || !itemType) {
      return NextResponse.json(
        { error: "Missing itemId or itemType parameter" },
        { status: 400 }
      );
    }

    const itemId = parseInt(itemIdParam, 10);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    if (itemType === "post") {
      const deleteResult = await pool.query(
        'DELETE FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2 RETURNING *',
        [userId, itemId]
      );
      
      if (deleteResult.rows.length === 0) {
        return NextResponse.json({ error: "Vote not found" }, { status: 404 });
      }
      
      await updatePostScore(itemId);
    } else {
      const deleteResult = await pool.query(
        'DELETE FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2 RETURNING *',
        [userId, itemId]
      );
      
      if (deleteResult.rows.length === 0) {
        return NextResponse.json({ error: "Vote not found" }, { status: 404 });
      }
      
      await updateCommentScore(itemId);
    }

    return NextResponse.json({ message: "Vote removed successfully" });
  } catch (error) {
    console.error("Delete vote error:", error);
    return NextResponse.json(
      { error: "Failed to remove vote" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const url = new URL(request.url);
    const itemIdParam = url.searchParams.get("itemId");
    const itemType = url.searchParams.get("itemType");
    const userId = session.user.id;

    if (!itemIdParam || !itemType) {
      return NextResponse.json(
        { error: "Missing itemId or itemType parameter" },
        { status: 400 }
      );
    }

    const itemId = parseInt(itemIdParam, 10);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    if (itemType === "post") {
      const voteResult = await pool.query(
        'SELECT * FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2',
        [userId, itemId]
      );
      return NextResponse.json({ vote: voteResult.rows[0] || null });
    } else {
      const voteResult = await pool.query(
        'SELECT * FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2',
        [userId, itemId]
      );
      return NextResponse.json({ vote: voteResult.rows[0] || null });
    }
  } catch (error) {
    console.error("Get vote error:", error);
    return NextResponse.json(
      { error: "Failed to get vote" },
      { status: 500 }
    );
  }
}
