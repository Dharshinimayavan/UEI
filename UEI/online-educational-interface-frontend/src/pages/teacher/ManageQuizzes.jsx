import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { teacherAPI } from '../../services/api';

const ManageQuizzes = () => {
  const [courses, setCourses] = useState([]);
  const [step, setStep] = useState(1); // 1=quiz info, 2=add questions
  const [quizId, setQuizId] = useState(null);
  const [quizForm, setQuizForm] = useState({ courseId: '', title: '', duration: 30 });
  const [qForm, setQForm] = useState({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' });
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    teacherAPI.getCourses().then(r => setCourses(r.data)).catch(console.error);
  }, []);

  const handleCreateQuiz = async () => {
    setError('');
    try {
      const res = await teacherAPI.createQuiz({ courseId: Number(quizForm.courseId), title: quizForm.title, duration: Number(quizForm.duration) });
      setQuizId(res.data.id);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create quiz');
    }
  };

  const handleAddQuestion = async () => {
    setError('');
    try {
      await teacherAPI.addQuestion({ ...qForm, quizId });
      setQuestions([...questions, { ...qForm }]);
      setQForm({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add question');
    }
  };

  return (
    <DashboardLayout title="Manage Quizzes">
      {step === 1 && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="stat-card">
              <h6 className="fw-bold mb-4">Create New Quiz</h6>
              {error && <div className="alert alert-danger py-2 small">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Course</label>
                <select className="form-select" value={quizForm.courseId}
                  onChange={e => setQuizForm({ ...quizForm, courseId: e.target.value })}>
                  <option value="">-- Select Course --</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quiz Title</label>
                <input className="form-control" value={quizForm.title}
                  onChange={e => setQuizForm({ ...quizForm, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label">Duration (minutes)</label>
                <input type="number" className="form-control" value={quizForm.duration}
                  onChange={e => setQuizForm({ ...quizForm, duration: e.target.value })} />
              </div>
              <button className="btn btn-primary w-100" onClick={handleCreateQuiz}>
                Create Quiz & Add Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="stat-card">
              <h6 className="fw-bold mb-4">Add Question</h6>
              {error && <div className="alert alert-danger py-2 small">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Question Text</label>
                <textarea className="form-control" rows={2} value={qForm.questionText}
                  onChange={e => setQForm({ ...qForm, questionText: e.target.value })}></textarea>
              </div>
              {['A', 'B', 'C', 'D'].map(opt => (
                <div className="mb-2" key={opt}>
                  <label className="form-label small">Option {opt}</label>
                  <input className="form-control form-control-sm" value={qForm[`option${opt}`]}
                    onChange={e => setQForm({ ...qForm, [`option${opt}`]: e.target.value })} />
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <select className="form-select" value={qForm.correctAnswer}
                  onChange={e => setQForm({ ...qForm, correctAnswer: e.target.value })}>
                  {['A', 'B', 'C', 'D'].map(o => <option key={o} value={o}>Option {o}</option>)}
                </select>
              </div>
              <button className="btn btn-success w-100 mb-2" onClick={handleAddQuestion}>Add Question</button>
              <button className="btn btn-primary w-100" onClick={() => { setStep(1); setQuestions([]); }}>
                Finish Quiz
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stat-card">
              <h6 className="fw-bold mb-3">Questions Added ({questions.length})</h6>
              {questions.length === 0 ? (
                <p className="text-muted small text-center py-3">No questions added yet</p>
              ) : questions.map((q, i) => (
                <div key={i} className="mb-2 p-2 rounded" style={{ background: '#f8fafc' }}>
                  <p className="small fw-semibold mb-1">Q{i + 1}: {q.questionText}</p>
                  <small className="text-muted">Correct: Option {q.correctAnswer}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageQuizzes;
