import { NextRequest, NextResponse } from 'next/server';
import {prisma} from "@/lib/prisma";
import { getToken } from 'next-auth/jwt';

async function verifyAdminOrAlumRole(req: NextRequest) {
  try {
    const token = await getToken({ req });
    
    if (!token || !token.email) {
      return {
        success: false,
        message: 'Unauthorized: Authentication required',
        status: 401,
        user: null
      };
    }
    
    const user = await prisma.user.findUnique({
      where: { email: token.email as string },
      select: { id: true, email: true, role: true, name: true }
    });
    
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized: User not found',
        status: 401,
        user: null
      };
    }
    
    if (user.role !== 'ADMIN' && user.role !== 'ALUM') {
      return {
        success: false,
        message: 'Forbidden: Requires ADMIN or ALUM role',
        status: 403,
        user
      };
    }
    
    return {
      success: true,
      message: 'Authentication successful',
      status: 200,
      user
    };
  } catch (error) {
    console.error('[verifyAdminOrAlumRole] Authentication error:', error);
    return {
      success: false,
      message: 'Authentication error',
      status: 500,
      user: null
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrAlumRole(request);
    
    if (!authResult.success) {
      console.log(`[GET] Authentication failed: ${authResult.message}`);
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const subreddit = searchParams.get('subreddit');
    const authorId = searchParams.get('authorId');
    const status = searchParams.get('status') || 'active';
    
    const skip = (page - 1) * limit;
    
    const where: any = { status };
    if (subreddit) where.subreddit = subreddit;
    if (authorId) where.authorId = authorId;
    
    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }),
      prisma.post.count({ where })
    ]);
    
    console.log(`[GET] Successfully fetched ${posts.length} posts out of ${totalCount} total`);
    
    return NextResponse.json({
      success: true,
      data: posts,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('[GET] Error fetching posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrAlumRole(request);
    
    if (!authResult.success) {
      console.log(`[POST] Authentication failed: ${authResult.message}`);
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }
    
    const body = await request.json();
    const { title, content, subreddit, type } = body;
    
    if (!title || !content || !subreddit) {
      console.log('[POST] Missing required fields:', { title, content, subreddit });
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const authorId = authResult.user!.id;
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        subreddit,
        type: type || 'text',
        author: { connect: { id: authorId } }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });
    
    console.log(`[POST] Successfully created post "${title}" with ID ${post.id}`);
    
    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST] Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create post' },
      { status: 500 }
    );
  }
}