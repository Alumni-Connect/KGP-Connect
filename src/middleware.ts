import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  // Fetch session from the API route
  const apiUrl = `http://localhost:3000/api/session-auth`;
  let session = null;
  try {
    const res = await fetch(apiUrl, {
      headers: { cookie: request.headers.get("cookie") || "" },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      session = data.session;

    }
      console.log(session,"this is the middleware logs")

  } catch (e) {
    session = null;
    console.log(e,"error occured")
  }

  if (!session || !session.user?.hasRegistered) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (!session.user.isVerified) {
    return NextResponse.redirect(new URL("/staging-section", url));
  }

  if (nextUrl.pathname.includes("students")) {
    if (session.user.role === "ALUM") {
      return NextResponse.redirect(new URL("/alum/home", url));
    }
  }

  if (nextUrl.pathname.includes("alum")) {
    if (session.user.role === "STUDENT") {
      return NextResponse.redirect(new URL("/students/home", url));
    }
  }

  if (nextUrl.pathname.includes("admin")) {
    if (session.user.role === "STUDENT") {
      return NextResponse.redirect(new URL("/students/home", url));
    } else if (session.user.role === "ALUM") {
      return NextResponse.redirect(new URL("/alum/home", url));
    }
  }

  if (nextUrl.pathname === "/home") {
    if (session.user.role === "STUDENT") {
      return NextResponse.redirect(new URL("/students/home", url));
    } else if (session.user.role === "ALUM") {
      return NextResponse.redirect(new URL("/alum/home", url));
    } else {
      return NextResponse.redirect(new URL("/admin/home", url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/profile",
    "/students/:path*",
    "/alum/:path*",
    "/admin/:path*",
  ],
};
