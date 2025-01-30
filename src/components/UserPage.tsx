import React from "react";
import { Search } from "lucide-react";
import Post from "./Post";
import Sidebar from "./Sidebar";
import Acheivement from "./Acheivement";

export default function UserPage() {
  return (
    <div style={{marginTop:"96px"}} className="flex">
      <Sidebar/>
      <div  style={{ marginLeft: '400px' }} className="  flex flex-col  gap-8">
        <div className="w-[500px] ">
          <div className="relative border-2 border-black rounded-xl bg-gray-100">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2  rounded-xl text-gray-900  focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div style={{marginRight:"32px"}} className="fixed right-0 bottom-0 h-screen flex flex-col items-center justify-center">
        <Acheivement/>
      </div>
    </div>
  )
}