import { NextResponse,NextRequest } from "next/server";
import { hashPassword } from "../../../../../utils/hashing";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req:Request){

    const {email,token,password}= await req.json()
    const date=new Date()
    const hash=await hashPassword(password)
    if(!hash.status){
        return null
    }


    try{

    const verification=await prisma.verificationToken.findFirst({
        where:{
            token:token,
            identifier:email
        }
    })
    if(!verification){
        return NextResponse.json({msg:"sorry! no token is found with this email"},{status:400})
    }
    if( verification.expires< date){
        return NextResponse.json({msg:"token is being expired"},{status:400})
    }

    await prisma.verificationToken.delete({
        where:{
            id:verification.id
        }
    })


     const user=await prisma.user.update({
        where:{
            email
        },
        data:{
            password:hash.hashedPassword,
        }
     })
     if(!user){
        console.log("no user is found with the given email id")
       return NextResponse.json({msg:"sorry! no user is found with this email"},{status:400})
     }

     return NextResponse.json({msg:"fields updated succesfully"},{status:200})

    }catch(e:any){
        
        NextResponse.json({msg:"error occured in db side"+e},{status:400})
        
    }

}