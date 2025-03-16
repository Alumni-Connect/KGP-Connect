import Sidebar from "@/components/Sidebar";
import JobTable from "@/app/jobboard-admin/table";
import {auth} from "@/config/auth";

export async function getUserId() {
    const session = await auth(); // Fetch session
    if (!session || !session.user) {
        throw new Error("Unauthorized: No session found");
    }
    return session.user.id; // Assuming your session includes `id`
}

const fetchAlumJobs = async (alumId) => {
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
    const alumId = await getUserId();
    const data = await fetchAlumJobs(alumId);
    // if (!session) return <p>You must be signed in to create a job.</p>;
    // const alumId = session.user.id;
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