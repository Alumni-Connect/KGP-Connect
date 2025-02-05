import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Nav';
import MainContent from '../../components/content';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />
      <Header />
      <MainContent />
    </div>
  );
};

export default App;