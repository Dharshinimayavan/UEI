import React from 'react';

/**
 * Top navigation bar showing page title and user info
 */
const Topbar = ({ title }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="topbar">
      <div>
        <h5 className="mb-0 fw-bold text-dark">{title}</h5>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">
          <i className="bi bi-bell me-1"></i>
        </span>
        <span className="text-muted small">
          Welcome, <strong>{user.name}</strong>
        </span>
      </div>
    </div>
  );
};

export default Topbar;
