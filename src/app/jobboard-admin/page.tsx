import Sidebar from "@/components/Sidebar";
import JobTable from "@/app/jobboard-admin/table";
import {useSession} from "next-auth/react";

const { data: session, status } = useSession();

// const alumId = "cm877bxh90000ip2gj41j6b0d";
const fetchAlumJobs = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/jobboard-admin?userId=${alumId}`);
        if (!response.ok) {
            console.error("Failed to fetch jobs:", response.statusText);
            return [];
        }

        return response.json();
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
    }
};


export default async function Page() {
    const data = await fetchAlumJobs();
    if (!session) return <p>You must be signed in to create a job.</p>;
    const alumId = session.user.id;
    return (
        <>
            <div className="flex gap-2">
                <Sidebar/>
                <div className="mt-16">
                    <h1>Internships</h1>
                    <JobTable data={data}/>
                </div>
            </div>
        </>
    )
}