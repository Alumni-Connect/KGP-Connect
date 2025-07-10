"use server";

import { v4 as uuidv4 } from "uuid";
import { pool } from "../../lib/prisma";

export async function createToken(email: string) {
  try {
    const token = uuidv4();
    const expire = new Date().getTime() + 1000 * 36;
    const result = await pool.query(
      'INSERT INTO "VerificationToken" (identifier, token, expires) VALUES ($1, $2, $3) RETURNING *',
      [email, token, new Date(expire)]
    );
    const verificationToken = result.rows[0];
    if (!verificationToken) {
      console.log("unable to create token");
      return;
    }
    return token;
  } catch (e) {
    throw new Error("error occurred inside the token generation");
  }
}
