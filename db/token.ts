import { prisma } from "./prisma"

export const getVerificationToken=async(email:string)=>{
   try{
     const token= await prisma.verificationToken.findFirst({
        where:{
            email
        }
     })
     if (!token){
        console.log("no token found")
        return null
     }
     return token
   }catch(e){
    console.log(e)
    return null
   }
}

export const checkVerificationToken=async(token:string)=>{
    try{
        const foundtoken= await prisma.verificationToken.findFirst({
            where:{
                token
            }
            
        })
        if(!foundtoken){
            console.log(foundtoken)
            return false
        }

        const findUser=await prisma.user.update({
            where:{
                email:foundtoken.email
            },
            data:{
                emailVerified: new Date()
            }
        })
        
        if(!findUser){
            console.log("no user found with this account")
            return false
        }
        
        return true

    }catch(e){
        console.log("error occurred at db side")
        return false
    }
}