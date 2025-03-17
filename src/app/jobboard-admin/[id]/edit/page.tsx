import EditInvoiceForm from "./editform"
import Navbar from "@/components/Nav";
import Sidebar from "@/components/Sidebar";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    return (
        <>
            <Navbar/>
            <div className="flex px-44 py-3">
                <Sidebar />
                <div className="w-full pl-2 pr-28 pt-3">
                    <EditInvoiceForm id={id} />
                </div>
            </div>
        </>
    )
}