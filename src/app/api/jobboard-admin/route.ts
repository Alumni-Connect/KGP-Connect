import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }
  try {
    // Check if the user is an ALUM
    const userResult = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Fetch jobs for the ALUM user
    const jobsResult = await pool.query('SELECT * FROM "jobs" WHERE "userId" = $1 ORDER BY "postedAt" DESC', [userId]);
    const jobs = jobsResult.rows;
    return NextResponse.json(jobs ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "No such id" });
  }
  try {
    await pool.query('DELETE FROM "jobs" WHERE id = $1', [id]);
    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { message: "Failed to delete job" },
      { status: 500 },
    );
  }
}
