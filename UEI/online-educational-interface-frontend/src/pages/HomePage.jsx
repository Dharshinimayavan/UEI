import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1e293b' }}>
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-mortarboard-fill me-2 text-primary"></i>EduInterface
          </span>
          <div className="ms-auto d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <h1 className="display-4 fw-bold mb-4">
                Learn Without <span style={{ color: '#60a5fa' }}>Limits</span>
              </h1>
              <p className="lead mb-4 opacity-75">
                A complete online education platform for students, teachers, and administrators.
                Access courses, quizzes, assignments, and study materials — all in one place.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-primary btn-lg px-4">Get Started</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4">Sign In</Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <i className="bi bi-mortarboard" style={{ fontSize: '12rem', color: 'rgba(255,255,255,0.15)' }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Everything You Need to Learn & Teach</h2>
            <p className="text-muted">Powerful tools for students, teachers, and administrators</p>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-person-check', color: '#eff6ff', iconColor: '#2563eb', title: 'Student Portal', desc: 'Enroll in courses, attend quizzes, submit assignments, and track your results.' },
              { icon: 'bi-person-video3', color: '#f5f3ff', iconColor: '#7c3aed', title: 'Teacher Portal', desc: 'Create courses, upload materials, manage assignments, and track performance.' },
              { icon: 'bi-shield-check', color: '#fff7ed', iconColor: '#ea580c', title: 'Admin Panel', desc: 'Manage users, monitor platform activity, and generate reports.' },
              { icon: 'bi-patch-question', color: '#f0fdf4', iconColor: '#16a34a', title: 'Interactive Quizzes', desc: 'Auto-graded MCQ quizzes with instant score feedback.' },
              { icon: 'bi-file-earmark-text', color: '#fef2f2', iconColor: '#dc2626', title: 'Assignments', desc: 'Submit assignments and receive marks from teachers.' },
              { icon: 'bi-megaphone', color: '#fefce8', iconColor: '#ca8a04', title: 'Announcements', desc: 'Stay updated with course announcements from teachers.' },
            ].map((f, i) => (
              <div key={i} className="col-md-4">
                <div className="feature-card h-100">
                  <div className="feature-icon mb-3" style={{ background: f.color }}>
                    <i className={`bi ${f.icon}`} style={{ color: f.iconColor }}></i>
                  </div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Default Credentials */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="fw-bold">Demo Credentials</h3>
            <p className="text-muted">Use these to explore the platform</p>
          </div>
          <div className="row g-3 justify-content-center">
            {[
              { role: 'Admin', email: 'admin@gmail.com', pass: 'admin123', color: '#dc2626', icon: 'bi-shield-fill' },
              { role: 'Teacher', email: 'teacher@gmail.com', pass: 'teacher123', color: '#7c3aed', icon: 'bi-person-video3' },
              { role: 'Student', email: 'student@gmail.com', pass: 'student123', color: '#2563eb', icon: 'bi-person-check' },
            ].map((c, i) => (
              <div key={i} className="col-md-3">
                <div className="card border-0 shadow-sm text-center p-3">
                  <i className={`bi ${c.icon} fs-2 mb-2`} style={{ color: c.color }}></i>
                  <h6 className="fw-bold">{c.role}</h6>
                  <small className="text-muted d-block">{c.email}</small>
                  <small className="text-muted">{c.pass}</small>
                  <Link to="/login" className="btn btn-sm mt-2" style={{ background: c.color, color: 'white' }}>
                    Login as {c.role}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-muted" style={{ background: '#1e293b', color: '#94a3b8 !important' }}>
        <div className="container">
          <p className="mb-0" style={{ color: '#94a3b8' }}>
            &copy; 2024 Online Educational Interface. Built with React & Spring Boot.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
