import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  try {
    const jobsResult = await pool.query('SELECT * FROM "jobs" WHERE status = $1 AND "isVerified" = $2', ["open", true]);
    const jobs = jobsResult.rows;
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
