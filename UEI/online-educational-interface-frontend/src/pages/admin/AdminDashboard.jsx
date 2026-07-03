import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../services/api';

const StatCard = ({ icon, label, value, bg, iconColor }) => (
  <div className="col-md-4 col-sm-6">
    <div className="stat-card">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted small mb-1">{label}</p>
          <h2 className="fw-bold mb-0">{value ?? '...'}</h2>
        </div>
        <div className="stat-icon" style={{ background: bg }}>
          <i className={`bi ${icon}`} style={{ color: iconColor }}></i>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminAPI.getDashboard().then(r => setStats(r.data)).catch(console.error);
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="row g-4 mb-4">
        <StatCard icon="bi-people-fill" label="Total Students" value={stats?.totalStudents} bg="#eff6ff" iconColor="#2563eb" />
        <StatCard icon="bi-person-video3" label="Total Teachers" value={stats?.totalTeachers} bg="#f5f3ff" iconColor="#7c3aed" />
        <StatCard icon="bi-book-fill" label="Total Courses" value={stats?.totalCourses} bg="#f0fdf4" iconColor="#16a34a" />
        <StatCard icon="bi-clipboard-check-fill" label="Assignments" value={stats?.totalAssignments} bg="#fff7ed" iconColor="#ea580c" />
        <StatCard icon="bi-patch-question-fill" label="Quizzes" value={stats?.totalQuizzes} bg="#fef2f2" iconColor="#dc2626" />
      </div>

      {/* Quick links */}
      <div className="row g-3">
        <div className="col-12">
          <h6 className="fw-bold text-muted mb-3">QUICK ACTIONS</h6>
        </div>
        {[
          { href: '/admin/users', icon: 'bi-people', label: 'Manage Users', desc: 'Add, edit or remove students and teachers', color: '#2563eb' },
          { href: '/admin/reports', icon: 'bi-bar-chart-fill', label: 'View Reports', desc: 'Platform usage and activity reports', color: '#7c3aed' },
        ].map((item, i) => (
          <div key={i} className="col-md-4">
            <a href={item.href} className="text-decoration-none">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: item.color + '20' }}>
                  <i className={`bi ${item.icon}`} style={{ color: item.color }}></i>
                </div>
                <div>
                  <p className="fw-semibold mb-0">{item.label}</p>
                  <small className="text-muted">{item.desc}</small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
