import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';

const ResultPage = () => {
  const [results, setResults] = useState({ assignmentResults: [], quizResults: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('assignments');

  useEffect(() => {
    studentAPI.getResults()
      .then(r => { setResults(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="My Results">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'assignments' ? 'active' : ''}`}
            onClick={() => setTab('assignments')}>
            <i className="bi bi-clipboard-check me-1"></i>
            Assignments ({results.assignmentResults.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'quizzes' ? 'active' : ''}`}
            onClick={() => setTab('quizzes')}>
            <i className="bi bi-patch-question me-1"></i>
            Quizzes ({results.quizResults.length})
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : tab === 'assignments' ? (
        results.assignmentResults.length === 0 ? (
          <div className="stat-card text-center py-5">
            <i className="bi bi-clipboard display-3 text-muted"></i>
            <p className="text-muted mt-3">No assignment submissions yet</p>
          </div>
        ) : (
          <div className="table-custom">
            <table className="table mb-0">
              <thead>
                <tr><th>Assignment</th><th>Submitted</th><th>Marks</th><th>File</th></tr>
              </thead>
              <tbody>
                {results.assignmentResults.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.assignmentTitle}</strong></td>
                    <td><small className="text-muted">{new Date(s.submittedAt).toLocaleDateString()}</small></td>
                    <td>
                      {s.marks != null
                        ? <span className="badge bg-success fs-6">{s.marks}/100</span>
                        : <span className="badge bg-secondary">Pending</span>}
                    </td>
                    <td>
                      {s.fileUrl && (
                        <a href={s.fileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-link-45deg"></i>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        results.quizResults.length === 0 ? (
          <div className="stat-card text-center py-5">
            <i className="bi bi-trophy display-3 text-muted"></i>
            <p className="text-muted mt-3">No quiz attempts yet</p>
          </div>
        ) : (
          <div className="table-custom">
            <table className="table mb-0">
              <thead>
                <tr><th>Quiz</th><th>Score</th><th>Attempted</th></tr>
              </thead>
              <tbody>
                {results.quizResults.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.quizTitle || `Quiz #${r.quizId}`}</strong></td>
                    <td>
                      <span className="badge bg-primary fs-6">{r.score} pts</span>
                    </td>
                    <td><small className="text-muted">{new Date(r.attemptedAt).toLocaleDateString()}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </DashboardLayout>
  );
};

export default ResultPage;
