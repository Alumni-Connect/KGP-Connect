import { NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { pool } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const cv = data.get("files-cv") as unknown as File;
    const id = data.get("id") as unknown as string;
    if (!cv && !id) {
      return NextResponse.json(
        { msg: "photo or id is not provided" },
        { status: 400 },
      );
    }
    const scholarshipResult = await pool.query(
      'SELECT curriculumVitae, email FROM "ScholarshipForm" WHERE id = $1',
      [id]
    );
    const scholarship = scholarshipResult.rows[0];
    if (!scholarship?.email) {
      return NextResponse.json(
        { msg: "no user found with this id" },
        { status: 400 },
      );
    }
    if (scholarship?.curriculumVitae) {
      const filePath = join("./", "public", scholarship.curriculumVitae);
      await unlink(filePath);
    }
    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dirPath = join("./", "public", "/scholarships-CV", `/${id}`);
    const filePath = join(dirPath, scholarship.email + ".pdf");
    await mkdir(dirPath, { recursive: true });
    await writeFile(filePath, buffer);
    const url = `/scholarships-CV/${id}/${scholarship.email}.pdf`;
    await pool.query(
      'UPDATE "ScholarshipForm" SET "curriculumVitae" = $1 WHERE id = $2',
      [url, id]
    );
    return NextResponse.json(
      { msg: "photo os appended", url },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { msg: "sorry error encountered in the server side" },
      { status: 400 },
    );
  }
}
