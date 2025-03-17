import Sidebar from "@/components/Sidebar";
import JobTable from "@/app/jobboard-admin/table";
import { auth } from "@/config/auth";

export async function getUserId() {
  const session = await auth(); // Fetch session
  if (!session || !session.user) {
    throw new Error("Unauthorized: No session found");
  }
  return session.user.id; 
}

const fetchAlumJobs = async (alumId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/jobboard-admin?userId=${alumId}`);
    if (!response.ok) {
      console.error("Failed to fetch jobs:", response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};

export default async function Page() {
  // Get the session first
  const session = await auth();
  
  // Check if user is authenticated
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">You must be signed in to create a job.</p>
      </div>
    );
  }
  
  // If authenticated, get the user ID and fetch jobs
  const alumId = session.user.id;
  let data;
  if (alumId) {
    data = await fetchAlumJobs(alumId);
  } else {
    // Handle the case when alumId is undefined
    // For example, you can return an empty array or show an error message
    data = [];
    console.error("alumId is undefined");
  }
  
  return (
    <>
      <Sidebar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Internships</h1>
        <JobTable data={data} />
      </div>
    </>
  );
}