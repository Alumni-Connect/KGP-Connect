import { pool } from "@/lib/prisma";
import { AnyAaaaRecord } from "dns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formQuestions, title, description, criteria, lastDate, createdBy, isVerified, Accepted } = await req.json();
    
    if (!title || !description || !lastDate || !createdBy) {
      return NextResponse.json(
        {
          msg: "Missing required fields: title, description, lastDate, and createdBy are required",
        },
        { status: 400 },
      );
    }
    
    // Parse createdBy to integer
    const createdByInt = parseInt(createdBy, 10);
    if (isNaN(createdByInt)) {
      return NextResponse.json(
        { msg: "Invalid createdBy user ID" },
        { status: 400 },
      );
    }
    
    // Insert scholarship
    const scholarshipsResult = await pool.query(
      'INSERT INTO "Scholarships" (title, description, criteria, "lastDate", "createdBy", "isVerified", "Accepted") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, criteria || [], lastDate, createdByInt, isVerified || false, Accepted || 'PENDING']
    );
    const scholarship = scholarshipsResult.rows[0];
    
    // Insert form questions if provided
    if (formQuestions && Array.isArray(formQuestions)) {
      for (const question of formQuestions) {
        const { description: qDescription, type, required, options } = question;
        await pool.query(
          'INSERT INTO "FormQuestion" (description, type, required, "scholarShipId", options) VALUES ($1, $2, $3, $4, $5)',
          [qDescription, type, required || false, scholarship.id, options || []]
        );
      }
    }
    
    return NextResponse.json(
      { msg: "Successfully created scholarship", id: scholarship.id },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Error creating scholarship:", e);
    return NextResponse.json(
      { msg: "Error occurred while creating scholarship: " + e.message },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id: idParam, formQuestions, title, description, criteria, lastDate, createdBy, isVerified, Accepted } = await req.json();
    
    if (!idParam) {
      return NextResponse.json(
        { msg: "Scholarship ID is required for update" },
        { status: 400 },
      );
    }
    
    // Parse ID to integer
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { msg: "Invalid scholarship ID" },
        { status: 400 },
      );
    }
    
    if (!title || !description || !lastDate) {
      return NextResponse.json(
        { msg: "Missing required fields: title, description, and lastDate are required" },
        { status: 400 },
      );
    }
    
    // Update scholarship
    const scholarshipsResult = await pool.query(
      'UPDATE "Scholarships" SET title = $1, description = $2, criteria = $3, "lastDate" = $4, "isVerified" = $5, "Accepted" = $6 WHERE id = $7 RETURNING *',
      [title, description, criteria || [], lastDate, isVerified || false, Accepted || 'PENDING', id]
    );
    const scholarship = scholarshipsResult.rows[0];
    
    if (!scholarship) {
      return NextResponse.json(
        { msg: "Scholarship not found" },
        { status: 404 },
      );
    }
    
    // Delete old form questions and insert new ones
    await pool.query('DELETE FROM "FormQuestion" WHERE "scholarShipId" = $1', [id]);
    
    if (formQuestions && Array.isArray(formQuestions)) {
      for (const question of formQuestions) {
        const { description: qDescription, type, required, options } = question;
        await pool.query(
          'INSERT INTO "FormQuestion" (description, type, required, "scholarShipId", options) VALUES ($1, $2, $3, $4, $5)',
          [qDescription, type, required || false, id, options || []]
        );
      }
    }
    
    return NextResponse.json(
      {
        msg: "Successfully updated scholarship",
        id: scholarship.id,
      },
      { status: 200 },
    );
  } catch (e:any) {
    console.error("Error updating scholarship:", e);
    return NextResponse.json(
      { msg: "Error occurred while updating scholarship: " + e.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    
    if (!idParam) {
      return NextResponse.json(
        { msg: "Scholarship ID is required for deletion" },
        { status: 400 },
      );
    }
    
    // Parse ID to integer
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { msg: "Invalid scholarship ID" },
        { status: 400 },
      );
    }
    
    // Delete scholarship (form questions will be deleted due to cascade)
    const deleteResult = await pool.query('DELETE FROM "Scholarships" WHERE id = $1 RETURNING *', [id]);
    
    if (deleteResult.rows.length === 0) {
      return NextResponse.json(
        { msg: "Scholarship not found" },
        { status: 404 },
      );
    }
    
    return NextResponse.json(
      { msg: "Successfully deleted scholarship" },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Error deleting scholarship:", e);
    return NextResponse.json(
      { msg: "Error occurred while deleting scholarship: " + e.message },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("scholarshipId");
    
    if (!idParam) {
      return NextResponse.json(
        { msg: "Scholarship ID is required" },
        { status: 400 },
      );
    }
    
    // Parse ID to integer
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { msg: "Invalid scholarship ID" },
        { status: 400 },
      );
    }
    
    // Fetch scholarship
    const scholarshipResult = await pool.query(
      'SELECT * FROM "Scholarships" WHERE id = $1',
      [id]
    );
    const scholarship = scholarshipResult.rows[0];
    
    if (!scholarship) {
      return NextResponse.json(
        { msg: "Scholarship not found" },
        { status: 404 },
      );
    }
    
    // Fetch form questions
    const formQuestionsResult = await pool.query(
      'SELECT * FROM "FormQuestion" WHERE "scholarShipId" = $1',
      [id]
    );
    scholarship.formQuestions = formQuestionsResult.rows;
    
    return NextResponse.json(
      { msg: "Successfully found scholarship", scholarship },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Error fetching scholarship:", e);
    return NextResponse.json(
      { msg: "Error occurred while fetching scholarship: " + e.message },
      { status: 500 },
    );
  }
}
