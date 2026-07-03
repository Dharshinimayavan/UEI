import axios from 'axios';

// Base API URL - points to Spring Boot backend
const BASE_URL = 'http://localhost:8080';

// Create axios instance with defaults
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH APIs =====
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

// ===== ADMIN APIs =====
export const adminAPI = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getAllUsers: () => api.get('/api/admin/users'),
  createUser: (data) => api.post('/api/admin/users', data),
  updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getReports: () => api.get('/api/admin/reports'),
};

// ===== TEACHER APIs =====
export const teacherAPI = {
  getCourses: () => api.get('/api/teacher/courses'),
  createCourse: (data) => api.post('/api/teacher/courses', data),
  updateCourse: (id, data) => api.put(`/api/teacher/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/api/teacher/courses/${id}`),
  addMaterial: (data) => api.post('/api/teacher/materials', data),
  createAssignment: (data) => api.post('/api/teacher/assignments', data),
  getSubmissions: () => api.get('/api/teacher/submissions'),
  updateMarks: (id, marks) => api.put(`/api/teacher/submissions/${id}/marks`, { marks }),
  createQuiz: (data) => api.post('/api/teacher/quizzes', data),
  addQuestion: (data) => api.post('/api/teacher/questions', data),
  getPerformance: () => api.get('/api/teacher/performance'),
  createAnnouncement: (data) => api.post('/api/teacher/announcements', data),
};

// ===== STUDENT APIs =====
export const studentAPI = {
  getAllCourses: () => api.get('/api/student/courses'),
  getEnrolledCourses: () => api.get('/api/student/courses/enrolled'),
  enrollCourse: (courseId) => api.post(`/api/student/enroll/${courseId}`),
  getMaterials: (courseId) => api.get(`/api/student/materials/${courseId}`),
  getAssignments: (courseId) => api.get(`/api/student/assignments/${courseId}`),
  submitAssignment: (data) => api.post('/api/student/assignments/submit', data),
  getQuizzes: (courseId) => api.get(`/api/student/quizzes/${courseId}`),
  submitQuiz: (data) => api.post('/api/student/quizzes/submit', data),
  getResults: () => api.get('/api/student/results'),
  getAnnouncements: () => api.get('/api/student/announcements'),
};

export default api;
