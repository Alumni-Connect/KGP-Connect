import Sidebar from "@/components/Sidebar";
import JobTable from "@/app/alum/jobboard/table";
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
    console.log(response.status)
    if (!response.ok) {
     // console.error("Failed to fetch jobs:", response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};

export default async function Page() {
  const session = await auth();
  
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">You must be signed in to create a job.</p>
      </div>
    );
  }
  
  const alumId = session.user.id;
  let data;
  if (alumId) {
    data = await fetchAlumJobs(alumId);
  } else {
    
    data = [];
    console.error("alumId is undefined");
  }
  
  return (
    <>
    <div className="flex ">
    
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Internships</h1>
        <JobTable data={data} />
      </div>
      </div>
    </>
  );
}