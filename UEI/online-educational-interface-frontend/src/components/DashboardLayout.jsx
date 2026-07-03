import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Shared dashboard layout: sidebar + topbar + page content
 */
const DashboardLayout = ({ title, children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Topbar title={title} />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
