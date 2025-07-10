"use server";

import { pool } from "../../lib/prisma";
import { auth } from "@/config/auth";

export async function getUser() {
  const session = await auth();
  if (!session) {
    return null;
  }
  const id = session?.user.id;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = userResult.rows[0];
    if (!user) {
      return { msg: "no user is found with the given email id" };
    }
    return { msg: "user found", user };
  } catch (e: any) {
    return { msg: "error occured in db side" + e };
  }
}

export async function getSession() {
  const session = await auth();
  return session;
}
