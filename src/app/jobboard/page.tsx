import JobCard from "@/components/jobboard/JobCard";
import { Job } from "@/types";
import JobSearch from "@/components/jobboard/JobSearch";
import Sidebar from "@/components/Sidebar";
import { JSX } from "react";
import Header from "../../components/Nav"

export default async function JobBoard() {

    const res = await fetch("http://localhost:3000/api/jobboard", {
        method: "GET",
    })
    const jobs = await res.json();

    return (
        <>
            <div className="flex">
                {/* Sidebar - Hidden on small screens */}
                <Header></Header>
                <div className="hidden lg:block w-60 min-w-[240px]">
                    <Sidebar/>
                </div>
                <div className="mt-16 ml-8">
                    {/* search bar and tags */}
                    {/*<div className="flex justify-center w-full"><JobSearch /></div>*/}
                    {/* render job cards */}
                    <div className="flex justify-center">
                        <div className="flex flex-wrap justify-start ml-7 gap-6 p-6">
                            {jobs.map((job: JSX.IntrinsicAttributes & Job) => (
                                <JobCard key={job.id} {...job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}