// import {NextResponse} from "next/server"
// import { prisma } from '@/lib/prisma'
// import {auth} from "@/config/auth"

export async function GET() {}
//     request: Request,
//     { params }: { params: { postId: string } }
//   ) {
//     const { searchParams } = new URL(request.url)
//     const parentId = searchParams.get('parentId')
//     const sort = searchParams.get('sort') || 'best'
//     const page = parseInt(searchParams.get('page') || '1')
//     const limit = parseInt(searchParams.get('limit') || '50')

//     let orderBy: any = {}
//     switch (sort) {
//       case 'new':
//         orderBy = { createdAt: 'desc' }
//         break
//       case 'top':
//         orderBy = { score: 'desc' }
//         break
//       case 'controversial':
//         orderBy = [
//           { score: 'asc' },
//           { commentCount: 'desc' }
//         ]
//         break
//       default: // 'best'
//         orderBy = [
//           { score: 'desc' },
//           { createdAt: 'desc' }
//         ]
//     }

//     const comments = await prisma.comment.findMany({
//       where: {
//         postId: params.postId,
//         parentId: parentId || null,
//         status: 'active'
//       },
//       orderBy,
//       skip: (page - 1) * limit,
//       take: limit,
//       include: {
//         author: {
//           select: {
//             name: true,
//             image: true
//           }
//         },
//         _count: {
//           select: { replies: true }
//         }
//       }
//     })

//     // For each comment, get a preview of its replies
//     const commentsWithReplies = await Promise.all(
//       comments.map(async (comment) => {
//         const replies = await prisma.comment.findMany({
//           where: {
//             parentId: comment.id,
//             status: 'active'
//           },
//           orderBy,
//           take: 3, // Preview of top 3 replies
//           include: {
//             author: {
//               select: {
//                 name: true,
//                 image: true
//               }
//             },
//             _count: {
//               select: { replies: true }
//             }
//           }
//         })

//         return {
//           ...comment,
//           replies,
//           hasMoreReplies: comment._count.replies > replies.length
//         }
//       })
//     )

//     return NextResponse.json(commentsWithReplies)
//   }

//   export async function POST(
//     request: Request,
//     { params }: { params: { postId: string } }
//   ) {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     try {
//       const body = await request.json()
//       const { content, parentId } = body

//       // Get parent comment path if it exists
//       let path: string[] = []
//       let depth = 0

//       if (parentId) {
//         const parentComment = await prisma.comment.findUnique({
//           where: { id: parentId },
//           select: { path: true }
//         })

//         if (parentComment) {
//           path = [...parentComment.path, parentId]
//           depth = path.length
//         }
//       }
//       if (session.user?.id){
//         return NextResponse.json({message: "user not logged in or some posting error"})
//       }
//       const id = session.user?.id

//       const comment = await prisma.comment.create({
//         data: {
//           content,
//           postId: params.postId,
//           parentId,
//           authorId: id as string,
//           path,
//           depth,
//           score: 0,
//           status: 'active'
//         },
//         include: {
//           author: {
//             select: {
//               name: true,
//               image: true
//             }
//           }
//         }
//       })

//       // Update post comment count
//       await prisma.post.update({
//         where: { id: params.postId },
//         data: { commentCount: { increment: 1 } }
//       })

//       return NextResponse.json(comment, { status: 201 })
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Failed to create comment' },
//         { status: 500 }
//       )
//     }
//   }
