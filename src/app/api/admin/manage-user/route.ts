import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (!page || !limit) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-user" },
        { status: 400 },
      );
    }
    const offset = Number(page) * Number(limit);
    const userResult = await pool.query(
      'SELECT id, name, email, "isVerified", "emailVerified", hall, "YearOfGraduation", "Department" FROM users OFFSET $1 LIMIT $2',
      [offset, Number(limit)]
    );
    const user = userResult.rows;
    if (!user || user.length === 0) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User updated successfully", user },
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
        { msg: "sorry page number is missing in the manage-user" },
        { status: 400 },
      );
    }
    const userResult = await pool.query(
      'UPDATE users SET "isVerified" = true WHERE id = $1 RETURNING *',
      [id]
    );
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User updated successfully", user },
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
        { msg: "sorry user id is missing in the manage-user" },
        { status: 400 },
      );
    }
    const userResult = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "User deleted successfully", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}
