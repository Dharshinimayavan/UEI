import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

const CourseDetailPage = () => {
  const { courseId } = useParams();

  const links = [
    { to: `/student/materials/${courseId}`, icon: 'bi-file-earmark-text', label: 'Study Materials', desc: 'Access uploaded notes, slides and PDFs', color: '#2563eb', bg: '#eff6ff' },
    { to: `/student/assignments/${courseId}`, icon: 'bi-clipboard-check', label: 'Assignments', desc: 'View and submit assignments', color: '#16a34a', bg: '#f0fdf4' },
    { to: `/student/quizzes/${courseId}`, icon: 'bi-patch-question', label: 'Quizzes', desc: 'Attempt MCQ quizzes', color: '#7c3aed', bg: '#f5f3ff' },
  ];

  return (
    <DashboardLayout title="Course Details">
      <div className="mb-4">
        <Link to="/student/courses" className="text-muted small">
          <i className="bi bi-arrow-left me-1"></i>Back to Courses
        </Link>
      </div>

      <div className="row g-4">
        {links.map((item, i) => (
          <div key={i} className="col-md-4">
            <Link to={item.to} className="text-decoration-none">
              <div className="stat-card text-center py-4">
                <div className="stat-icon mx-auto mb-3" style={{ background: item.bg }}>
                  <i className={`bi ${item.icon}`} style={{ color: item.color, fontSize: '1.5rem' }}></i>
                </div>
                <h6 className="fw-bold text-dark">{item.label}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailPage;
