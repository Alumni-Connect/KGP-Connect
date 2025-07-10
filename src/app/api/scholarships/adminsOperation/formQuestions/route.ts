import { pool } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { ScholarshipId, formQuestions } = await req.json();
    if (!ScholarshipId) {
      return NextResponse.json(
        {
          msg: "we didn't received any id from client to proceed to update the FormQuestions",
        },
        { status: 400 },
      );
    }
    // Delete previous form questions
    await pool.query('DELETE FROM "FormQuestion" WHERE "scholarShipId" = $1', [ScholarshipId]);
    // Insert new form questions
    for (const question of formQuestions) {
      await pool.query(
        'INSERT INTO "FormQuestion" ("scholarShipId", fields) VALUES ($1, $2)',
        [ScholarshipId, JSON.stringify(question)]
      );
    }
    // Update scholarships table if needed (not clear from original, so just return success)
    return NextResponse.json(
      { msg: "successfully updated Scholarship", id: ScholarshipId },
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
