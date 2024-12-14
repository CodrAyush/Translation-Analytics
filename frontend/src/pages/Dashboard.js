// src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AnalyticsPanel from '../components/AnalyticsPanel';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <AnalyticsPanel />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
