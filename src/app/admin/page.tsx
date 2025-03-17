import {
  countJobs,
  countPost,
  countScholar,
  countUser,
} from "@/actions/aggregate";
import KgpConnectDashboard from "@/components/admin/mainPage.admin";

export default async function Page() {
  const totalUser = await countUser();
  const totalScholar = await countScholar();
  const totalPost = await countPost();
  const totalJob = await countPost();
  return (
    <KgpConnectDashboard
      totalJobsPages={10}
      totalUserPages={totalUser}
      totalPostsPages={10}
      totalScholarshipPages={totalScholar}
    ></KgpConnectDashboard>
  );
}
