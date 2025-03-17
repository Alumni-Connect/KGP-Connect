'use client'

import RemoveButton from "@/app/alum/jobboard/removebutton";
import {Job} from "@/types";
import {useEffect, useState} from "react";
import UpdateButton from "@/app/alum/jobboard/updatebutton";
import Link from "next/link";



export default function JobTable({data}: {data: any}) {

    const [jobs,setJobs] = useState<Job[]>([]);
    const handleDelete = async (id:string) => {
        try {
            const response = await fetch(`/api/jobboard-admin?id=${id}`, {method: "DELETE"});
            if(response.ok) {
                setJobs((prevJobs) => prevJobs.filter(job => job.id !== id));
            } else {
                console.error("Failed to delete job", response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(data) setJobs(data);
    }, [data]);

    return (
        <>

            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Created At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Link</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((item, index) => {
                        return(
                            <tr key={index} className="hover:bg-indigo-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.salary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.postedAt}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                                    <a href={item.url} className="hover:underline">View</a>
                                </td>
                                <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                                    <UpdateButton id={item.id} />
                                    <RemoveButton id={item.id} handleDeleteAction={handleDelete}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}