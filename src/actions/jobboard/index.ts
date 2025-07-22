"use server";

import { pool } from "@/lib/prisma";
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
  await pool.query(
    'INSERT INTO "jobs" ("userId", title, company, location, salary, status, url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [userId, title, company, location, salary, status, url]
  );
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
  await pool.query(
    'UPDATE "jobs" SET title = $1, company = $2, location = $3, salary = $4, status = $5, url = $6 WHERE id = $7',
    [title, company, location, salary, status, url, id]
  );
  revalidatePath("/jobboard-admin");
  redirect("/jobboard-admin");
}
