import { v4 as uuidv4 } from 'uuid';
import { getVerificationToken } from '../db/token';
import { prisma } from '../db/prisma';

export default async function generateVerificationToken(email : string){
   const token=uuidv4()
   const expires = new Date().getTime() + 1000 * 36


   const existingToken = await getVerificationToken(email)

   if(existingToken){
    await prisma.verificationToken.delete({
        where:{
            id:existingToken.id
        }
    })
   }

   const verificationToken=await prisma.verificationToken.create({
    data:{
        email,
        token,
        createdAt:new Date(expires)
    }
   })

   return token
}