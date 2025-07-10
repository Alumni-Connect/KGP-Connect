import { NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";

function logError(
  method: string,
  error: any,
  userId?: string,
  postId?: string,
) {
  const timestamp = new Date().toISOString();
  const errorDetails = {
    timestamp,
    method,
    userId,
    postId,
    errorMessage: error.message || "Unknown error",
    stack: error.stack,
  };
  console.error(
    `[${timestamp}] POST VOTE ERROR (${method}):`,
    JSON.stringify(errorDetails, null, 2),
  );
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      logError("POST", new Error("Unauthorized access attempt"));
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];
    if (!user || !["ALUM", "ADMIN", "STUDENT"].includes(user.role)) {
      logError(
        "POST",
        new Error(`Forbidden access attempt with role: ${user?.role}`),
        userId,
      );
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { postId, value } = await req.json();
    if (!postId || ![1, -1].includes(value)) {
      logError(
        "POST",
        new Error(`Invalid request data: postId=${postId}, value=${value}`),
        userId,
        postId,
      );
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }
    const existingVoteResult = await pool.query(
      'SELECT * FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2',
      [user.id, postId]
    );
    const existingVote = existingVoteResult.rows[0];
    let vote;
    if (existingVote) {
      // Update existing vote
      const updateResult = await pool.query(
        'UPDATE "PostVote" SET value = $1 WHERE id = $2 RETURNING *',
        [value, existingVote.id]
      );
      vote = updateResult.rows[0];
    } else {
      // Create new vote
      const createResult = await pool.query(
        'INSERT INTO "PostVote" ("userId", "postId", value) VALUES ($1, $2, $3) RETURNING *',
        [user.id, postId, value]
      );
      vote = createResult.rows[0];
    }
    // Update post score
    await updatePostScore(postId);
    return NextResponse.json(vote);
  } catch (error) {
    let postId: string | undefined;
    let userId: string | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id;
      const body = await req.json();
      postId = body.postId;
    } catch {
      return NextResponse.json(
        { error: "Request parsing failed" },
        { status: 400 },
      );
    }
    logError("POST", error, userId, postId);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  let postId: string | null = null;
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      logError("DELETE", new Error("Unauthorized access attempt"));
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const url = new URL(req.url);
    postId = url.searchParams.get("postId");
    if (!postId) {
      logError("DELETE", new Error("Missing postId in request"), userId);
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }
    try {
      const deleteResult = await pool.query(
        'DELETE FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2',
        [userId, postId]
      );
      if (deleteResult.rowCount === 0) {
        logError(
          "DELETE",
          new Error(`Vote not found: userId=${userId}, postId=${postId}`),
          userId,
          postId,
        );
        return NextResponse.json({ error: "Vote not found" }, { status: 404 });
      }
    } catch (deleteError: any) {
      throw deleteError;
    }
    await updatePostScore(postId);
    return NextResponse.json({ message: "Vote removed successfully" });
  } catch (error) {
    let userId: string | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id;
    } catch {
      // If session retrieval fails, proceed without the userId
    }
    logError("DELETE", error, userId, postId || undefined);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Helper function to update post score
async function updatePostScore(postId: string) {
  try {
    const votesResult = await pool.query(
      'SELECT value FROM "PostVote" WHERE "postId" = $1',
      [postId]
    );
    const votes = votesResult.rows;
    const score = votes.reduce((acc, vote) => acc + vote.value, 0);
    await pool.query(
      'UPDATE "Post" SET score = $1 WHERE id = $2',
      [score, postId]
    );
  } catch (error) {
    logError("updatePostScore", error, undefined, postId);
  }
}
