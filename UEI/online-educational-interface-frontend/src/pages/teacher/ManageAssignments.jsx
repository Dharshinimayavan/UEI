import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';

const ManageAssignments = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ courseId: '', title: '', description: '', dueDate: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    teacherAPI.getCourses().then(r => setCourses(r.data)).catch(console.error);
  }, []);

  const handleSave = async () => {
    setError('');
    try {
      await teacherAPI.createAssignment({
        courseId: Number(form.courseId),
        title: form.title,
        description: form.description,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      });
      setShowModal(false);
      setForm({ courseId: '', title: '', description: '', dueDate: '' });
      alert('Assignment created successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create assignment');
    }
  };

  return (
    <DashboardLayout title="Manage Assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted mb-0">Create and manage assignments for your courses</p>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> New Assignment
        </button>
      </div>

      <div className="stat-card text-center py-5">
        <i className="bi bi-clipboard-check display-3 text-muted"></i>
        <p className="text-muted mt-3">Click "New Assignment" to create assignments for your students.</p>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Assignment</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <select className="form-select" value={form.courseId}
                    onChange={e => setForm({ ...form, courseId: e.target.value })}>
                    <option value="">-- Select Course --</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input type="datetime-local" className="form-control" value={form.dueDate}
                    onChange={e => setForm({ ...form, dueDate: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageAssignments;
