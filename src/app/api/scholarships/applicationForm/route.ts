import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const { formResponses, ...body } = await req.json();
    // Insert scholarship form
    const formResult = await pool.query(
      'INSERT INTO "ScholarshipForm" (fields) VALUES ($1) RETURNING *',
      [JSON.stringify(body)]
    );
    const scholarshipForm = formResult.rows[0];
    // Insert form responses
    for (const response of formResponses) {
      await pool.query(
        'INSERT INTO "FormResponses" (scholarshipFormId, fields) VALUES ($1, $2)',
        [scholarshipForm.id, JSON.stringify(response)]
      );
    }
    if (!scholarshipForm) {
      return NextResponse.json(
        { msg: "sorry unable to create a scholarship form" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        msg: "your form response is successfully submitted",
        id: scholarshipForm.id,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, formResponses, scholarshipFormData } = await req.json();
    // Delete previous responses
    await pool.query('DELETE FROM "FormResponses" WHERE "scholarshipFormId" = $1', [id]);
    // Update scholarship form
    const updateResult = await pool.query(
      'UPDATE "ScholarshipForm" SET fields = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(scholarshipFormData), id]
    );
    // Insert new form responses
    for (const response of formResponses) {
      await pool.query(
        'INSERT INTO "FormResponses" (scholarshipFormId, fields) VALUES ($1, $2)',
        [id, JSON.stringify(response)]
      );
    }
    const createNewFormResponse = updateResult.rows[0];
    if (!createNewFormResponse) {
      return NextResponse.json(
        { msg: "sorry unable to update a scholarship form" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        msg: "your form response is successfully updated",
        formResponses: createNewFormResponse,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { scholarshipFormId } = await req.json();
    const deleteResult = await pool.query(
      'DELETE FROM "ScholarshipForm" WHERE id = $1 RETURNING *',
      [scholarshipFormId]
    );
    const deleteResponse = deleteResult.rows[0];
    const filePath = join("./", "public", deleteResponse.curriculumVitae);
    await unlink(filePath);
    if (!deleteResponse) {
      return NextResponse.json(
        { msg: "sorry unable to update a scholarship form" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: "your form response is successfully deleted" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error occurred in the session please try again later" },
      { status: 400 },
    );
  }
}
