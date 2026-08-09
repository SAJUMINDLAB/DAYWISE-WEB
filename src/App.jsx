import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import EditorPage from './pages/EditorPage';
import ViewerPage from './pages/ViewerPage';
import AdminDashboard from './pages/AdminDashboard';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SamplePage from './pages/SamplePage';
import QnaPage from './pages/QnaPage';

import { supabase } from './api/supabaseClient';
import { useBuilderStore } from './store/useBuilderStore';

function App() {
  const user = useBuilderStore(state => state.user);
  const setUser = useBuilderStore(state => state.setUser);

  useEffect(() => {
    // Check active session and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Landing & Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/sample/:theme" element={<SamplePage />} />
          <Route path="/qna" element={<QnaPage />} />

          {/* Main Editor Route (Protected) */}
          <Route path="/editor/:id?" element={
            user ? <EditorPage /> : <Navigate to="/auth" replace />
          } />
          
          {/* Viewer Route */}
          <Route path="/v/:id" element={<ViewerPage />} />

          {/* Admin Dashboard Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
