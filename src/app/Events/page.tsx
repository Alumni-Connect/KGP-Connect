"use client"
import EventGallery from "@/components/EventsGallery";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import React, { useState } from "react";

const InstitutionalDevelopmentPage = () => {
  const [activeTab, setActiveTab] = useState("Alumni Meet");
  const Year16=["/AlumniMeet1-16.jpg","/AlumniMeet2-16.jpg",]
  const Year17=["/AlumniMeet1-17.jpg","/AlumniMeet2-17.jpg","/AlumniMeet3-17.jpg","/AlumniMeet4-17.jpg","/AlumniMeet5-17.jpg",]

  const tabs = [
    "Alumni Meet",
    "Homecoming",
    "Grand Reunion",  
  ];

  return (
    <div>
      <LandingNavbar />
      <div className="flex min-h-screen bg-gray-100 mt-4">
      
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6">
      <ul className="space-y-2">
      {tabs.map((tab) => (
        <li
          key={tab}
          className={`pl-3 py-2 font-semibold cursor-pointer transition-all duration-200 
            ${activeTab === tab ? "border-l-4 border-red-500 text-gray-900" : "text-gray-700 hover:text-gray-900"}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white shadow-md p-10">
        {
          activeTab === "Alumni Meet" &&<div>
            <EventGallery name="17th Annual Alumni Meet" array={Year17} />
            <EventGallery name="16th Annual Alumni Meet" array={Year16} />
          </div>
        }
        {
          activeTab === "Homecoming" &&<div>
            <EventGallery name="Hommecoming 2019" array={Year16} />
            
          </div>
        }
        {
          activeTab === "Grand Reunion" &&<div>
            <EventGallery name="17th Annual Alumni Meet" array={Year17} />
          </div>
        }
       
      
      </main>
    </div>
   <Footer />
    </div>
    
  );
};

export default InstitutionalDevelopmentPage;
