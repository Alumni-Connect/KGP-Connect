import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/config/auth';

const prisma = new PrismaClient();


export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true
          },
        },
        _count: {
          select: { 
            comments: true,
            PostVote: true
          }
        }
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT/UPDATE a specific post
export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { authorId: true }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const { title, content, subreddit, type } = await req.json();
    
    // Update post
    const updatedPost = await prisma.post.update({
      where: { id: params.postId },
      data: {
        title,
        content,
        subreddit,
        type,
        updatedAt: new Date(),
      
        isVerified: user?.role === 'ADMIN' ? true : undefined
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true
          }
        }
      }
    });
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE a post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
   
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { authorId: true }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    
    await prisma.$transaction([
   
      prisma.postVote.deleteMany({
        where: { postId: params.postId }
      }),
     
      prisma.commentVote.deleteMany({
        where: { 
          comment: {
            postId: params.postId
          }
        }
      }),
      // Delete associated comments
      prisma.comment.deleteMany({
        where: { postId: params.postId }
      }),
      // Delete the post
      prisma.post.delete({
        where: { id: params.postId }
      })
    ]);
    
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}