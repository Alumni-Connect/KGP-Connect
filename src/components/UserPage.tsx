import React from "react";
import { Search } from "lucide-react";
import Post from "./Post";
import Sidebar from "./Sidebar";
import Achievement from "./Acheivement";

export default function UserPage() {
  return (
    <div className="mt-[96px] flex flex-wrap gap-6 px-4 lg:px-12">

      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-8 w-full md:w-[500px] lg:w-[600px] mx-auto">
        {/* Search Bar */}
        <div className="w-full">
          <div className="relative border border-gray-300 rounded-xl bg-gray-100 shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4 pt-4">
          {[...Array(8)].map((_, index) => (
            <Post key={index} />
          ))}
        </div>
      </div>

      {/* Achievements - Stays on the right on larger screens */}
      <div className="hidden lg:flex fixed right-0 bottom-0 h-screen items-center justify-center p-4">
        <Achievement />
      </div>
    </div>
  );
}
