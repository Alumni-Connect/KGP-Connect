import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/config/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const subreddit = url.searchParams.get('subreddit');
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const sort = url.searchParams.get('sort') || 'new';
    const skip = (page - 1) * limit;
    
    const query: any = {};
    
    if (subreddit) {
      query.subreddit = subreddit;
    }
    
   
    let orderBy: any = {};
    switch (sort) {
      case 'top':
        orderBy = { score: 'desc' };
        break;
      case 'commented':
        orderBy = { commentCount: 'desc' };
        break;
      case 'verified':
        orderBy = [
          { isVerified: 'desc' },
          { createdAt: 'desc' }
        ];
        break;
      case 'new':
      default:
        orderBy = { createdAt: 'desc' };
    }
    
    const posts = await prisma.post.findMany({
      where: query,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
        _count: {
          select: {
            comments: true,
            PostVote: true
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });
    
    const totalPosts = await prisma.post.count({ where: query });
    
    return NextResponse.json({
      posts,
      pagination: {
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
    });
    
    if (!user || !['ALUM', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden - Only Alumni and Admins can create posts' }, { status: 403 });
    }
    
    const { title, content, subreddit, type = 'text' } = await req.json();
    
    if (!title || !content || !subreddit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        subreddit,
        type,
        authorId: user.id,
        // Admin posts are automatically verified
        isVerified: user.role === 'ADMIN',
        score: 0,
        commentCount: 0
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
      },
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}