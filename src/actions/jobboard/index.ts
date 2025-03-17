"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const JobFormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: "User ID is required.",
  }),
  title: z.string().min(1, { message: "Please enter a job title." }),
  company: z.string().min(1, { message: "Please enter a company name." }),
  location: z.string().min(1, { message: "Please enter a job location." }),
  salary: z.coerce.number(),
  status: z.enum(["open", "closed"], {
    invalid_type_error: "Please select a job status.",
  }),
  url: z.string().min(1, { message: "Please enter a url." }),
});

const CreateJob = JobFormSchema.omit({ id: true });
const UpdateJob = JobFormSchema.omit({ id: true, userId: true });

export async function handleCreate(formData: FormData): Promise<void> {
  const validatedFields = CreateJob.safeParse({
    userId: formData.get("userId"),
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    salary: formData.get("salary"),
    status: formData.get("status"),
    url: formData.get("url"),
  });
  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten());
    throw new Error("Missing Fields. Failed to Create Job.");
  }
  const { userId, title, company, location, salary, status, url } =
    validatedFields.data;

  await prisma.job.create({
    data: {
      user: {
        connect: { id: userId },
      },
      title: title,
      company: company,
      location: location,
      salary: salary,
      status: status,
      url: url,
    },
  });

  revalidatePath("/jobboard-admin");
  redirect("/jobboard-admin");
}

export async function updateJob(id: string, formData: FormData): Promise<void> {
  const validatedFields = UpdateJob.safeParse({
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    salary: formData.get("salary"),
    status: formData.get("status"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten());
    throw new Error("Missing Fields. Failed to Create Job.");
  }

  const { title, company, location, salary, status, url } =
    validatedFields.data;

  await prisma.job.update({
    where: { id },
    data: {
      title: title,
      company: company,
      location: location,
      salary: salary,
      status: status,
      url: url,
    },
  });
  revalidatePath("/jobboard-admin");
  redirect("/jobboard-admin");
}
