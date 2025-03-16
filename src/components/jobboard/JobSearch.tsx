'use client'
import {useState} from "react";
import {Tag} from "@/components/jobboard/Tag";

export default function JobSearch() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return(
        <>
            <div className="py-5 flex flex-col items-center bg-white">
                <div className="w-full flex-col max-w-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 w-full rounded-lg border bg-gray-50"/>
                </div>
            </div>
        </>
    )
}