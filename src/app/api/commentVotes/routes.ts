import { auth } from "@/config/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { itemId, itemType, value } = body;
    const userId = session.user.id;

    if (itemType === 'post') {
      // Handle post votes
      const existingVote = await prisma.postVote.findUnique({
        where: {
          userId_postId: {
            userId,
            postId: itemId
          }
        }
      });

      let scoreChange = value;
      if (existingVote) {
        scoreChange = value - existingVote.value;
      }

      await prisma.postVote.upsert({
        where: {
          userId_postId: {
            userId,
            postId: itemId
          }
        },
        create: {
          user: {
            connect: { id: userId }
          },
          post: {
            connect: { id: itemId }
          },
          value
        },
        update: {
          value
        }
      });

      await prisma.post.update({
        where: { id: itemId },
        data: { score: { increment: scoreChange } }
      });
    } else {
      // Handle comment votes
      const existingVote = await prisma.commentVote.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId: itemId
          }
        }
      });

      let scoreChange = value;
      if (existingVote) {
        scoreChange = value - existingVote.value;
      }

      await prisma.commentVote.upsert({
        where: {
          userId_commentId: {
            userId,
            commentId: itemId
          }
        },
        create: {
          user: {
            connect: { id: userId }
          },
          comment: {
            connect: { id: itemId }
          },
          value
        },
        update: {
          value
        }
      });

      await prisma.comment.update({
        where: { id: itemId },
        data: { score: { increment: scoreChange } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}