import { auth } from "@/config/auth";
import { NextResponse } from "next/server";
import { pool } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { itemId, itemType, value } = body;
    const userId = session.user.id;
    if (itemType === "post") {
      // Handle post votes
      const existingVoteResult = await pool.query(
        'SELECT * FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2',
        [userId, itemId]
      );
      const existingVote = existingVoteResult.rows[0];
      let scoreChange = value;
      if (existingVote) {
        scoreChange = value - existingVote.value;
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
      await pool.query(
        'UPDATE "Post" SET score = score + $1 WHERE id = $2',
        [scoreChange, itemId]
      );
    } else {
      // Handle comment votes
      const existingVoteResult = await pool.query(
        'SELECT * FROM "CommentVote" WHERE "userId" = $1 AND "commentId" = $2',
        [userId, itemId]
      );
      const existingVote = existingVoteResult.rows[0];
      let scoreChange = value;
      if (existingVote) {
        scoreChange = value - existingVote.value;
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
      await pool.query(
        'UPDATE "Comment" SET score = score + $1 WHERE id = $2',
        [scoreChange, itemId]
      );
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
