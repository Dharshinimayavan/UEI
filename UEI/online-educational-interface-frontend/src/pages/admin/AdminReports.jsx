import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../services/api';

const AdminReports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    adminAPI.getReports().then(r => setReport(r.data)).catch(console.error);
  }, []);

  const items = report ? [
    { label: 'Total Students', value: report.totalStudents, icon: 'bi-people-fill', color: '#2563eb', bg: '#eff6ff' },
    { label: 'Total Teachers', value: report.totalTeachers, icon: 'bi-person-video3', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Total Courses', value: report.totalCourses, icon: 'bi-book-fill', color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Total Assignments', value: report.totalAssignments, icon: 'bi-clipboard-check-fill', color: '#ea580c', bg: '#fff7ed' },
    { label: 'Total Quizzes', value: report.totalQuizzes, icon: 'bi-patch-question-fill', color: '#dc2626', bg: '#fef2f2' },
    { label: 'Total Enrollments', value: report.totalEnrollments, icon: 'bi-journal-check', color: '#0891b2', bg: '#ecfeff' },
  ] : [];

  return (
    <DashboardLayout title="Platform Reports">
      {!report ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : (
        <>
          <div className="row g-4">
            {items.map((item, i) => (
              <div key={i} className="col-md-4 col-sm-6">
                <div className="stat-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted small mb-1">{item.label}</p>
                      <h2 className="fw-bold mb-0">{item.value}</h2>
                    </div>
                    <div className="stat-icon" style={{ background: item.bg }}>
                      <i className={`bi ${item.icon}`} style={{ color: item.color }}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 stat-card">
            <h6 className="fw-bold mb-3">Platform Summary</h6>
            <p className="text-muted small">
              The platform currently has <strong>{report.totalStudents}</strong> students and{' '}
              <strong>{report.totalTeachers}</strong> teachers across{' '}
              <strong>{report.totalCourses}</strong> courses.
              There are <strong>{report.totalEnrollments}</strong> total enrollments,{' '}
              <strong>{report.totalAssignments}</strong> assignments, and{' '}
              <strong>{report.totalQuizzes}</strong> quizzes.
            </p>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminReports;
