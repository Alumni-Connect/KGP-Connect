import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SignInSchema } from "../utils/schema";
import { checkPassword, hashPassword } from "../utils/hashing";
import Resend from "next-auth/providers/resend";
import { parse } from "path";


interface Credentials {
    email: string;
    password: string;
  }


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {label:"Email",type:"text"},
          password: {label:"Password", type:"password"},
        },
        authorize: async (credentials) => {
            if(!credentials){
                console.log("hello")

                return null
            }
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
          user = await getUserFromDb(email,hashing.hashedPassword)
           
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
               user= await prisma.user.create({
                data:{
                email,
                password:hashing.hashedPassword
                }
            }) 
          }
        
          if(!user){
            console.log("no user found")
              return null
          } 
          // return user object with their profile data
          return{
            id: user.id,
            email:user.email
            }
        },
      }),

    ],
    session: {
        strategy: "jwt", // Store sessions in the database
      },
    secret:"123123",
    callbacks: {
        async jwt({ token,user }) {
           if (user) {
            token.id = user.id; // Ensure ID is set in JWT
          }
       
            return token
          },
        async session({ session, token }) {
          
          session.user.id = token.id as string 
          // Attach user ID to the session object
          console.log(session)
          return session;
        },
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
    if (!user){
        console.log("no user found")
        return user
    }
    const compare= await checkPassword(user.password,pass)
    if(!compare){
        return null
    }

    return user
  }

  

  