import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SignInSchema } from "../utils/schema";

import { checkPassword,hashPassword} from "../utils/hashing";
import Resend from "next-auth/providers/resend";
import {sendVerificationEmail} from "../lib/verify"
import NodeMailer from "next-auth/providers/nodemailer";


interface Credentials {
    email: string;
    password: string;
  }


export const { handlers, signIn, signOut, auth } = NextAuth({

    adapter: PrismaAdapter(prisma),
    providers: [
      Credentials({
        
        credentials: {
          email: {label:"Email",type:"text"},
          password: {label:"Password", type:"password"},
        },
        authorize: async (credentials) => {
            if(!credentials){
                return null
            }
           console.log(credentials)
            const {email,password}= credentials as Credentials

            const parsedData=SignInSchema.safeParse({email,password})

            console.log(parsedData,credentials)

            if(!parsedData.success){
              console.log("optimum credentials are not provided")
              return null
            }

          let user = null

          // logic to salt and hash password
          
          const hashing=await hashPassword(password)
          if(!hashing.status){
            console.log("server error occurred while hashing")
            return null
          }
          
          if(!hashing.hashedPassword){
            console.log("no password found")
            return null
          }

          // logic to verify if the user exists
          user = await getUserFromDb(email,password)
           
          if(!user){
            console.log("no user found")
              return null
          } 

          return{
            id: user.id,
            email:user.email,
            emailVerfied:user.emailVerified
            }
        },
      }),

      // Resend({
      //   from: "onboarding@resend.dev",
      //   sendVerificationRequest

      // })
      
      NodeMailer({
        id:"nodemailer",
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
         sendVerificationRequest: async ({ identifier: email,
        url,
        provider: { server, from }}) => {

          const { searchParams } = new URL(url);
          const username = searchParams.get("username") || "User";
          const role = searchParams.get("role") || "Not Provided";

          console.log("Additional Params:", { username, role });
        
          await sendVerificationEmail({identifier: email,url,provider: { server, from }});
        },
      }),
      NodeMailer({
        id:"nodemailerForChangePassword",
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
         sendVerificationRequest: async ({ identifier: email,
        url,
        provider: { server, from }}) => {
        
          await sendVerificationEmail({identifier: email,url,provider: { server, from }});
        },
      }),
    ],
    session: {
        strategy: "jwt", // Store sessions in the database
      },
    secret:"123123",
    callbacks: {
        async jwt({ token,user ,account}) {
           if (user) {
            token.id = user.id;
            // Ensure ID is set in JWT
          }
          console.log(token)

            return token
          },
        async session({ session, token }) {
          if(session){

            session.user.id = token.id as string 
            
          }
          console.log(session)
          // Attach user ID to the session object
          return session;
        },
        async signIn({user, account}){
          if(!user.email){

            return false
          }

          console.log("hey i am user email",user.email,account)
          return true
        }
      },
      pages: {
        signIn: "/login",
      },
  })


  const getUserFromDb=async(email:any,pass:any)=>{
    const user=await prisma.user.findFirst({
        where:{
            email
        }
    })
    console.log(user)
    if (!user){
        console.log("no user found")
        return null
    }
    if(!user.password){
      console.log("no user find in the db")
      return null
    }
    const compare= await checkPassword(pass,user.password)
    console.log("compare:-",compare)
    if(!compare){
        return null
    }

    return user
  }

  

  