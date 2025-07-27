import { pool } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";

enum Role {
  STUDENT = "STUDENT",
  ALUM = "ALUM",
  ADMIN = "ADMIN",
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: Role;
      hasRegistered: boolean;
      isVerified: boolean;
      id: string; 
    } & DefaultSession["user"];
  }
  interface User {
    // ...other properties
    id?: string; // Changed from string to number
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
    isVerified?: boolean;
    hasRegistered?: boolean;
  }

  interface JWT {
    role: Role;
    hasRegistered: boolean;
    isVerified: boolean;
    id: string; // Added id to JWT interface
  }
}
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    // Store sessions in the database
  },
  secret: "123123",
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log(user)
      if (trigger == "update" && token.hasRegistered) {
        token.isVerified = true;
      }
      if (trigger == "update" && !token.hasRegistered) {
        token.hasRegistered = true;
        const userResult = await pool.query('SELECT * FROM "users" WHERE id = $1', [token.id]);
        const findUser = userResult.rows[0];
        token.name = findUser?.name;
        token.isVerified = findUser?.isVerified;
      }
      if (user?.hasRegistered) {
        token.hasRegistered = true;
        token.name = user.name;
      }
      if (user) {
        token.id = user.id; // Cast to number
        const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [user.email]);
        const dbUser = result.rows[0];

        if (dbUser) {
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.isVerified = dbUser.isVerified;
          token.hasRegistered = dbUser.hasRegistered;
        }
         console.log('Final token after enrichment', token);
      }
      return token;
    },
    async session({ session, token, trigger }) {
      if (session) {
        // console.log(session,token)
        session.user.id = token.id as string; // Cast to number
        session.user.role = token.role as Role;
        session.user.name = token.name as string;
        session.user.hasRegistered = false;
        session.user.isVerified = token.isVerified as boolean;
        if (token.hasRegistered) {
          session.user.hasRegistered = true;
        }
      }
      // console.log(session)
      // Attach user ID to the session object
      return session;
    },
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      if (account?.provider === "nodemailer-student") {
        user.role = Role.STUDENT;
        user.hasRegistered = false;
        user.isVerified = true;
      } else if (account?.provider === "nodemailer-alum") {
        user.role = Role.ALUM;
        user.hasRegistered = false;
        user.isVerified = false;
      } else if (account?.provider === "nodemailer-admin") {
        user.role = Role.ADMIN;
        user.hasRegistered = false;
        user.isVerified = false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
