import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "../../../../utils/hashing";
import { pool } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    let hashedPassword;
    if (!email) {
      return NextResponse.json(
        { msg: "User email is required" },
        { status: 400 },
      );
    }
    if (password) {
      const hash = await hashPassword(password);
      if (!hash.status) {
        return NextResponse.json(
          { msg: "Error hashing password" },
          { status: 500 },
        );
      }
      hashedPassword = hash.hashedPassword;
    }
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = userResult.rows[0];
    if (!user) {
      // Insert new user
      const insertResult = await pool.query(
        'INSERT INTO users (email, password, name, "hasRegistered", role) VALUES ($1, $2, $3, true, $4) RETURNING *',
        [email, hashedPassword, name, 'ADMIN']
      );
      user = insertResult.rows[0];
    } else {
      // Update existing user
      const updateResult = await pool.query(
        'UPDATE users SET password = $1, name = $2, "hasRegistered" = true WHERE email = $3 RETURNING *',
        [hashedPassword, name, email]
      );
      user = updateResult.rows[0];
    }
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
    console.log(error);
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}
