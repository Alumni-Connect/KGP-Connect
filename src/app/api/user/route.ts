import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "../../../utils/hashing";
import { pool } from "../../../lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, password, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }
    if (password) {
      const hash = await hashPassword(password);
      if (!hash.status) {
        return NextResponse.json(
          { msg: "Error hashing password" },
          { status: 500 },
        );
      }
      updateData.password = hash.hashedPassword;
    }
    const validUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined),
    );
    // Build dynamic SET clause
    const setClauses = Object.keys(validUpdateData).map((key, idx) => `"${key}" = $${idx + 2}`);
    const values = [id, ...Object.values(validUpdateData)];
    if (setClauses.length === 0) {
      return NextResponse.json(
        { msg: "No fields to update" },
        { status: 400 },
      );
    }
    const updateQuery = `UPDATE "users" SET ${setClauses.join(", ")} WHERE id = $1 RETURNING *`;
    const userResult = await pool.query(updateQuery, values);
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        { msg: "No user found with the given ID" },
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
