import Link from "next/link";
import React from "react";
import ResponseList from "./responselist";
import { StepBack } from "lucide-react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  department: string;
  hall: string;
  rollNumber: string;
  curriculumVitae: string;
  responses: {
    question: string;
    answer: string;
  }[];
}

interface UserListProps {
  users: UserInfo[];
  currentPage: number;
  usersPerPage: number;
  totalCount: number;
}

const UserList: React.FC<UserListProps> = ({
  users,
  currentPage,
  usersPerPage,
  totalCount,
}) => {
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users;

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link
        className="bg-indigo-600 h-28 w-36 rounded-lg border-greeen p-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider text-white font-semibold"
        href="/scholarship-admin"
      >
        back
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 ">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <ResponseList currentUsers={currentUsers}></ResponseList>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            {currentPage !== 1 && (
              <Link
                href={`/${currentPage - 1}`}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </Link>
            )}
            {!(indexOfLastUser >= totalCount) && (
              <Link
                href={`?page=${currentPage + 1}`}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  indexOfLastUser >= totalCount
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </Link>
            )}
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, users.length)}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {Array.from({
                  length: Math.ceil(users.length / usersPerPage),
                }).map((_, index) => (
                  <Link
                    key={index}
                    href={`?page=${index + 1}`}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
