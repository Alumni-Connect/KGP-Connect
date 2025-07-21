import { NextResponse } from "next/server";
import { pool } from "@/lib/prisma";
import { auth } from "@/config/auth";

function logError(
  method: string,
  error: any,
  userId?: number,
  postId?: number,
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
    const { postId: postIdParam, value } = await req.json();
    
    // Parse postId to integer
    const postId = parseInt(postIdParam, 10);
    if (isNaN(postId) || ![1, -1].includes(value)) {
      logError(
        "POST",
        new Error(`Invalid request data: postId=${postIdParam}, value=${value}`),
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
    let postId: number | undefined;
    let userId: number | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id;
      const body = await req.json();
      postId = parseInt(body.postId, 10);
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

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      logError("DELETE", new Error("Unauthorized access attempt"));
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const url = new URL(req.url);
    const postIdParam = url.searchParams.get("postId");
    
    // Parse postId to integer
    if (!postIdParam) {
      logError("DELETE", new Error("Missing postId parameter"), userId);
      return NextResponse.json(
        { error: "Missing postId parameter" },
        { status: 400 },
      );
    }
    
    const postId = parseInt(postIdParam, 10);
    if (isNaN(postId)) {
      logError("DELETE", new Error(`Invalid postId: ${postIdParam}`), userId);
      return NextResponse.json(
        { error: "Invalid postId" },
        { status: 400 },
      );
    }
    
    const deleteResult = await pool.query(
      'DELETE FROM "PostVote" WHERE "userId" = $1 AND "postId" = $2 RETURNING *',
      [userId, postId]
    );
    if (deleteResult.rows.length === 0) {
      logError(
        "DELETE",
        new Error("Vote not found"),
        userId,
        postId,
      );
      return NextResponse.json({ error: "Vote not found" }, { status: 404 });
    }
    // Update post score after deletion
    await updatePostScore(postId);
    return NextResponse.json({ message: "Vote deleted successfully" });
  } catch (error) {
    let postId: number | undefined;
    let userId: number | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id;
      const url = new URL(req.url);
      const postIdParam = url.searchParams.get("postId");
      postId = postIdParam ? parseInt(postIdParam, 10) : undefined;
    } catch {}
    logError("DELETE", error, userId, postId);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const url = new URL(req.url);
    const postIdParam = url.searchParams.get("postId");
    
    // Parse postId to integer
    if (!postIdParam) {
      return NextResponse.json(
        { error: "Missing postId parameter" },
        { status: 400 },
      );
    }
    
    const postId = parseInt(postIdParam, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid postId" },
        { status: 400 },
      );
    }
    
    const votesResult = await pool.query(
      'SELECT * FROM "PostVote" WHERE "postId" = $1',
      [postId]
    );
    const votes = votesResult.rows;
    await pool.query(
      'UPDATE "Post" SET score = $1 WHERE id = $2',
      [votes.reduce((sum, vote) => sum + vote.value, 0), postId]
    );
    return NextResponse.json(votes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
