'use client'

import RemoveButton from "@/app/jobboard-admin/removebutton";
import {Job} from "@/types";
import {useEffect, useState} from "react";



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
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>company</th>
                        <th>location</th>
                        <th>salary</th>
                        <th>Created At</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.company}</td>
                                <td>{item.location}</td>
                                <td>{item.salary}</td>
                                <td>{item.postedAt}</td>
                                <td>{item.active}</td>
                                <td><RemoveButton id={item.id} handleDeleteAction={handleDelete}/></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
    )
}