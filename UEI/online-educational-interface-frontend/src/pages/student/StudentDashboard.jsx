import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    studentAPI.getEnrolledCourses().then(r => setEnrolledCourses(r.data)).catch(console.error);
    studentAPI.getAnnouncements().then(r => setAnnouncements(r.data)).catch(console.error);
  }, []);

  const quickLinks = [
    { to: '/student/courses', icon: 'bi-journal-bookmark', label: 'Browse Courses', desc: 'Find and enroll in courses', color: '#2563eb', bg: '#eff6ff' },
    { to: '/student/results', icon: 'bi-trophy', label: 'My Results', desc: 'View marks & quiz scores', color: '#16a34a', bg: '#f0fdf4' },
    { to: '/student/announcements', icon: 'bi-megaphone', label: 'Announcements', desc: `${announcements.length} new`, color: '#ea580c', bg: '#fff7ed' },
  ];

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="mb-4">
        <h5 className="fw-bold">Welcome back, {user.name}! 👋</h5>
        <p className="text-muted">You're enrolled in {enrolledCourses.length} course(s).</p>
      </div>

      {/* Quick Links */}
      <div className="row g-3 mb-4">
        {quickLinks.map((item, i) => (
          <div key={i} className="col-md-4">
            <Link to={item.to} className="text-decoration-none">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: item.bg }}>
                  <i className={`bi ${item.icon}`} style={{ color: item.color }}></i>
                </div>
                <div>
                  <p className="fw-semibold mb-0 text-dark">{item.label}</p>
                  <small className="text-muted">{item.desc}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <div className="stat-card mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">My Enrolled Courses</h6>
          <Link to="/student/courses" className="btn btn-sm btn-outline-primary">Browse All</Link>
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-muted">Not enrolled in any courses yet.</p>
            <Link to="/student/courses" className="btn btn-primary btn-sm">Browse Courses</Link>
          </div>
        ) : (
          <div className="row g-3">
            {enrolledCourses.map(c => (
              <div key={c.id} className="col-md-6">
                <div className="p-3 rounded border" style={{ borderColor: '#e2e8f0 !important' }}>
                  <h6 className="fw-semibold mb-1">{c.courseName}</h6>
                  <small className="text-muted d-block mb-2">By {c.teacherName}</small>
                  <div className="d-flex gap-2">
                    <Link to={`/student/courses/${c.id}`} className="btn btn-sm btn-primary">
                      <i className="bi bi-eye me-1"></i>View
                    </Link>
                    <Link to={`/student/materials/${c.id}`} className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-file-earmark me-1"></i>Materials
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Announcements */}
      <div className="stat-card">
        <h6 className="fw-bold mb-3">Recent Announcements</h6>
        {announcements.length === 0 ? (
          <p className="text-muted text-center py-2">No announcements yet</p>
        ) : announcements.slice(0, 3).map(a => (
          <div key={a.id} className="mb-3 p-3 rounded" style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
            <p className="fw-semibold mb-1 small">{a.title}</p>
            <p className="text-muted small mb-1">{a.message}</p>
            <small className="text-muted">{a.courseName} · {new Date(a.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
