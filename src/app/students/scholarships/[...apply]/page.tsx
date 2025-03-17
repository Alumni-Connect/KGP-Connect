"use server";
"use server";

import { getSpecificScholarship } from "@/actions/scholarships";
import { getUser } from "@/actions/user";
import ApplicationForm from "@/components/scholarships/apply.scholarships";

export default async function ApplyScholarship({
  params,
}: {
  params: Promise<{ apply: string }>;
}) {
  const { apply } = await params;

  const session = await getUser();
  const scholarship = await getSpecificScholarship(apply[1]);

  function onSubmit(data: any) {}
  return (
    <ApplicationForm
      user={session?.user}
      scholarship={scholarship}
    ></ApplicationForm>
  );
}
