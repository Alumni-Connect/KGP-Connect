import { prisma } from "@/lib/prisma";

export async function countUser() {
  try {
    const users = await prisma.user.count();
    if (users) {
      return users;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countScholar() {
  try {
    const scholarship = await prisma.scholarships.count();
    if (scholarship) {
      return scholarship;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countPost() {
  try {
    const post = await prisma.post.count();
    if (post) {
      console.log(post);
      return post;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function countJobs() {
  try {
    const job = await prisma.job.count();
    if (job) {
      return job;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
