import { countJobs, countPost, countScholar, countUser } from "@/actions/aggregate";
import KgpConnectDashboard from "@/components/admin/mainPage.admin";

export default async function Page(){
   const totalUser= await countUser()
   const totalScholar=await countScholar()
   const totalPost=await countJobs()
   const totalJob=await countPost()
  return(
    <KgpConnectDashboard totalJobsPages={totalJob} totalUserPages={totalUser} totalPostsPages={totalPost} totalScholarshipPages={totalScholar}></KgpConnectDashboard>
  )
}