import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@/config/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '25', 10);
  const subreddit = searchParams.get('subreddit');
  const sort = searchParams.get('sort') || 'hot';

  const skip = (page - 1) * limit;
  let orderBy: any = {};

  switch (sort) {
    case 'new':
      orderBy = { createdAt: 'desc' };
      break;
    case 'top':
      orderBy = { score: 'desc' };
      break;
    case 'controversial':
      orderBy = { commentCount: 'desc' };
      break;
    default: // 'hot'
      orderBy = [
        { score: 'desc' },
        { createdAt: 'desc' }
      ];
  }

  try {
    const where = {
      status: 'active',
      ...(subreddit ? { subreddit: { equals: subreddit } } : {})
    };

    const posts = await prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        _count: {
          select: { comments: true }
        }
      }
    });

    const total = await prisma.post.count({ where });

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, subreddit, type = 'text' } = body;

    // Additional validations
    if (!title || !content || !subreddit) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    if (!session.user.id || !session.user.email) {
      return NextResponse.json({ 
        error: 'User not properly authenticated' 
      }, { status: 401 });
    }

    // Check if user's email is verified (if you want to enforce this)
    const user = await prisma.user.findUnique({
      where: { 
        id: session.user.id,
        email: session.user.email 
      }
    });

    if (!user || !user.emailVerified) {
      return NextResponse.json({ 
        error: 'Email not verified' 
      }, { status: 403 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        subreddit,
        type,
        authorId: session.user.id,
        score: 0,
        status: 'active'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post' 
    }, { status: 500 });
  }
}