import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma"
import { auth } from '@/config/auth';
import path from 'path';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';




const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'posts');
const PUBLIC_URL_BASE = process.env.PUBLIC_URL_BASE || '/posts';


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
    
    if (typeof post.content === 'string') {
      try {
        post.content = JSON.parse(post.content);
      } catch (e) {
        console.log('Error parsing post content:', e);
      }
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}


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
      select: { 
        authorId: true,
        type: true,
        content: true
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  
    // Check user permissions
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const { title, content, subreddit, type, caption } = await req.json();
    
    // Process content if it's an object
    let processedContent = content;
    if (typeof content === 'object') {
      processedContent = JSON.stringify(content);
    }
    
    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: params.postId },
      data: {
        title,
        caption,
        content: processedContent,
        subreddit,
        type,
        updatedAt: new Date(),
        // Only set isVerified if user is an admin
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
    
    // Parse the content back if it was stored as JSON
    let returnContent = updatedPost.content;
    if (typeof updatedPost.content === 'string') {
      try {
        returnContent = JSON.parse(updatedPost.content);
      } catch (e) {
        // If parsing fails, return the original content
      }
    }
    
    return NextResponse.json({
      ...updatedPost,
      content: returnContent
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Fetch the post to verify ownership and get content info
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { 
        authorId: true,
        type: true,
        content: true
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // Check user permissions
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Handle media file deletion
    if (post.type === 'image' || post.type === 'video') {
      try {
        let content: any;
        if (typeof post.content === 'string') {
          content = JSON.parse(post.content);
        } else {
          content = post.content;
        }
        
        if (content && content.mediaUrl) {
          const mediaUrl = content.mediaUrl;
          
          const relativePath = mediaUrl.replace(PUBLIC_URL_BASE, '');
          
          const filePath = path.join(UPLOAD_DIR, relativePath);
          
          // Check if the file exists and delete it
          if (existsSync(filePath)) {
            try {
              await unlink(filePath);
              console.log(`Deleted media file: ${filePath}`);
            } catch (fileError) {
              console.error(`Error deleting media file: ${filePath}`, fileError);
            }
          }
        }
      } catch (contentError) {
        console.error('Error parsing post content for media deletion:', contentError);
      }
    }
    
    // Delete all related data in a transaction
    await prisma.$transaction([
      // Delete post votes
      prisma.postVote.deleteMany({
        where: { postId: params.postId }
      }),
      // Delete comment votes
      prisma.commentVote.deleteMany({
        where: { 
          comment: {
            postId: params.postId
          }
        }
      }),
      // Delete comments
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