import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import SchoolDashboard from './pages/dashboards/SchoolDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import ConfirmationCode from './pages/ConfirmationPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/confirmation-code" element={<ConfirmationCode />} />

                  <Route
                    path="/school-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['school']}>
                        <SchoolDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/teacher-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['teacher']}>
                        <TeacherDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/parent-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['parent']}>
                        <ParentDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;