import { NextResponse,NextRequest } from "next/server";
import { hashPassword } from "../../../../utils/hashing";
import { prisma } from "../../../../lib/prisma";


export async function POST(req:Request) {
    try{
      const {email,password,name,hall,rollNumber} =await req.json()
      
      let hashedPassword;
      if(!email){
        return NextResponse.json({ msg: "User email is required" }, { status: 400 });
      }

      if (password) {
        const hash= await hashPassword(password);
        if (!hash.status) {
          return NextResponse.json({ msg: "Error hashing password" }, { status: 500 });
        }
        hashedPassword = hash.hashedPassword;
      }
         console.log(name,rollNumber,hall)
      const user= await prisma.user.update({
       where:{
        email:email
       },
       data:{
        password:password,
        name:name,
        hall:hall,
        rollNumber:rollNumber,
       }
      })

      if (!user) {
        return NextResponse.json({ msg: "No user found with the given ID" }, { status: 404 });
      }
  
      return NextResponse.json({ msg: "User updated successfully", user }, { status: 200 });
  
    }catch(error:any){
      return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
    }
  }
  