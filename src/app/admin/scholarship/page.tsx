import ScholarshipLogs from "@/components/admin/adminScholarship/scholarshipLog";
import { getSession } from "@/actions/user";
import { getScholarshipByUser } from "@/actions/scholarships";
import Sidebar from "@/components/Sidebar";
import Header from "../../../components/Nav";
export default async function Scholarship(){
    const session = await getSession()
    if(!session){
         return <div>user not found</div>
    }
    const id = session.user.id as string
    const getAllScholarship= await getScholarshipByUser(id)

    return (
        <div className="flex w-full bg-gray-100">
                  <Header />
            
        <ScholarshipLogs scholarship={getAllScholarship}></ScholarshipLogs>
        </div>
    )
}