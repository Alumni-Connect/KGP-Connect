import { getUser } from "@/actions/user";
import { NextResponse } from "next/server";

export async function POST(req: Request){
   const {email} = await req.json();
   console.log(email)
   try{
   const response = await getUser(email)
   return NextResponse.json(response,{status: 200})
   }catch(e:any)
   {
         return NextResponse.json({msg:"error occured in db side"+e},{status:400})
   }

}