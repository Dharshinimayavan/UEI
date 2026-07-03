import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';

const AssignmentPage = () => {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitModal, setSubmitModal] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentAPI.getAssignments(courseId)
      .then(r => { setAssignments(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await studentAPI.submitAssignment({ assignmentId: submitModal.id, fileUrl });
      alert('Assignment submitted successfully!');
      setSubmitModal(null);
      setFileUrl('');
    } catch (err) {
      alert(err.response?.data?.error || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const isPastDue = (dueDate) => dueDate && new Date(dueDate) < new Date();

  return (
    <DashboardLayout title="Assignments">
      <div className="mb-3">
        <Link to={`/student/courses/${courseId}`} className="text-muted small">
          <i className="bi bi-arrow-left me-1"></i>Back to Course
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : assignments.length === 0 ? (
        <div className="stat-card text-center py-5">
          <i className="bi bi-clipboard display-3 text-muted"></i>
          <p className="text-muted mt-3">No assignments posted yet</p>
        </div>
      ) : (
        <div className="row g-3">
          {assignments.map(a => (
            <div key={a.id} className="col-12">
              <div className="stat-card">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1">{a.title}</h6>
                    <p className="text-muted small mb-2">{a.description}</p>
                    {a.dueDate && (
                      <span className={`badge ${isPastDue(a.dueDate) ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        <i className="bi bi-calendar me-1"></i>
                        Due: {new Date(a.dueDate).toLocaleDateString()}
                        {isPastDue(a.dueDate) ? ' (Overdue)' : ''}
                      </span>
                    )}
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => { setSubmitModal(a); setFileUrl(''); }}
                    disabled={isPastDue(a.dueDate)}>
                    <i className="bi bi-upload me-1"></i>Submit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {submitModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title">Submit: {submitModal.title}</h6>
                <button className="btn-close" onClick={() => setSubmitModal(null)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">File URL / Link</label>
                <input className="form-control" placeholder="https://drive.google.com/..."
                  value={fileUrl} onChange={e => setFileUrl(e.target.value)} />
                <small className="text-muted">Paste a link to your Google Drive, Dropbox, or hosted file</small>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setSubmitModal(null)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AssignmentPage;
