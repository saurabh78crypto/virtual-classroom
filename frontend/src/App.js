import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ClassDetail from './components/ClassDetail';
import UnitDetail from './components/UnitDetail';
import SessionDetail from './components/SessionDetail';
import LectureDetail from './components/LectureDetail';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register/:role" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/classes" element={<UserDashboard />} />
            <Route path="/classes/:classId" element={<ClassDetail />} />
            <Route path="/units/:unitId" element={<UnitDetail />} />
            <Route path="/sessions/:sessionId" element={<SessionDetail />} />
            <Route path="/lectures/:lectureId" element={<LectureDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
