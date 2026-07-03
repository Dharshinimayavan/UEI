import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markModal, setMarkModal] = useState(null);
  const [marks, setMarks] = useState('');

  const fetchSubmissions = () => {
    setLoading(true);
    teacherAPI.getSubmissions()
      .then(r => { setSubmissions(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleUpdateMarks = async () => {
    try {
      await teacherAPI.updateMarks(markModal.id, Number(marks));
      setMarkModal(null);
      fetchSubmissions();
    } catch {
      alert('Failed to update marks');
    }
  };

  return (
    <DashboardLayout title="Assignment Submissions">
      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : submissions.length === 0 ? (
        <div className="stat-card text-center py-5">
          <i className="bi bi-inbox display-3 text-muted"></i>
          <p className="text-muted mt-3">No submissions yet</p>
        </div>
      ) : (
        <div className="table-custom">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th><th>Student</th><th>Assignment</th><th>Submitted</th>
                <th>File</th><th>Marks</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td><strong>{s.studentName}</strong></td>
                  <td>{s.assignmentTitle}</td>
                  <td><small className="text-muted">{new Date(s.submittedAt).toLocaleDateString()}</small></td>
                  <td>
                    {s.fileUrl ? (
                      <a href={s.fileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-link-45deg"></i> View
                      </a>
                    ) : <span className="text-muted small">No file</span>}
                  </td>
                  <td>
                    {s.marks != null
                      ? <span className="badge bg-success">{s.marks} marks</span>
                      : <span className="badge bg-secondary">Pending</span>}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-warning"
                      onClick={() => { setMarkModal(s); setMarks(s.marks || ''); }}>
                      <i className="bi bi-pencil-square"></i> Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {markModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title">Grade Submission</h6>
                <button className="btn-close" onClick={() => setMarkModal(null)}></button>
              </div>
              <div className="modal-body">
                <p className="small text-muted mb-1">Student: <strong>{markModal.studentName}</strong></p>
                <p className="small text-muted mb-3">Assignment: <strong>{markModal.assignmentTitle}</strong></p>
                <label className="form-label">Marks</label>
                <input type="number" className="form-control" value={marks}
                  onChange={e => setMarks(e.target.value)} min={0} max={100} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setMarkModal(null)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={handleUpdateMarks}>Save Marks</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewSubmissions;
