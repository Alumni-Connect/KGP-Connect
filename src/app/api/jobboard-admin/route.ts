import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    // Check if the user is an ALUM
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role !== "ALUM") {
      return NextResponse.json(
        { message: "Only ALUM users can access this resource" },
        { status: 403 },
      );
    }

    // Fetch jobs for the ALUM user
    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { postedAt: "desc" },
    });

    return NextResponse.json(jobs ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "No such id" });
  }
  try {
    await prisma.job.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { message: "Failed to delete job" },
      { status: 500 },
    );
  }
}
