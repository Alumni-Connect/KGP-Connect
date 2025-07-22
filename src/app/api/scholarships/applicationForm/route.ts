import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const { formResponses, ...body } = await req.json();
    // Insert scholarship form
    const formResult = await pool.query(
      'INSERT INTO "ScholarshipForm" (name, email, hall, "rollNumber", curriculumVitae, "Department", "YearOfGraduation", "ScholarshipId", "studentId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [body.name, body.email, body.hall, body.rollNumber, body.curriculumVitae, body.Department, new Date(body.YearOfGraduation), body.ScholarshipId, body.studentId]
    );
    const scholarshipForm = formResult.rows[0];
    // Insert form responses
    for (const response of formResponses) {
      await pool.query(
        'INSERT INTO "FormResponses" ("scholarshipFormId", "linkedFormId", answer) VALUES ($1, $2, $3)',
        [scholarshipForm.id, response.linkedFormId, response.answer]
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
      'UPDATE "ScholarshipForm" SET name = $1, email = $2, hall = $3, "rollNumber" = $4, curriculumVitae = $5, "Department" = $6, "YearOfGraduation" = $7, "ScholarshipId" = $8, "studentId" = $9 WHERE id = $10 RETURNING *',
      [scholarshipFormData.name, scholarshipFormData.email, scholarshipFormData.hall, scholarshipFormData.rollNumber, scholarshipFormData.curriculumVitae, scholarshipFormData.Department, new Date(scholarshipFormData.YearOfGraduation), scholarshipFormData.ScholarshipId, scholarshipFormData.studentId, id]
    );
    // Insert new form responses
    for (const response of formResponses) {
      await pool.query(
        'INSERT INTO "FormResponses" ("scholarshipFormId", "linkedFormId", answer) VALUES ($1, $2, $3)',
        [id, response.linkedFormId, response.answer]
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
