"use server";

import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../lib/prisma";

export async function createToken(email: string) {
  try {
    const token = uuidv4();
    const expire = new Date().getTime() + 1000 * 36;

    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(expire),
      },
    });

    if (!verificationToken) {
      console.log("unable to create token");
      return;
    }

    return token;
  } catch (e) {
    throw new Error("error occurred inside the token generation");
  }
}
