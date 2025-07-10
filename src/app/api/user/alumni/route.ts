import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "../../../../utils/hashing";
import { pool } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      name,
      department,
      YearOfGraduation,
      degree,
      contactNum,
      hall,
    } = await req.json();
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
        'INSERT INTO users (email, password, name, "Department", "YearOfGraduation", "Degree", "contactNum", hall, "hasRegistered", "isVerified", role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, true, $9) RETURNING *',
        [email, hashedPassword, name, department, new Date(YearOfGraduation), degree, contactNum, hall, 'ALUM']
      );
      user = insertResult.rows[0];
    } else {
      // Update existing user
      const updateResult = await pool.query(
        'UPDATE users SET password = $1, name = $2, "Department" = $3, "YearOfGraduation" = $4, "hasRegistered" = true, "Degree" = $5, "contactNum" = $6, hall = $7 WHERE email = $8 RETURNING *',
        [hashedPassword, name, department, new Date(YearOfGraduation), degree, contactNum, hall, email]
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
