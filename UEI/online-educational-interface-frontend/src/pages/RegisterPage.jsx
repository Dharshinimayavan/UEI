import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.register(form);
      const { token, email, name, role, userId } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, name, role, userId }));

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'TEACHER') navigate('/teacher');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <i className="bi bi-mortarboard-fill"></i>
          <h4 className="fw-bold mt-2">EduInterface</h4>
          <p className="text-muted small">Create your account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small">
            <i className="bi bi-exclamation-circle me-1"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Full Name</label>
            <input
              type="text" name="name" className="form-control"
              placeholder="Enter your full name"
              value={form.name} onChange={handleChange} required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Email Address</label>
            <input
              type="email" name="email" className="form-control"
              placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Password</label>
            <input
              type="password" name="password" className="form-control"
              placeholder="At least 6 characters"
              value={form.password} onChange={handleChange} required minLength={6}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold small">Register As</label>
            <select name="role" className="form-select" value={form.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</> : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-4 small text-muted">
          Already have an account? <Link to="/login" className="text-primary fw-semibold">Sign In</Link>
        </p>
        <p className="text-center small">
          <Link to="/" className="text-muted"><i className="bi bi-arrow-left me-1"></i>Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
