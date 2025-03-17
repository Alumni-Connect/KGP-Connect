import CreateForm from "@/app/jobboard-admin/create/createform";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Nav";

export default async function Page() {
    return(
        <>
            <Navbar/>
            <div className="px-44 py-3 flex gap-2">
                <Sidebar/>
                <div className="w-full pl-2 pr-28 pt-3">
                    <CreateForm/>
                </div>
            </div>
        </>
    )
}