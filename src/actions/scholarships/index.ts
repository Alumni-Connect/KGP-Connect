import { pool } from "@/lib/prisma";
import { getSession } from "../user";
import Scholarship from "@/components/scholarships/students.scholarships";

export async function getScholarship() {
  try {
    const scholarshipResult = await pool.query('SELECT * FROM "Scholarships" WHERE "isVerified" = true');
    const scholarship = scholarshipResult.rows;
    if (!scholarship) {
      return {
        msg: "no user is found with the given email id",
        scholarship: [],
      };
    }
    return { msg: "user found", scholarship };
  } catch (e) {
    return { msg: "error occured in db side" + e, scholarship: [] };
  }
}

export async function getSpecificScholarship(id: string) {
  try {
    const scholarshipResult = await pool.query('SELECT * FROM "Scholarships" WHERE id = $1', [id]);
    const scholarship = scholarshipResult.rows[0];
    if (!scholarship) {
      return { msg: "no user is found with the given email id" };
    }
    // Fetch form questions
    const formQuestionsResult = await pool.query('SELECT * FROM "FormQuestion" WHERE "scholarShipId" = $1', [id]);
    scholarship.formQuestions = formQuestionsResult.rows;
    return { msg: "user found", scholarship };
  } catch (e) {
    return { msg: "error occured in db side" + e };
  }
}

export async function getScholarshipByUser(id: string) {
  try {
    const scholarshipResult = await pool.query('SELECT * FROM "Scholarships" WHERE "createdBy" = $1', [id]);
    const scholarship = scholarshipResult.rows;
    if (!scholarship) {
      return { msg: "no user is found with the given email id" };
    }
    // Fetch form questions for each scholarship
    for (const sch of scholarship) {
      const formQuestionsResult = await pool.query('SELECT * FROM "FormQuestion" WHERE "scholarShipId" = $1', [sch.id]);
      sch.formQuestions = formQuestionsResult.rows;
    }
    return scholarship;
  } catch (e) {
    return { msg: "error occured in db side" + e };
  }
}

export async function getAppliedScholarship() {
  try {
    const session = await getSession();
    const studentAppliedOnResult = await pool.query('SELECT id, "Scholarship" FROM "ScholarshipForm" WHERE "studentId" = $1', [session?.user.id]);
    const studentAppliedOn = studentAppliedOnResult.rows;
    if (!studentAppliedOn) {
      console.log("no user find with this id");
      return;
    }
    return studentAppliedOn;
  } catch (e) {
    console.log(e);
    return;
  }
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  department: string;
  hall: string;
  rollNumber: string;
  curriculumVitae: string;
  responses: {
    question: string;
    answer: string;
  }[];
}

export const paginatedResponses = async (
  page: number,
  limit: number,
  id: string,
) => {
  try {
    const offset = (page - 1) * limit;
    const responsesResult = await pool.query(
      'SELECT * FROM "ScholarshipForm" WHERE "ScholarshipId" = $1 OFFSET $2 LIMIT $3',
      [id, offset, limit]
    );
    const responses = responsesResult.rows;
    if (!responses) return undefined;
    const cleanedResponses: UserInfo[] = [];
    for (const res of responses) {
      // Fetch form responses for each scholarship form
      const formResponsesResult = await pool.query('SELECT * FROM "FormResponses" WHERE "scholarshipFormId" = $1', [res.id]);
      const formResponses = formResponsesResult.rows;
      cleanedResponses.push({
        id: res.id,
        name: res.name,
        email: res.email,
        department: res.Department,
        hall: res.hall,
        curriculumVitae: res.curriculumVitae,
        rollNumber: res.rollNumber,
        responses: formResponses.map((fr) => ({
          question: fr.linkedToFormQuestionDescription || '',
          answer: Array.isArray(fr.answer) ? fr.answer.join(",") : fr.answer,
        })),
      });
    }
    return cleanedResponses;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export async function countScholarship(id: string) {
  try {
    const countResult = await pool.query('SELECT COUNT(*) FROM "ScholarshipForm" WHERE "ScholarshipId" = $1', [id]);
    const count = parseInt(countResult.rows[0].count, 10);
    if (!id) {
      return 0;
    }
    return count;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
