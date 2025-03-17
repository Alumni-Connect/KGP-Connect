import React from "react";
import Header from "../../../components/Nav";
import MainContent from "../../../components/content";


const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full px-40 bg-gray-100 flex flex-col">
      <Header />

      <div className="flex w-full justify-center pt-4 px-4 no-scroll" >
        <div className="flex w-full gap-6">
          
         

          <div className="flex-1">
            <MainContent/>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default App;
