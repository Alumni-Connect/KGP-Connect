import Sidebar from "@/components/Sidebar";
import JobTable from "@/app/alum/jobboard/table";
import { auth } from "@/config/auth";
import Navbar from "@/components/Nav";
import Link from "next/link";

async function getUserId() {
  const session = await auth(); // Fetch session
  if (!session || !session.user) {
    throw new Error("Unauthorized: No session found");
  }
  return session.user.id;
}

const fetchAlumJobs = async (alumId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/jobboard-admin?userId=${alumId}`,
    );
    console.log(response.status);
    if (!response.ok) {
      console.log("Failed to fetch jobs:", response.statusText);
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
        <p className="text-lg font-medium">
          You must be signed in to create a job.
        </p>
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
      <Navbar />
      <div className="flex ml-44 py-3">
        <Sidebar />
        <div className="px-10 py-4 mt-16 w-full">
          <div className="bg-white p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-indigo-700">Job Board</h1>
              <Link href="/jobboard-admin/create">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Job
                </button>
              </Link>
            </div>
            <JobTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
