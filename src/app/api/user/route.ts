import { NextResponse,NextRequest } from "next/server";
import { hashPassword } from "../../../../utils/hashing";
import { prisma } from "../../../../lib/prisma";

export async function PATCH(req:Request){

    const {password,name,id}= await req.json()

    const hash=await hashPassword(password)
    if(!hash.status){
        return null
    }
    try{
     const user=await prisma.user.update({
        where:{
            id
        },
        data:{
            
            password:hash.hashedPassword,
            name,
        }
     })
     if(!user){
        console.log("no user is found with the given email id")
       return NextResponse.json({msg:"sorry! no user is found with this email"},{status:200})
     }

     return NextResponse.json({msg:"fields updated succesfully"},{status:200})

    }catch(e:any){
        
        NextResponse.json({msg:"error occured in db side"+e},{status:400})
        
    }

}