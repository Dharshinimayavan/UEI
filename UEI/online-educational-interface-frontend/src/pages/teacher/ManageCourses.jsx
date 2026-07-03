import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [form, setForm] = useState({ courseName: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    setLoading(true);
    teacherAPI.getCourses().then(r => { setCourses(r.data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const openCreate = () => {
    setEditCourse(null);
    setForm({ courseName: '', description: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditCourse(c);
    setForm({ courseName: c.courseName, description: c.description || '' });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    setError('');
    try {
      if (editCourse) await teacherAPI.updateCourse(editCourse.id, form);
      else await teacherAPI.createCourse(form);
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try { await teacherAPI.deleteCourse(id); fetchCourses(); }
    catch { alert('Failed to delete course'); }
  };

  return (
    <DashboardLayout title="Manage Courses">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted mb-0">{courses.length} course(s)</p>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="bi bi-plus-lg me-1"></i> New Course
        </button>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-book display-1 text-muted"></i>
          <p className="text-muted mt-3">No courses yet. Create your first course!</p>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map(c => (
            <div key={c.id} className="col-md-4">
              <div className="course-card h-100">
                <div className="course-card-header">
                  <i className="bi bi-book-fill fs-3 mb-2 d-block"></i>
                  <h5 className="fw-bold mb-0">{c.courseName}</h5>
                </div>
                <div className="p-3">
                  <p className="text-muted small">{c.description || 'No description'}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(c)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editCourse ? 'Edit Course' : 'New Course'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input className="form-control" value={form.courseName}
                    onChange={e => setForm({ ...form, courseName: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3} value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageCourses;
