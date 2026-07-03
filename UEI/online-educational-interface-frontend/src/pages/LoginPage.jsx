import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.login(form);
      const { token, email, name, role, userId } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, name, role, userId }));

      // Redirect based on role
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'TEACHER') navigate('/teacher');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (email, password) => setForm({ email, password });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <i className="bi bi-mortarboard-fill"></i>
          <h4 className="fw-bold mt-2">EduInterface</h4>
          <p className="text-muted small">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small">
            <i className="bi bi-exclamation-circle me-1"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Email Address</label>
            <input
              type="email" name="email" className="form-control"
              placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold small">Password</label>
            <input
              type="password" name="password" className="form-control"
              placeholder="Enter your password"
              value={form.password} onChange={handleChange} required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</> : 'Sign In'}
          </button>
        </form>

        {/* Quick demo fill buttons */}
        <div className="mt-4">
          <p className="text-muted text-center small mb-2">Quick Demo Login</p>
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <button className="btn btn-sm btn-outline-danger" onClick={() => fillDemo('admin@gmail.com', 'admin123')}>Admin</button>
            <button className="btn btn-sm btn-outline-purple" style={{ borderColor: '#7c3aed', color: '#7c3aed' }} onClick={() => fillDemo('teacher@gmail.com', 'teacher123')}>Teacher</button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => fillDemo('student@gmail.com', 'student123')}>Student</button>
          </div>
        </div>

        <p className="text-center mt-4 small text-muted">
          Don't have an account? <Link to="/register" className="text-primary fw-semibold">Register</Link>
        </p>
        <p className="text-center small">
          <Link to="/" className="text-muted"><i className="bi bi-arrow-left me-1"></i>Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
