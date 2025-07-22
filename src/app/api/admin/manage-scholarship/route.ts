import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (!page || !limit) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-scholarship" },
        { status: 400 },
      );
    }
    const offset = Number(page) * Number(limit);
    const scholarshipResult = await pool.query(
      'SELECT s.id, s.title, s."lastDate", s."isVerified", u.name as create FROM "Scholarships" s JOIN "users" u ON s."createdBy" = u.id OFFSET $1 LIMIT $2',
      [offset, Number(limit)]
    );
    const scholarship = scholarshipResult.rows;
    if (!scholarship || scholarship.length === 0) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User updated successfully", scholarship },
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
        { msg: "sorry id number is missing in the manage-scholarship" },
        { status: 400 },
      );
    }
    const scholarshipResult = await pool.query(
      'UPDATE "Scholarships" SET "isVerified" = true WHERE id = $1 RETURNING *',
      [id]
    );
    const scholarship = scholarshipResult.rows[0];
    if (!scholarship) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User updated successfully", scholarship },
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
        { msg: "sorry user id is missing in the manage-scholarship" },
        { status: 400 },
      );
    }
    const scholarshipResult = await pool.query(
      'DELETE FROM "Scholarships" WHERE id = $1 RETURNING *',
      [id]
    );
    const scholarship = scholarshipResult.rows[0];
    if (!scholarship) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User deleted successfully", scholarship },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}
