import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';

const ManageMaterials = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ courseId: '', title: '', fileUrl: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    teacherAPI.getCourses().then(r => setCourses(r.data)).catch(console.error);
  }, []);

  const handleSave = async () => {
    setError('');
    try {
      await teacherAPI.addMaterial({ ...form, courseId: Number(form.courseId) });
      setShowModal(false);
      setForm({ courseId: '', title: '', fileUrl: '' });
      alert('Material added successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add material');
    }
  };

  return (
    <DashboardLayout title="Study Materials">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted mb-0">Upload study materials for your courses</p>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-upload me-1"></i> Upload Material
        </button>
      </div>

      <div className="stat-card text-center py-5">
        <i className="bi bi-file-earmark-text display-3 text-muted"></i>
        <p className="text-muted mt-3">Use the "Upload Material" button to add study materials to your courses.</p>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Study Material</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Select Course</label>
                  <select className="form-select" value={form.courseId}
                    onChange={e => setForm({ ...form, courseId: e.target.value })}>
                    <option value="">-- Select Course --</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Material Title</label>
                  <input className="form-control" placeholder="e.g. Chapter 1 Notes"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">File URL / Link</label>
                  <input className="form-control" placeholder="https://..."
                    value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} />
                  <small className="text-muted">Paste a link to Google Drive, PDF, or any hosted file</small>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageMaterials;
