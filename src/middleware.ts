"use server";
import authConfig from "./config/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request) {
  const { url, nextUrl, auth } = request;

  if (!request.auth || !request.auth.user.hasRegistered) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (!request.auth.user.isVerified) {
    return NextResponse.redirect(new URL("/staging-section", url));
  }

  if (nextUrl.pathname.includes("students")) {
    if (request.auth.user.role == "ALUM") {
      return NextResponse.redirect(new URL("/alum/home", url));
    }
  }

  if (nextUrl.pathname.includes("alum")) {
    if (request.auth.user.role == "STUDENT") {
      return NextResponse.redirect(new URL("/students/home", url));
    }
  }

  if (nextUrl.pathname.includes("admin")) {
    if (request.auth.user.role == "STUDENT") {
      return NextResponse.redirect(new URL("/students/home", url));
    } else if (request.auth.user.role == "ALUM") {
      return NextResponse.redirect(new URL("/alum/home", url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/home", "/profile", "/students/:path", "/alum/:path"],
};
