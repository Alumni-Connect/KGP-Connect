import { NextResponse,NextRequest } from "next/server";
import { hashPassword } from "../../../utils/hashing";
import { prisma } from "../../../lib/prisma";

export async function PATCH(req: Request) {
    try {
      const body = await req.json();
      const { id, password, ...updateData } = body;

    //   console.log("u[date",updateData)
      if (!id) {
        return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
      }
  
      if (password) {
        const hash = await hashPassword(password);
        if (!hash.status) {
          return NextResponse.json({ msg: "Error hashing password" }, { status: 500 });
        }
        updateData.password = hash.hashedPassword;
      }
  
      const validUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );
    //   console.log("validate",validUpdateData)
  
      const user = await prisma.user.update({
        where: { id },
        data: validUpdateData,
      });
  
      if (!user) {
        return NextResponse.json({ msg: "No user found with the given ID" }, { status: 404 });
      }
  
      return NextResponse.json({ msg: "User updated successfully", user }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ msg: `Database error: ${error}` }, { status: 500 });
    }
  }
  