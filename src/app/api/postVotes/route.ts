import {  NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { auth } from "@/config/auth";


function logError(method: string, error: any, userId?: string, postId?: string) {
  const timestamp = new Date().toISOString();
  const errorDetails = {
    timestamp,
    method,
    userId,
    postId,
    errorMessage: error.message || 'Unknown error',
    stack: error.stack,
  };
  
  console.error(`[${timestamp}] POST VOTE ERROR (${method}):`, JSON.stringify(errorDetails, null, 2));
}


export async function POST(req: Request) {
 
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      logError('POST', new Error('Unauthorized access attempt'));
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user || !['ALUM', 'ADMIN', 'STUDENT'].includes(user.role)) {
      logError('POST', new Error(`Forbidden access attempt with role: ${user?.role}`), userId);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { postId, value } = await req.json();
    
    if (!postId || ![1, -1].includes(value)) {
      logError('POST', new Error(`Invalid request data: postId=${postId}, value=${value}`), userId, postId);
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

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
  } catch (error: any) {
    let postId: string | undefined;
    let userId: string | undefined;
    
    try {
      const session = await auth();
      userId = session?.user?.id;
      
      const body = await req.json();
      postId = body.postId;
    } catch {

      return NextResponse.json({"error": "Request parsing failed"}, { status: 400 });
    }
    
    logError('POST', error, userId, postId);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  let postId: string | null = null;
  
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      logError('DELETE', new Error('Unauthorized access attempt'));
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    const url = new URL(req.url);
    postId = url.searchParams.get('postId');
    
    if (!postId) {
      logError('DELETE', new Error('Missing postId in request'), userId);
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    try {
      await prisma.postVote.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } catch (deleteError: any) {
      if (deleteError.code === 'P2025') {
        logError('DELETE', new Error(`Vote not found: userId=${userId}, postId=${postId}`), userId, postId);
        return NextResponse.json({ error: 'Vote not found' }, { status: 404 });
      }
      throw deleteError;
    }
    
    await updatePostScore(postId);
    
    return NextResponse.json({ message: 'Vote removed successfully' });
  } catch (error: any) {
    let userId: string | undefined;
    
    try {
      const session = await auth();
      userId = session?.user?.id;
    } catch {
      
      // If session retrieval fails, proceed without the userId
    }
    
    logError('DELETE', error, userId, postId || undefined);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper function to update post score
async function updatePostScore(postId: string) {
  try {
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
  } catch (error: any) {
    logError('updatePostScore', error, undefined, postId);
    throw error;
  }
}