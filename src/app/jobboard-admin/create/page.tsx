import CreateForm from "@/app/jobboard-admin/create/createform";
import Sidebar from "@/components/Sidebar";

export default async function Page() {
    return(
        <>
            <div className="flex gap-2">
                <Sidebar/>
                <div className="px-8 py-6">
                    <CreateForm/>
                </div>
            </div>
        </>
    )
}