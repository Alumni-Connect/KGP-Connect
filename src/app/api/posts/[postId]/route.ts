import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { postId: string } }
  ) {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        _count: {
          select: { comments: true }
        }
      }
    })
  
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
  
    return NextResponse.json(post)
  }
  