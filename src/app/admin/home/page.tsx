import React from "react";
import Header from "../../../components/Nav";
import MainContent from "../../../components/content";

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Header />

      <div className="flex w-full justify-center pt-4 px-4 sm:px-6 lg:px-8 xl:px-12 mt-16">
        <div className="flex w-full max-w-7xl gap-4 lg:gap-6">
          <div className="flex-1">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
