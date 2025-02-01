import JobCard from "@/components/JobCard";
import { JobProps } from "../types";

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
        <div className="flex flex-wrap justify-start gap-6 p-6 mt-16">
            {sampleJobs.map((job) => (
                <JobCard id={job.id} {...job} />
            ))}
        </div>
    )
}