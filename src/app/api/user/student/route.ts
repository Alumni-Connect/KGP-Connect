import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "../../../../utils/hashing";
import { pool } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      name,
      hall,
      rollNumber,
      department,
      YearOfGraduation,
      degree,
      contactNum,
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
        'INSERT INTO users (email, password, name, hall, "rollNumber", "Department", "YearOfGraduation", "Degree", "contactNum", "hasRegistered", "isVerified", role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, true, $10) RETURNING *',
        [email, hashedPassword, name, hall, rollNumber, department, new Date(YearOfGraduation), degree, contactNum, 'STUDENT']
      );
      user = insertResult.rows[0];
    } else {
      // Update existing user
      const updateResult = await pool.query(
        'UPDATE users SET password = $1, name = $2, hall = $3, "rollNumber" = $4, "Department" = $5, "YearOfGraduation" = $6, "hasRegistered" = true, "isVerified" = true, "Degree" = $7, "contactNum" = $8 WHERE email = $9 RETURNING *',
        [hashedPassword, name, hall, rollNumber, department, new Date(YearOfGraduation), degree, contactNum, email]
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
