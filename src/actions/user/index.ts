"use server"

import { prisma } from "../../lib/prisma";



export async function getUser (data: string){
    const  email = data
    try{
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(!user){
            return {msg:"no user is found with the given email id"}
        }
        return {msg:"user found",user}
    }catch(e:any){
        return {msg:"error occured in db side"+e}
    }
}
