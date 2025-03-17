"use client";
import EventGallery from "@/components/EventsGallery";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import React, { useState } from "react";

const InstitutionalDevelopmentPage = () => {
  const [activeTab, setActiveTab] = useState("Alumni Meet");
  const Year16=["/alumni_meet16/1.jpg","/alumni_meet16/2.jpg","/alumni_meet16/3.jpg","/alumni_meet16/4.png","/alumni_meet16/5.png","/alumni_meet16/6.jpg","/alumni_meet16/7.jpg","/alumni_meet16/8.jpg","/alumni_meet16/9.jpg","/alumni_meet16/10.jpg","/alumni_meet16/11.jpg","/alumni_meet16/12.jpg","/alumni_meet16/13.jpg","/alumni_meet16/14.jpg",]
  const Year17=["/alumni_meet17/1.jpg","/alumni_meet17/2.jpg","/alumni_meet17/3.jpg","/alumni_meet17/4.jpg","/alumni_meet17/5.jpg","/alumni_meet17/6.jpg","/alumni_meet17/7.jpg","/alumni_meet17/8.jpg","/alumni_meet17/9.jpg","/alumni_meet17/10.jpg",]
  const globalReunion=["/grand_reunion/1.jpeg","/grand_reunion/2.jpeg","/grand_reunion/3.jpeg","/grand_reunion/4.jpeg","/grand_reunion/5.jpeg","/grand_reunion/6.jpeg","/grand_reunion/7.jpeg","/grand_reunion/8.jpeg","/grand_reunion/9.jpeg","/grand_reunion/10.jpeg","/grand_reunion/11.jpeg",]
  const homecoming=["/homecoming/1.jpeg","/homecoming/2.jpeg","homecoming/3.jpeg","/homecoming/4.jpeg","/homecoming/5.jpeg","/homecoming/6.jpeg","/homecoming/7.jpeg","/homecoming/8.jpeg",]

  const tabs = ["Alumni Meet", "Homecoming", "Grand Reunion"];

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNavbar />
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
            {/* small screen */}
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
        {
          activeTab === "Alumni Meet" &&<div>
            <EventGallery name="17th Annual Alumni Meet" array={Year17} />
            <EventGallery name="16th Annual Alumni Meet" array={Year16} />
          </div>
        }
        {
          activeTab === "Homecoming" &&<div>
            <EventGallery name="Hommecoming 2019" array={homecoming} />
            
          </div>
        }
        {
          activeTab === "Grand Reunion" &&<div>
            <EventGallery name="Grand Reunion" array={globalReunion} />
          </div>
        }
       
      
      </main>
    </div>
   <Footer />
    </div>
  );
};

export default InstitutionalDevelopmentPage;
