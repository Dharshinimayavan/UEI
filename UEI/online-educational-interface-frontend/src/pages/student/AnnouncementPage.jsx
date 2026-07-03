import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAPI.getAnnouncements()
      .then(r => { setAnnouncements(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Announcements">
      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : announcements.length === 0 ? (
        <div className="stat-card text-center py-5">
          <i className="bi bi-megaphone display-3 text-muted"></i>
          <p className="text-muted mt-3">No announcements yet. Enroll in courses to see updates.</p>
        </div>
      ) : (
        <div className="row g-3">
          {announcements.map(a => (
            <div key={a.id} className="col-12">
              <div className="p-4 rounded-3 bg-white shadow-sm"
                style={{ borderLeft: '4px solid #f59e0b' }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0">{a.title}</h6>
                  <small className="text-muted">{new Date(a.createdAt).toLocaleDateString()}</small>
                </div>
                <p className="text-muted small mb-2">{a.message}</p>
                <span className="badge" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <i className="bi bi-book me-1"></i>{a.courseName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AnnouncementPage;
