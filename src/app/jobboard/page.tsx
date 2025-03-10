'use client'

import JobCard from "@/components/jobboard/JobCard";
import { Job } from "@/types";
import JobSearch from "@/components/jobboard/JobSearch";
import {useEffect, useState} from "react";


export default function JobBoard() {

    const [jobs,setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const query = selectedTags.length > 0 ? `?tags=${selectedTags.join(",")}` : "";
                const res = await fetch(`/api/jobboard${query}`);
                if (!res.ok) throw new Error("Failed to fetch jobs.");
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs().catch((error) => console.error(error));
    }, [selectedTags]);

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <div className="mt-16 ml-8">
            {/* search bar and tags */}
            <JobSearch setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
            {/* render job cards */}
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-start gap-6 p-6">
                    {jobs.map((job) => (
                        <JobCard key={job.id} {...job} />
                    ))}
                </div>
            </div>
        </div>
       
      </>
        
    )
}