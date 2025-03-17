import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/config/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get("parentId");
    const sort = searchParams.get("sort") || "best";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    let orderBy: any = {};
    switch (sort) {
      case "new":
        orderBy = { createdAt: "desc" };
        break;
      case "top":
        orderBy = { score: "desc" };
        break;
      case "controversial":
        orderBy = [{ score: "asc" }, { commentCount: "desc" }];
        break;
      default:
        orderBy = [{ score: "desc" }, { createdAt: "desc" }];
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: params.postId,
        parentId: parentId || null,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
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
          select: { replies: true },
        },
      },
    });

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await prisma.comment.findMany({
          where: {
            parentId: comment.id,
            status: "active",
          },
          orderBy,
          take: 3,
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
              select: { replies: true },
            },
          },
        });

        return {
          ...comment,
          replies,
          hasMoreReplies: comment._count.replies > replies.length,
        };
      }),
    );

    return NextResponse.json(commentsWithReplies);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, parentId } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let path: string[] = [];
    let depth = 0;

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
        select: { path: true, postId: true },
      });

      if (!parentComment) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 },
        );
      }

      if (parentComment.postId !== params.postId) {
        return NextResponse.json(
          { error: "Parent comment does not belong to this post" },
          { status: 400 },
        );
      }

      path = [...parentComment.path, parentId];
      depth = path.length;
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: params.postId,
        parentId,
        authorId: session.user.id,
        path,
        depth,
        score: 0,
        status: "active",
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

    await prisma.post.update({
      where: { id: params.postId },
      data: { commentCount: { increment: 1 } },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let commentId;
    if (params.commentId) {
      commentId = params.commentId;
    } else {
      const url = new URL(request.url);
      commentId = url.searchParams.get("commentId");
      if (!commentId) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 },
        );
      }
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true, postId: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.postId !== params.postId) {
      return NextResponse.json(
        { error: "Comment does not belong to this post" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (comment.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { content } = await request.json();

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
        updatedAt: new Date(),
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

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let commentId;
    if (params.commentId) {
      commentId = params.commentId;
    } else {
      const url = new URL(request.url);
      commentId = url.searchParams.get("commentId");
      if (!commentId) {
        return NextResponse.json(
          { error: "Comment ID required" },
          { status: 400 },
        );
      }
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true, postId: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.postId !== params.postId) {
      return NextResponse.json(
        { error: "Comment does not belong to this post" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (comment.authorId !== session.user.id && user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        status: "deleted",
        content: "[deleted]",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
