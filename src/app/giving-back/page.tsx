"use client";
import ADEP from "@/components/ADEP";
import AlumniCell from "@/components/AlumniCell";
import AlumniCSRCollaboration from "@/components/AlumniCSRCollaboration";
import AnnualDonation from "@/components/AnnualDonation";
import BatchEndowment from "@/components/BatchEndowment";
import ChairProfessorship from "@/components/ChairProfessorship";
import ChaptersTable from "@/components/ChapterTable";
import Footer from "@/components/Footer";
import HallEndowment from "@/components/HallEndowment";
import LandingNavbar from "@/components/LandingNavbar";
import LearnEarnReturn from "@/components/LearnEarnReturn";
import OwnYourHallRoom from "@/components/OwnYourHallRoom";
import PanditIshwarScholarship from "@/components/PanditIshwarScholarship";
import StudentsScholarshipAward from "@/components/StudentsScholarshipAward";
import React, { useState } from "react";

const Publication = () => {
  const [activeTab, setActiveTab] = useState(
    "Alumni CSR Collaboration",
  );

  const tabs = [
    "Alumni CSR Collaboration",
    "Own Your Hall Room",
    "Learn - Earn - Return",
    "Students' Scholarship & Awards",
    "Pandit Ishwar Chandra Vidyasagar Full Scholarship for Top 100 JEE (Advanced) Rankers",
    "Chair Professorship",
    "Batch Endowment Campaign",
    "Hall Endowment Campaign",
    "Alumni Department Engagement Program (ADEP)",
    "Annual Donation",
  ];

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
          {activeTab === "Alumni CSR Collaboration" && (
           <AlumniCSRCollaboration/>
          
          )}
          {activeTab === "Own Your Hall Room" && <OwnYourHallRoom/>}
          {activeTab === "Learn - Earn - Return" && <LearnEarnReturn/>}
          {activeTab === "Students' Scholarship & Awards" &&<StudentsScholarshipAward/>}
          {activeTab === "Pandit Ishwar Chandra Vidyasagar Full Scholarship for Top 100 JEE (Advanced) Rankers" &&<PanditIshwarScholarship />}
          {activeTab === "Chair Professorship" &&<ChairProfessorship />}
          {activeTab === "Batch Endowment Campaign" &&<BatchEndowment />}
          {activeTab === "Hall Endowment Campaign" &&<HallEndowment />}
          {activeTab === "Alumni Department Engagement Program (ADEP)" &&<ADEP />}
          {activeTab === "Annual Donation" &&<AnnualDonation />}
       
          
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Publication;
