import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Nav";
import MainContent from "../../components/content";
import Achievements from "../../components/Achievement";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Layout */}
      <div className="flex w-full justify-center pt-4 px-2">
        <div className="flex w-full max-w-7xl gap-4">

          {/* Sidebar */}
          <div className="w-60 min-w-[240px] bg-white shadow-md p-3 rounded-lg">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
           
              <MainContent />

          </div>

          {/* Achievements Section */}
          <div className="w-60 min-w-[240px] bg-white shadow-md p-3 rounded-lg">
            <Achievements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
