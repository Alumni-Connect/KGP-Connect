import { prisma } from "@/lib/prisma";

export async function getScholarship() {
  try {
    const scholarship = await prisma.scholarships.findMany({
      include: { formQuestions: true },
    });

    if (!scholarship) {
      return { msg: "no user is found with the given email id" };
    }
    return { msg: "user found", scholarship };
  } catch (e: any) {
    return { msg: "error occured in db side" + e };
  }
}

export async function getSpecificScholarship(id: string) {
  try {
    const scholarship = await prisma.scholarships.findUnique({
      where: {
        id,
      },
      include: { formQuestions: true },
    });
    if (!scholarship) {
      return { msg: "no user is found with the given email id" };
    }
    return { msg: "user found", scholarship };
  } catch (e: any) {
    return { msg: "error occured in db side" + e };
  }
}

export async function getScholarshipByUser(id: string) {
  try {
    const scholarship = await prisma.scholarships.findMany({
      where: {
        createdBy: id,
      },
      include: { formQuestions: true },
    });
    if (!scholarship) {
      return { msg: "no user is found with the given email id" };
    }
    return scholarship;
  } catch (e: any) {
    return { msg: "error occured in db side" + e };
  }
}
