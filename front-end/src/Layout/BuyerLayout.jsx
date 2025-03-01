import React from 'react';
import BuyerSidebar from '../components/BuyerSidebar';

const BuyerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-dark-blue text-white">
      <BuyerSidebar/>
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default BuyerLayout;