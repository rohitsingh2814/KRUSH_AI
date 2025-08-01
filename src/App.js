import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Questionnaire from './components/Questionnaire';
import QuestionnaireLanding from './pages/QuestionnaireLanding';
import toast from 'react-hot-toast';



function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  
    // Check if user is logged in from localStorage (no token required)
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    toast.success('Successfully logged in!');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Successfully logged out!');
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={login} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Signup onSignup={login} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile user={user} setUser={setUser} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/questionnaire" 
            element={<QuestionnaireLanding />} 
          />
          <Route 
            path="/questionnaire/quiz" 
            element={<Questionnaire />} 
          />
        </Routes>
       
      </main>
    </div>
  );
}

export default App; 