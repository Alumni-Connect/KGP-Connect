import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "@/utils/hashing";
import { prisma } from "@/lib/prisma";
import { sendOTPVerificationEmail } from "@/lib/sendOtp";
import { signIn } from "@/config/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const deleteOtp = await prisma.otpVerification.deleteMany({
      where: {
        identifier: email,
      },
    });
    console.log(deleteOtp);

    const otp = await prisma.otpVerification.create({
      data: {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        identifier: email,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

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
  } catch (e: any) {
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
    );;
  }
  try {
    const verifyOtp = await prisma.otpVerification.findFirst({
      where: {
        otp: otp,
        identifier: email,
      },
    });

    if (!verifyOtp) {
      return NextResponse.json(
        { msg: "sorry! no otp is found with this email" },
        { status: 400 },
      );
    }

    if (verifyOtp.expires < new Date()) {
      console.log(
        new Date(Date.now() + 60 * 60),
        new Date(),
        verifyOtp.expires,
      );
      return NextResponse.json(
        { msg: "otp is being expired" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hash.hashedPassword,
      },
    });

    await prisma.otpVerification.delete({
      where: {
        id: verifyOtp.id,
      },
    });

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
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { msg: "error occured in db side" + e },
      { status: 400 },
    );
  }
}
