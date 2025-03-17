import { prisma } from "@/lib/prisma";
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
    } & DefaultSession["user"];
  }
  interface User {
    // ...other properties
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
    isVerified?: boolean;
    hasRegistered?: boolean;
  }

  interface jwt {
    role: Role;
    hasRegistered: boolean;
    isVerified: boolean;
  }
}
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [],
  session: {
    strategy: "jwt",

    // Store sessions in the database
  },
  secret: "123123",
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log("1", trigger);

      console.log(token.hasRegistered);
      if (trigger == "update" && token.hasRegistered) {
        console.log("2");
        token.isVerified = true;
      }

      if (trigger == "update" && !token.hasRegistered) {
        console.log("3");

        token.hasRegistered = true;
        const findUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
        });
        token.name = findUser?.name;
        token.isVerified = findUser?.isVerified;
      }

      if (user?.hasRegistered) {
        console.log("4");

        token.hasRegistered = true;
        token.name = user.name;
      }

      if (user) {
        console.log("5");
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        // Ensure ID is set in JWT
      }
      return token;
    },
    async session({ session, token, trigger }) {
      if (session) {
        console.log(token.isVerified);
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.name = token.name as string;
        session.user.hasRegistered = false;
        session.user.isVerified = token.isVerified as boolean;
        if (token.hasRegistered) {
          session.user.hasRegistered = true;
        }
      }
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
      console.log(user);

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
