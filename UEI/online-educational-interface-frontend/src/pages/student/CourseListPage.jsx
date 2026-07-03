import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { studentAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = () => {
    setLoading(true);
    Promise.all([studentAPI.getAllCourses(), studentAPI.getEnrolledCourses()])
      .then(([all, enr]) => {
        setCourses(all.data);
        setEnrolled(enr.data.map(c => c.id));
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await studentAPI.enrollCourse(courseId);
      setEnrolled(prev => [...prev, courseId]);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to enroll');
    } finally {
      setEnrolling(null);
    }
  };

  const filtered = courses.filter(c =>
    c.courseName.toLowerCase().includes(search.toLowerCase()) ||
    c.teacherName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="All Courses">
      <div className="mb-4">
        <input className="form-control" style={{ maxWidth: 350 }}
          placeholder="Search courses..." value={search}
          onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="spinner-container"><div className="spinner-border text-primary"></div></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-journal-x display-3 text-muted"></i>
          <p className="text-muted mt-3">No courses found</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map(c => {
            const isEnrolled = enrolled.includes(c.id);
            return (
              <div key={c.id} className="col-md-4">
                <div className="course-card h-100">
                  <div className="course-card-header">
                    <i className="bi bi-book-fill fs-3 mb-2 d-block opacity-75"></i>
                    <h5 className="fw-bold mb-1">{c.courseName}</h5>
                    <small className="opacity-75"><i className="bi bi-person me-1"></i>{c.teacherName}</small>
                  </div>
                  <div className="p-3">
                    <p className="text-muted small mb-3">{c.description || 'No description available'}</p>
                    <div className="d-flex gap-2">
                      {isEnrolled ? (
                        <>
                          <span className="badge bg-success py-2 px-3">
                            <i className="bi bi-check-circle me-1"></i>Enrolled
                          </span>
                          <Link to={`/student/courses/${c.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye me-1"></i>View
                          </Link>
                        </>
                      ) : (
                        <button className="btn btn-primary btn-sm"
                          onClick={() => handleEnroll(c.id)}
                          disabled={enrolling === c.id}>
                          {enrolling === c.id
                            ? <><span className="spinner-border spinner-border-sm me-1"></span>Enrolling...</>
                            : <><i className="bi bi-plus-circle me-1"></i>Enroll</>}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourseListPage;
