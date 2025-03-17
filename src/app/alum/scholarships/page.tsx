import ScholarshipLogs from "@/components/admin/adminScholarship/scholarshipLog";
import { getSession } from "@/actions/user";
import { getScholarshipByUser } from "@/actions/scholarships";
import Sidebar from "@/components/Sidebar";
import Header from "../../../components/Nav";
export default async function Scholarship() {
  const session = await getSession();
  if (!session) {
    return <div>user not found</div>;
  }
  const id = session.user.id as string;
  const getAllScholarship = await getScholarshipByUser(id);

  return (
    <div className="flex w-full px-44 bg-gray-100 py-2">
      <Header />

      <Sidebar></Sidebar>
      <ScholarshipLogs scholarship={getAllScholarship}></ScholarshipLogs>
    </div>
  );
}
