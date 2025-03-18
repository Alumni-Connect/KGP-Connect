"use client";
import AlumniCell from "@/components/AlumniCell";
import ChaptersTable from "@/components/ChapterTable";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import React, { useState } from "react";

const Publication = () => {
  const [activeTab, setActiveTab] = useState(
    "Annual Report",
  );

  const tabs = ["Annual Report", "Year Book", "Periodicals"];

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNavbar />

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sidebar - Desktop */}
        <aside className="w-full md:w-1/4 p-6 hidden md:block">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`pl-3 py-3 font-semibold cursor-pointer transition-all duration-200 rounded-lg ${
                  activeTab === tab
                    ? "border-l-4 border-orange-500 bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sidebar - Mobile (Horizontal Scrollable Tabs) */}
        <aside className="w-full bg-white shadow-md p-4 block md:hidden">
          <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
                  activeTab === tab
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white shadow-md p-10">
          {activeTab === "Annual Report" && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b py-2">
                {activeTab}
              </h1>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <p>There is no Content</p>
                <p className="bg-indigo-500 text-white px-4 py-2 rounded-md ">Coming Soon</p>

              </div>
            </div>
          )}
          {activeTab === "Year Book" && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b py-2">
                {activeTab}
              </h1>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <p>There is no Content</p>
                <p className="bg-indigo-500 text-white px-4 py-2 rounded-md ">Coming Soon</p>

              </div>
            </div>
          )}
          {activeTab === "Periodicals" && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b py-2">
                {activeTab}
              </h1>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <p>There is no Content</p>
                <p className="bg-indigo-500 text-white px-4 py-2 rounded-md ">Coming Soon</p>

              </div>
            </div>
          )}
         
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Publication;
