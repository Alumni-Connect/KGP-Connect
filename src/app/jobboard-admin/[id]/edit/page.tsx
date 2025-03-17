import EditInvoiceForm from "./editform"
import {prisma} from "@/lib/prisma";
import Navbar from "@/components/Nav";
import Sidebar from "@/components/Sidebar";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    return (
        <>
            <Navbar/>
            <div className="flex">
                <Sidebar />
                <div className="w-full pl-2 pr-4 pt-3">
                    <EditInvoiceForm id={id} />
                </div>
            </div>
        </>
    )
}