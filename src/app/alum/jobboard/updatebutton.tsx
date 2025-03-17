import Link from "next/link"
import {PencilIcon} from "lucide-react";
export default function UpdateButton({ id }: {id: string}) {
    return (
        <>
            <Link
                href={`/jobboard-admin/${id}/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
            >
                <PencilIcon className="w-5" />
            </Link>
        </>
    )
}