import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    teacherAPI.getCourses().then(r => setCourses(r.data)).catch(console.error);
    teacherAPI.getSubmissions().then(r => setSubmissions(r.data)).catch(console.error);
  }, []);

  const quickLinks = [
    { to: '/teacher/courses', icon: 'bi-book', label: 'My Courses', desc: `${courses.length} courses`, color: '#2563eb', bg: '#eff6ff' },
    { to: '/teacher/materials', icon: 'bi-file-earmark-text', label: 'Study Materials', desc: 'Upload resources', color: '#7c3aed', bg: '#f5f3ff' },
    { to: '/teacher/assignments', icon: 'bi-clipboard-check', label: 'Assignments', desc: 'Create & manage', color: '#16a34a', bg: '#f0fdf4' },
    { to: '/teacher/quizzes', icon: 'bi-patch-question', label: 'Quizzes', desc: 'Create quizzes', color: '#ea580c', bg: '#fff7ed' },
    { to: '/teacher/submissions', icon: 'bi-inbox', label: 'Submissions', desc: `${submissions.length} submissions`, color: '#dc2626', bg: '#fef2f2' },
  ];

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="mb-4">
        <h5 className="fw-bold">Welcome back, {user.name}! 👋</h5>
        <p className="text-muted">Here's what's happening in your courses today.</p>
      </div>

      <div className="row g-3 mb-4">
        {quickLinks.map((item, i) => (
          <div key={i} className="col-md-4 col-sm-6">
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

      {/* My Courses */}
      <div className="stat-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">My Courses</h6>
          <Link to="/teacher/courses" className="btn btn-sm btn-outline-primary">Manage</Link>
        </div>
        {courses.length === 0 ? (
          <p className="text-muted text-center py-3">No courses yet. <Link to="/teacher/courses">Create one!</Link></p>
        ) : (
          <div className="row g-3">
            {courses.slice(0, 4).map(c => (
              <div key={c.id} className="col-md-6">
                <div className="p-3 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <h6 className="fw-semibold mb-1">{c.courseName}</h6>
                  <small className="text-muted">{c.description?.slice(0, 60)}...</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
