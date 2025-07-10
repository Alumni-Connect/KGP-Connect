import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formQuestions, ...body } = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          msg: "We didn't receive any response from the client to proceed to create scholarships",
        },
        { status: 400 },
      );
    }
    // Insert scholarship
    const scholarshipsResult = await pool.query(
      'INSERT INTO "Scholarships" (fields) VALUES ($1) RETURNING *',
      [JSON.stringify(body)]
    );
    const scholarships = scholarshipsResult.rows[0];
    // Insert form questions
    for (const question of formQuestions) {
      await pool.query(
        'INSERT INTO "FormQuestion" ("scholarShipId", fields) VALUES ($1, $2)',
        [scholarships.id, JSON.stringify(question)]
      );
    }
    if (!scholarships.id) {
      return NextResponse.json(
        {
          msg: "sorry db error occurred and we cannot proceed with request try again",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "successfully created Scholarship", id: scholarships.id },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry we received some error this time" },
      { status: 400 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, formQuestions, ...body } = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          msg: "We didn't receive any response from the client to proceed to create scholarships",
        },
        { status: 400 },
      );
    }
    // Delete old scholarship and form questions
    await pool.query('DELETE FROM "Scholarships" WHERE id = $1', [id]);
    // Insert new scholarship
    const scholarshipsResult = await pool.query(
      'INSERT INTO "Scholarships" (fields) VALUES ($1) RETURNING *',
      [JSON.stringify(body)]
    );
    const scholarships = scholarshipsResult.rows[0];
    // Insert new form questions
    for (const question of formQuestions) {
      await pool.query(
        'INSERT INTO "FormQuestion" ("scholarShipId", fields) VALUES ($1, $2)',
        [scholarships.id, JSON.stringify(question)]
      );
    }
    if (!scholarships) {
      return NextResponse.json(
        {
          msg: "sorry db error occurred and we cannot proceed with request try again",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        msg: "successfully updated Scholarship",
        id: scholarships.id,
        deletedId: id,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry we received some error this time" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("scholarshipId");
    if (!query) {
      return NextResponse.json(
        {
          msg: "we didn't received any id from client to proceed to delete the scholarships",
        },
        { status: 400 },
      );
    }
    const deletedResult = await pool.query(
      'DELETE FROM "Scholarships" WHERE id = $1 RETURNING *',
      [query]
    );
    const deletedScholarships = deletedResult.rows[0];
    if (!deletedScholarships) {
      return NextResponse.json(
        {
          msg: "sorry db error occurred and we cannot proceed with request try again",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "successfully deleted Scholarship" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry we received some error this time" },
      { status: 400 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("scholarshipId");
    if (!query) {
      return NextResponse.json(
        {
          msg: "we didn't received any id from client to proceed to delete the scholarships",
        },
        { status: 400 },
      );
    }
    const scholarshipResult = await pool.query(
      'SELECT * FROM "Scholarships" WHERE id = $1',
      [query]
    );
    const scholarship = scholarshipResult.rows[0];
    // Fetch form questions
    const formQuestionsResult = await pool.query(
      'SELECT * FROM "FormQuestion" WHERE "scholarShipId" = $1',
      [query]
    );
    scholarship.formQuestions = formQuestionsResult.rows;
    if (!scholarship) {
      return NextResponse.json(
        {
          msg: "sorry db error occurred and we cannot proceed with request try again",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "successfully found Scholarship", scholarship },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry we received some error this time" },
      { status: 400 },
    );
  }
}
