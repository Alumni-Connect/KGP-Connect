import { auth } from "@/config/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { itemId, value } = body;

    const userId = session.user.id;

    // Check existing vote
    const existingVote = await prisma.postVote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: itemId,
        },
      },
    });

    // Calculate score change
    let scoreChange = value;
    if (existingVote) {
      scoreChange = value - existingVote.value;
    }

    // Update or create vote
    await prisma.postVote.upsert({
      where: {
        userId_postId: {
          userId,
          postId: itemId,
        },
      },
      create: {
        user: {
          connect: { id: userId },
        },
        post: {
          connect: { id: itemId },
        },
        value,
      },
      update: {
        value,
      },
    });

    // Update post score
    await prisma.post.update({
      where: { id: itemId },
      data: { score: { increment: scoreChange } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 },
    );
  }
}
