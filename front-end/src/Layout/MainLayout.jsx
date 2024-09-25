import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-dark-blue text-white">
      <Sidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;