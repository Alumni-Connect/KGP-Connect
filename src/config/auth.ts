import NextAuth from "next-auth";
import { pool } from "@/lib/prisma";
import PostgresAdapter from "@auth/pg-adapter"
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "../utils/schema";
import { checkPassword, hashPassword } from "../utils/hashing";
import { sendVerificationEmail } from "@/lib/verify";
import NodeMailer from "next-auth/providers/nodemailer";
import { CustomPostgresAdapter } from "../../lib/customPSQLAdapter";

interface Credentials {
  email: string;
  password: string;
}

enum Role {
  STUDENT = "STUDENT",
  ALUM = "ALUM",
  ADMIN = "ADMIN",
}

type dbRole = Role | undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: CustomPostgresAdapter(pool),
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
        const { email, password } = credentials as Credentials;
        const parsedData = SignInSchema.safeParse({ email, password });
        if (!parsedData.success) {
          return null;
        }
        let user = null;
        const hashing = await hashPassword(password);
        if (!hashing.status) {
          return null;
        }
        if (!hashing.hashedPassword) {
          return null;
        }
        user = await getUserFromDb(email, password);
        if (!user) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerfied: user.emailVerified,
          isVerified: user.isVerified,
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
  const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = userResult.rows[0];
  if (!user) {
    return null;
  }
  if (!user.password) {
    return null;
  }
  const compare = await checkPassword(pass, user.password);
  if (!compare) {
    return null;
  }
  return user;
};
