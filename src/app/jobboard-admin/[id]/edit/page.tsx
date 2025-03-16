import EditInvoiceForm from "./editform"
import {prisma} from "@/lib/prisma";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    return (
        <>
            <EditInvoiceForm id={id} />
        </>
    )
}