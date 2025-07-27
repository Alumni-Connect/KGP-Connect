import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";

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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const PARAMS = await params;
    const postId = parseInt(PARAMS.postId, 10);
    const commentId = parseInt(PARAMS.commentId, 10);

    if (isNaN(postId) || isNaN(commentId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const { value } = await request.json();
    if (![1, -1].includes(value)) {
      return NextResponse.json(
        { error: "Invalid vote value. Must be 1 or -1" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Verify comment exists and belongs to the post
    const commentResult = await pool.query(
      'SELECT "postId" FROM "Comment" WHERE id = $1',
      [commentId]
    );
    
    if (commentResult.rows.length === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    
    if (commentResult.rows[0].postId !== postId) {
      return NextResponse.json(
        { error: "Comment does not belong to this post" },
        { status: 400 }
      );
    }

    // Check for existing vote
    const existingVoteResult = await pool.query(
      'SELECT * FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2',
      [userId, commentId]
    );
    const existingVote = existingVoteResult.rows[0];

    let vote;
    if (existingVote) {
      // Update existing vote
      const updateResult = await pool.query(
        'UPDATE "CommentVote" SET value = $1 WHERE id = $2 RETURNING *',
        [value, existingVote.id]
      );
      vote = updateResult.rows[0];
    } else {
      // Create new vote
      const createResult = await pool.query(
        'INSERT INTO "CommentVote" ("userId", "commentId", value) VALUES ($1, $2, $3) RETURNING *',
        [userId, commentId, value]
      );
      vote = createResult.rows[0];
    }

    // Update comment score using proper aggregation
    await updateCommentScore(commentId);

    return NextResponse.json(vote);
  } catch (error) {
    console.error("Error processing comment vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const PARAMS = await params;
    const postId = parseInt(PARAMS.postId, 10);
    const commentId = parseInt(PARAMS.commentId, 10);

    if (isNaN(postId) || isNaN(commentId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const userId = session.user.id;

    // Delete the vote
    const deleteResult = await pool.query(
      'DELETE FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2 RETURNING *',
      [userId, commentId]
    );

    if (deleteResult.rows.length === 0) {
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }

    // Update comment score using proper aggregation
    await updateCommentScore(commentId);

    return NextResponse.json({ message: "Vote removed successfully" });
  } catch (error) {
    console.error("Error removing comment vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 