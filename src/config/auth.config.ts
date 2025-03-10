import  prisma  from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth"
import type { DefaultSession } from "next-auth";

  enum Role {
    STUDENT="STUDENT",
    ALUM="ALUM",
    ADMIN="ADMIN"
  }


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: Role
      hasRegistered: boolean
       
    } & DefaultSession["user"]
  }
  interface User  {
		// ...other properties
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
	role?: Role;
    hasRegistered?: boolean
	}

  interface jwt{
    role: Role;
    hasRegistered:boolean;
  }
}
// Notice this is only an object, not a full Auth.js instance
export default {
   providers:[],
   session: {
    strategy: "jwt", // Store sessions in the database
  },
      secret:"123123",
      callbacks: {
          async jwt({ token,user,trigger}) {
            console.log(user,"forupdating")
            if (trigger == "update" || user?.hasRegistered){
                token.hasRegistered=true
              }

          
            
             if (user) {

              const findUser=await prisma.user.findUnique({
                where:{
                  email:user.email as string
                }
              })
              

              token.id = user.id;
              token.role=user.role
              token.name=findUser?.name
              // Ensure ID is set in JWT
            }
              return token
            },
          async session({ session, token,trigger}) {
            if(session){
              session.user.id = token.id as string 
              session.user.role=token.role as Role
              session.user.name=token.name as string
              session.user.hasRegistered=false
              if(token.hasRegistered){
                session.user.hasRegistered=true
              }
          }
            // Attach user ID to the session object
            return session;
          },
          async signIn({user, account}){
            if(!user.email){
              return false
            }
            
           if(account?.provider==="nodemailer-student"){
            user.role=Role.STUDENT
            user.hasRegistered=false
           }else if(account?.provider==="nodemailer-alum"){
            user.role=Role.ALUM
            user.hasRegistered=false
           }else if(account?.provider==="nodemailer-admin"){
            user.role=Role.ADMIN
            user.hasRegistered=false
           }
            console.log(user)

            return true
          }
        },
        pages: {
          signIn: "/login",
        },
} satisfies NextAuthConfig





  

  