import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminReports from './pages/admin/AdminReports';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ManageCourses from './pages/teacher/ManageCourses';
import ManageMaterials from './pages/teacher/ManageMaterials';
import ManageAssignments from './pages/teacher/ManageAssignments';
import ManageQuizzes from './pages/teacher/ManageQuizzes';
import ViewSubmissions from './pages/teacher/ViewSubmissions';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CourseListPage from './pages/student/CourseListPage';
import CourseDetailPage from './pages/student/CourseDetailPage';
import StudyMaterialsPage from './pages/student/StudyMaterialsPage';
import AssignmentPage from './pages/student/AssignmentPage';
import QuizPage from './pages/student/QuizPage';
import ResultPage from './pages/student/ResultPage';
import AnnouncementPage from './pages/student/AnnouncementPage';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminReports />
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/teacher/courses" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <ManageCourses />
          </ProtectedRoute>
        } />
        <Route path="/teacher/materials" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <ManageMaterials />
          </ProtectedRoute>
        } />
        <Route path="/teacher/assignments" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <ManageAssignments />
          </ProtectedRoute>
        } />
        <Route path="/teacher/quizzes" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <ManageQuizzes />
          </ProtectedRoute>
        } />
        <Route path="/teacher/submissions" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <ViewSubmissions />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/courses" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <CourseListPage />
          </ProtectedRoute>
        } />
        <Route path="/student/courses/:courseId" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <CourseDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/student/materials/:courseId" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudyMaterialsPage />
          </ProtectedRoute>
        } />
        <Route path="/student/assignments/:courseId" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AssignmentPage />
          </ProtectedRoute>
        } />
        <Route path="/student/quizzes/:courseId" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/student/results" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <ResultPage />
          </ProtectedRoute>
        } />
        <Route path="/student/announcements" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AnnouncementPage />
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
