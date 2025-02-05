import JobCard from "@/components/JobCard";
import { Search } from "lucide-react";
import { JobProps } from "@/app/types";

export default function JobBoard() {

    const sampleJobs: JobProps[] = [
    {
        id: "1",
        date: "20 May, 2025",
        company: "Amazon",
        title: "Senior UI/UX Designer",
        salary: "$250/hr",
        location: "Dholakpur",
    },
    {
        id: "2",
        date: "15 June, 2025",
        company: "Google",
        title: "Software Engineer",
        salary: "$300/hr",
        location: "Mountain View, CA",
    },
    {
        id: "3",
        date: "10 July, 2025",
        company: "Microsoft",
        title: "Cloud Solutions Architect",
        salary: "$280/hr",
        location: "Redmond, WA",
    },
    {
        id: "4",
        date: "5 August, 2025",
        company: "Apple",
        title: "iOS Developer",
        salary: "$270/hr",
        location: "Cupertino, CA",
    },
    {
        id: "5",
        date: "1 September, 2025",
        company: "Tesla",
        title: "Autopilot Engineer",
        salary: "$320/hr",
        location: "Austin, TX",
    },
    ];
      

    return (
        <>

            <div className="sticky flex justify-center items-center px-4 py-3 gap-3">
                <input 
                    type="text" 
                    placeholder="Search"
                    className="rounded-3xl px-3 py-2 w-3/5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <button className=" -translate-x-14"><Search/></button>
            </div>
            {/* <div className="h-screen bg-black w-2/5">hi</div> */}
            {/* render jobcards */}
            <div className="flex justify-center ml-8">
                <div className="flex flex-wrap justify-start gap-6 p-6">
                    {sampleJobs.map((job) => (
                        <JobCard id={job.id} {...job} />
                    ))}
                </div>
            </div>
        
        </>
        
    )
}