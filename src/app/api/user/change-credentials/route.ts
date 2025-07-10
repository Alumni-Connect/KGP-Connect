import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "@/utils/hashing";
import { pool } from "@/lib/prisma";
import { sendOTPVerificationEmail } from "@/lib/sendOtp";
import { signIn } from "@/config/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    await pool.query('DELETE FROM verification_Otp WHERE identifier = $1', [email]);
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const otpResult = await pool.query(
      'INSERT INTO verification_Otp (otp, identifier, expires) VALUES ($1, $2, $3) RETURNING *',
      [otpValue, email, expires]
    );
    const otp = otpResult.rows[0];
    if (!otp) {
      console.log("unable to create otp at this moment");
      return NextResponse.json(
        { msg: "sorry! no otp is generated at this moment" },
        { status: 400 },
      );
    }
    await sendOTPVerificationEmail({ otp: otp.otp, identifier: email });
    if (!user) {
      console.log("no user is found with the given email id");
      return NextResponse.json(
        { msg: "sorry! no user is found with this email" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "fields updated succesfully" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "error occured in db side" + e },
      { status: 400 },
    );
  }
}

export async function PUT(req: Request) {
  const { email, otp, password } = await req.json();
  console.log(email, otp, password);
  const hash = await hashPassword(password);
  if (!hash.status) {
    return NextResponse.json(
      { msg: "hashing is not possible!" },
      { status: 400 },
    );
  }
  try {
    const verifyOtpResult = await pool.query(
      'SELECT * FROM verification_Otp WHERE otp = $1 AND identifier = $2',
      [otp, email]
    );
    const verifyOtp = verifyOtpResult.rows[0];
    if (!verifyOtp) {
      return NextResponse.json(
        { msg: "sorry! no otp is found with this email" },
        { status: 400 },
      );
    }
    if (verifyOtp.expires < new Date()) {
      return NextResponse.json(
        { msg: "otp is being expired" },
        { status: 400 },
      );
    }
    const userResult = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
      [hash.hashedPassword, email]
    );
    const user = userResult.rows[0];
    await pool.query('DELETE FROM verification_Otp WHERE id = $1', [verifyOtp.id]);
    const singinRequest = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(singinRequest, "changeing-password");
    if (!user) {
      console.log("no user is found with the given email id");
      return NextResponse.json(
        { msg: "sorry! no user is found with this email" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "fields updated succesfully" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "error occured in db side" + e },
      { status: 400 },
    );
  }
}
