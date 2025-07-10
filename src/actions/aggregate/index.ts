import { pool } from "@/lib/prisma";

export async function countUser() {
  try {
    const usersResult = await pool.query('SELECT COUNT(*) FROM "users"');
    const users = parseInt(usersResult.rows[0].count, 10);
    return users || 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countScholar() {
  try {
    const scholarshipResult = await pool.query('SELECT COUNT(*) FROM "Scholarships"');
    const scholarship = parseInt(scholarshipResult.rows[0].count, 10);
    return scholarship || 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countPost() {
  try {
    const postResult = await pool.query('SELECT COUNT(*) FROM "Post"');
    const post = parseInt(postResult.rows[0].count, 10);
    return post || 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countJobs() {
  try {
    const jobResult = await pool.query('SELECT COUNT(*) FROM "Job"');
    const job = parseInt(jobResult.rows[0].count, 10);
    return job || 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
