import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; 
import { auth } from '@/config/auth';
import { writeFile,unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';


const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'posts');
const PUBLIC_URL_BASE = process.env.PUBLIC_URL_BASE || '/posts';

function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalName);
  return `${timestamp}-${randomString}${extension}`;
}

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
    
    const processedPosts = posts.map(post => {
      try {
        if (typeof post.content === 'string') {
          return {
            ...post,
            content: JSON.parse(post.content)
          };
        }
      } catch (e) {
      }
      return post;
    });
    
    const totalPosts = await prisma.post.count({ where: query });
    
    return NextResponse.json({
      posts: processedPosts,
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
    
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const title = formData.get('title') as string;
      const subreddit = formData.get('subreddit') as string;
      const caption = formData.get('caption') as string || '';
      const mediaFile = formData.get('media') as File;
      const type = formData.get('type') as string || (mediaFile.type.startsWith('image/') ? 'image' : 'video');
      
      if (!title || !subreddit || !mediaFile) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      
      if (!mediaFile.type.startsWith('image/') && !mediaFile.type.startsWith('video/')) {
        return NextResponse.json({ error: 'Invalid media type. Only images and videos are supported.' }, { status: 400 });
      }
      
      const userDir = path.join(UPLOAD_DIR, user.id);
      const mediaTypeDir = path.join(userDir, type);
      
      if (!existsSync(mediaTypeDir)) {
        await mkdir(mediaTypeDir, { recursive: true });
      }
      
      const uniqueFilename = generateUniqueFilename(mediaFile.name);
      const filePath = path.join(mediaTypeDir, uniqueFilename);
      
      const fileBuffer = Buffer.from(await mediaFile.arrayBuffer());
      await writeFile(filePath, fileBuffer);
      
      const mediaUrl = `${PUBLIC_URL_BASE}/${user.id}/${type}/${uniqueFilename}`;
      
      const structuredContent = {
        mediaUrl,
        mediaType: mediaFile.type,
        caption
      };
      
      const post = await prisma.post.create({
        data: {
          title,
          content: JSON.stringify(structuredContent),
          subreddit,
          type,
          authorId: user.id,
          isVerified: user.role === 'ADMIN',
          score: 0,
          commentCount: 0,
          caption
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
      
      return NextResponse.json({
        ...post,
        content: structuredContent
      });
      
    } else {
      const { title, content, subreddit, type = 'text', caption } = await req.json();
      
      if (!title || !content || !subreddit) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      
      let processedContent = content;
      if (typeof content === 'object') {
        processedContent = JSON.stringify(content);
      }
      
      const post = await prisma.post.create({
        data: {
          title,
          caption,
          content: processedContent,
          subreddit,
          type,
          authorId: user.id,
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
      
      let returnContent = post.content;
      if (typeof post.content === 'string') {
        try {
          returnContent = JSON.parse(post.content);
        } catch (e) {
          console.error('Error parsing post content:', e);
        }
      }
      
      return NextResponse.json({
        ...post,
        content: returnContent
      });
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const postId = url.searchParams.get('id');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
    });
    
    if (!user || (post.authorId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'You do not have permission to delete this post' }, { status: 403 });
    }
    
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
    
    
    await prisma.postVote.deleteMany({
      where: { postId }
    });
    
   
    await prisma.comment.deleteMany({
      where: { postId }
    });
    
    
    await prisma.post.delete({
      where: { id: postId }
    });
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}