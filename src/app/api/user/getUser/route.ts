import { getUser } from "@/actions/user";
import { auth } from "@/config/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
   const {id} = await req.json();
//    console.log(id)
   try{
   const response = await getUser(id)
   return NextResponse.json(response,{status: 200})
   }catch(e:any)
   {
         return NextResponse.json({msg:"error occured in db side"+e},{status:400})
   }

}

export const GET = auth(function GET(req) {
   console.log(req.auth)
   if (req.auth) return NextResponse.json(req.auth)
   return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
 })

