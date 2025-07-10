import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (!page || !limit) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-job" },
        { status: 400 },
      );
    }
    const offset = Number(page) * Number(limit);
    const jobsResult = await pool.query(
      'SELECT title, id, company, location, "isVerified" FROM "Job" OFFSET $1 LIMIT $2',
      [offset, Number(limit)]
    );
    const job = jobsResult.rows;
    if (!job || job.length === 0) {
      return NextResponse.json(
        { msg: "No job found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User updated successfully", job },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-job" },
        { status: 400 },
      );
    }
    const jobResult = await pool.query(
      'UPDATE "Job" SET "isVerified" = true WHERE id = $1 RETURNING *',
      [id]
    );
    const job = jobResult.rows[0];
    if (!job) {
      return NextResponse.json(
        { msg: "No job found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "job updated successfully", job },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { msg: "sorry user id is missing in the manage-job" },
        { status: 400 },
      );
    }
    const jobResult = await pool.query(
      'DELETE FROM "Job" WHERE id = $1 RETURNING *',
      [id]
    );
    const job = jobResult.rows[0];
    if (!job) {
      return NextResponse.json(
        { msg: "No job found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "job deleted successfully", job },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}
