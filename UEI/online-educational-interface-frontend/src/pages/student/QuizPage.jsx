import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';

const QuizPage = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentAPI.getQuizzes(courseId)
      .then(r => { setQuizzes(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId]);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const res = await studentAPI.submitQuiz({ quizId: activeQuiz.id, answers });
      setResult(res.data);
      setActiveQuiz(null);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (activeQuiz) {
    return (
      <DashboardLayout title={activeQuiz.title}>
        <div className="mb-3">
          <span className="badge bg-primary me-2">
            <i className="bi bi-clock me-1"></i>{activeQuiz.duration} min
          </span>
          <span className="badge bg-secondary">{activeQuiz.questions?.length} questions</span>
        </div>

        {activeQuiz.questions?.map((q, i) => (
          <div key={q.id} className="stat-card mb-3">
            <p className="fw-semibold mb-3">Q{i + 1}: {q.questionText}</p>
            <div className="row g-2">
              {['A', 'B', 'C', 'D'].map(opt => (
                <div key={opt} className="col-md-6">
                  <label className={`d-flex align-items-center gap-2 p-3 rounded cursor-pointer border ${answers[q.id] === opt ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                    style={{ cursor: 'pointer' }}>
                    <input type="radio" name={`q_${q.id}`} value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)} />
                    <span className="badge bg-primary me-1">{opt}</span>
                    {q[`option${opt}`]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-secondary" onClick={() => setActiveQuiz(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmitQuiz} disabled={submitting}>
            {submitting ? <><span className="spinner-border spinner-border-sm me-1"></span>Submitting...</> : 'Submit Quiz'}
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Quizzes">
      <div className="mb-3">
        <Link to={`/student/courses/${courseId}`} className="text-muted small">
          <i className="bi bi-arrow-left me-1"></i>Back to Course
        </Link>
      </div>

      {result && (
        <div className="alert alert-success mb-4">
          <h5 className="fw-bold"><i className="bi bi-trophy-fill me-2"></i>Quiz Result</h5>
          <p className="mb-0">You scored <strong>{result.score}</strong> out of <strong>{result.total}</strong> in "{result.quizTitle}"</p>
        </div>
      )}

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : quizzes.length === 0 ? (
        <div className="stat-card text-center py-5">
          <i className="bi bi-patch-question display-3 text-muted"></i>
          <p className="text-muted mt-3">No quizzes available yet</p>
        </div>
      ) : (
        <div className="row g-3">
          {quizzes.map(q => (
            <div key={q.id} className="col-md-6">
              <div className="stat-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0">{q.title}</h6>
                  <span className="badge bg-primary">
                    <i className="bi bi-clock me-1"></i>{q.duration} min
                  </span>
                </div>
                <p className="text-muted small mb-3">
                  <i className="bi bi-list-ul me-1"></i>
                  {q.questions?.length || 0} questions
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => startQuiz(q)}>
                  <i className="bi bi-play-fill me-1"></i>Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default QuizPage;
