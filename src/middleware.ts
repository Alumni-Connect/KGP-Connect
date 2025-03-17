"use server"
import  authConfig  from "./config/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request) {
	const { url, nextUrl, auth } = request;
  console.log(request.auth);

	if (!request.auth || !request.auth.user.hasRegistered) {
		return NextResponse.redirect(new URL("/login", url));
	} 
    
	// if( !request.auth.user.isVerified){
	// 	return NextResponse.redirect(new URL("/staging-section", url));
	// }
	// 	return NextResponse.next()
});

export const config = {
	matcher: ["/home","/profile"],
};                                                                                                                                        