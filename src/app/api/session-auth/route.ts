import { NextResponse } from "next/server";
import { auth } from "@/config/auth";

export async function GET() {
  const session = await auth();
  console.log(session,"this session")
  return NextResponse.json({ session });
} 