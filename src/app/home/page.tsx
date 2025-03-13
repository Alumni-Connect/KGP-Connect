import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Nav";
import MainContent from "../../components/content";
import Achievements from "../../components/Achievement";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex w-full justify-center pt-4 px-4 no-scroll">
        <div className="flex w-full max-w-7xl gap-6">
          {/* Sidebar - Hidden on small screens */}
          <div className="hidden lg:block w-60 min-w-[240px]">
            <Sidebar />
          </div>

          {/* Main Content - Always Visible */}
          <div className="flex-1">
            <MainContent />
          </div>

          {/* Achievements - Hidden on small screens, visible on md+ */}
          <div className="hidden md:block w-72 min-w-[280px] pt-4 mt-12">
            <Achievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
