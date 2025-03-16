// src/app/api/postVotes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a custom type that extends NextRequest
interface CustomNextRequest extends NextRequest {
  auth: {
    user: {
      id: string;
      hasRegistered: boolean;
    };
  };
}

// Vote on a post (create or update vote)
export async function POST(req: CustomNextRequest) {
  try {
    const auth = req.auth;
    
    if (!auth || !auth.user || !auth.user.hasRegistered) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is authorized (ALUM, ADMIN, or STUDENT)
    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
    });
    
    if (!user || !['ALUM', 'ADMIN', 'STUDENT'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { postId, value } = await req.json();
    
    if (!postId || ![1, -1].includes(value)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    
    // Check if vote already exists
    const existingVote = await prisma.postVote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });
    
    let vote;
    
    if (existingVote) {
      // Update existing vote
      vote = await prisma.postVote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          value,
        },
      });
    } else {
      // Create new vote
      vote = await prisma.postVote.create({
        data: {
          userId: user.id,
          postId,
          value,
        },
      });
    }
    
    // Update post score
    await updatePostScore(postId);
    
    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error voting on post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete a vote
export async function DELETE(req: CustomNextRequest) {
  try {
    const auth = req.auth;
    
    if (!auth || !auth.user || !auth.user.hasRegistered) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Delete vote
    await prisma.postVote.delete({
      where: {
        userId_postId: {
          userId: auth.user.id,
          postId,
        },
      },
    });
    
    // Update post score
    await updatePostScore(postId);
    
    return NextResponse.json({ message: 'Vote removed successfully' });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper function to update post score
async function updatePostScore(postId: string) {
  const votes = await prisma.postVote.findMany({
    where: {
      postId,
    },
  });
  
  const score = votes.reduce((total, vote) => total + vote.value, 0);
  
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      score,
    },
  });
}