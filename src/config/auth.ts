import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "../utils/schema";
import { checkPassword, hashPassword } from "../utils/hashing";
import { sendVerificationEmail } from "@/lib/verify";
import NodeMailer from "next-auth/providers/nodemailer";

interface Credentials {
  email: string;
  password: string;
}

enum Role {
  STUDENT = "STUDENT",
  ALUM = "ALUM",
  ADMIN = "ADMIN",
}
//this is just to make sure that
type dbRole = Role | undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        console.log(credentials);
        const { email, password } = credentials as Credentials;

        const parsedData = SignInSchema.safeParse({ email, password });

        console.log(parsedData, credentials);

        if (!parsedData.success) {
          console.log("optimum credentials are not provided");
          return null;
        }

        let user = null;

        // logic to salt and hash password

        const hashing = await hashPassword(password);
        if (!hashing.status) {
          console.log("server error occurred while hashing");
          return null;
        }

        if (!hashing.hashedPassword) {
          console.log("no password found");
          return null;
        }

        // logic to verify if the user exisats
        user = await getUserFromDb(email, password);

        if (!user) {
          console.log("no user found");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          emailVerfied: user.emailVerified,
          role: user.role as dbRole,
          hasRegistered: true,
        };
      },
    }),

    NodeMailer({
      id: "nodemailer-change-password",
      name: "nodemailer-change-password",
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        console.log(url);
        await sendVerificationEmail({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
    NodeMailer({
      id: "nodemailer-student",
      name: "nodemailer-student",
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        await sendVerificationEmail({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
    NodeMailer({
      id: "nodemailer-alum",
      name: "nodemailer-alum",
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        await sendVerificationEmail({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
    NodeMailer({
      id: "nodemailer-admin",
      name: "nodemailer-admin",
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        await sendVerificationEmail({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
  ],
});

const getUserFromDb = async (email: any, pass: any) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  // console.log(user)
  if (!user) {
    console.log("no user found");
    return null;
  }
  if (!user.password) {
    console.log("no user find in the db");
    return null;
  }
  const compare = await checkPassword(pass, user.password);
  console.log("compare:-", compare);
  if (!compare) {
    return null;
  }

  return user;
};
