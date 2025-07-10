import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { title } from "process";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (!page || !limit) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-user" },
        { status: 400 },
      );
    }
    const offset = Number(page) * Number(limit);
    const postResult = await pool.query(
      'SELECT p.id, p.title, u.name as author, p."createdAt", p."isVerified" FROM "Post" p JOIN "users" u ON p."authorId" = u.id OFFSET $1 LIMIT $2',
      [offset, Number(limit)]
    );
    const post = postResult.rows;
    if (!post || post.length === 0) {
      return NextResponse.json(
        { msg: "No user found at last" },
        { status: 404 },
      );
    }
    const reqPost = post.map((p) => ({
      id: p.id,
      author: p.author,
      createdAt: p.createdat,
      isVerified: p.isverified,
      title: p.title,
    }));
    return NextResponse.json(
      { msg: "User updated successfully", post: reqPost },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { msg: "sorry page number is missing in the manage-post" },
        { status: 400 },
      );
    }
    const postResult = await pool.query(
      'UPDATE "Post" SET "isVerified" = true WHERE id = $1 RETURNING *',
      [id]
    );
    const post = postResult.rows[0];
    if (!post) {
      return NextResponse.json(
        { msg: "No post found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "post updated successfully", post },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { msg: "sorry user id is missing in the manage-user" },
        { status: 400 },
      );
    }
    const postResult = await pool.query(
      'DELETE FROM "Post" WHERE id = $1 RETURNING *',
      [id]
    );
    const post = postResult.rows[0];
    if (!post) {
      return NextResponse.json(
        { msg: "No post found at last" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { msg: "post deleted successfully", post },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Database error: ${error}` },
      { status: 500 },
    );
  }
}
