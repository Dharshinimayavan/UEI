import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';

const StudyMaterialsPage = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAPI.getMaterials(courseId)
      .then(r => { setMaterials(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId]);

  return (
    <DashboardLayout title="Study Materials">
      <div className="mb-3">
        <Link to={`/student/courses/${courseId}`} className="text-muted small">
          <i className="bi bi-arrow-left me-1"></i>Back to Course
        </Link>
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : materials.length === 0 ? (
        <div className="stat-card text-center py-5">
          <i className="bi bi-file-earmark display-3 text-muted"></i>
          <p className="text-muted mt-3">No study materials uploaded yet</p>
        </div>
      ) : (
        <div className="row g-3">
          {materials.map(m => (
            <div key={m.id} className="col-md-6">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: '#eff6ff' }}>
                  <i className="bi bi-file-earmark-pdf" style={{ color: '#dc2626', fontSize: '1.5rem' }}></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">{m.title}</h6>
                  <small className="text-muted">{m.courseName}</small>
                  <br />
                  <small className="text-muted">{new Date(m.uploadedAt).toLocaleDateString()}</small>
                </div>
                {m.fileUrl && (
                  <a href={m.fileUrl} target="_blank" rel="noreferrer"
                    className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-download me-1"></i>Open
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudyMaterialsPage;
