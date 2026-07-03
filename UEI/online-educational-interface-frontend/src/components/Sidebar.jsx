import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

/**
 * Sidebar navigation component - adapts links based on user role
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Navigation links per role
  const adminLinks = [
    { to: '/admin', icon: 'bi-speedometer2', label: 'Dashboard' },
    { to: '/admin/users', icon: 'bi-people', label: 'Manage Users' },
    { to: '/admin/reports', icon: 'bi-bar-chart', label: 'Reports' },
  ];

  const teacherLinks = [
    { to: '/teacher', icon: 'bi-speedometer2', label: 'Dashboard' },
    { to: '/teacher/courses', icon: 'bi-book', label: 'My Courses' },
    { to: '/teacher/materials', icon: 'bi-file-earmark-text', label: 'Study Materials' },
    { to: '/teacher/assignments', icon: 'bi-clipboard-check', label: 'Assignments' },
    { to: '/teacher/quizzes', icon: 'bi-patch-question', label: 'Quizzes' },
    { to: '/teacher/submissions', icon: 'bi-inbox', label: 'Submissions' },
  ];

  const studentLinks = [
    { to: '/student', icon: 'bi-speedometer2', label: 'Dashboard' },
    { to: '/student/courses', icon: 'bi-journal-bookmark', label: 'All Courses' },
    { to: '/student/results', icon: 'bi-trophy', label: 'My Results' },
    { to: '/student/announcements', icon: 'bi-megaphone', label: 'Announcements' },
  ];

  const getLinks = () => {
    if (user.role === 'ADMIN') return adminLinks;
    if (user.role === 'TEACHER') return teacherLinks;
    return studentLinks;
  };

  const getRoleColor = () => {
    if (user.role === 'ADMIN') return '#ef4444';
    if (user.role === 'TEACHER') return '#8b5cf6';
    return '#3b82f6';
  };

  return (
    <div className="sidebar d-flex flex-column">
      {/* Brand */}
      <div className="sidebar-brand">
        <i className="bi bi-mortarboard-fill"></i>
        <span>EduInterface</span>
      </div>

      {/* User info */}
      <div className="px-3 py-3 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2">
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: getRoleColor(),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '1rem'
          }}>
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>
              {user.name}
            </div>
            <span style={{
              fontSize: '0.7rem', padding: '1px 8px', borderRadius: 20,
              background: getRoleColor(), color: 'white', fontWeight: 500
            }}>
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav flex-grow-1">
        {getLinks().map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin' || link.to === '/teacher' || link.to === '/student'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <button
          onClick={handleLogout}
          className="btn w-100 text-start d-flex align-items-center gap-2"
          style={{ color: '#94a3b8', fontSize: '0.875rem' }}
        >
          <i className="bi bi-box-arrow-left"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
