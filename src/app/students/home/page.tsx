import React from "react";
import Header from "../../../components/Nav";
import MainContent from "../../../components/content";
import Achievements from "../../../components/Achievement";
import Sidebar from "@/components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex w-full justify-center pt-4 px-4 no-scroll">
        <div className="flex w-full max-w-7xl gap-6">
          <div className="hidden lg:block w-60 min-w-[240px] mr-9">
            <Sidebar />
          </div>

          <div className="flex-1">
            <MainContent />
          </div>

          <div className="hidden md:block w-72 min-w-[280px] pt-4 mt-12">
            <Achievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
