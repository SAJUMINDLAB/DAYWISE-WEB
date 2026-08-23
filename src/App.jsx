import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// 로딩 최적화: 청크 로드 실패 시(새 버전 배포 시) 자동으로 새로고침하는 커스텀 lazy 함수
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return new Promise(() => {}); // Prevent React from trying to render while reloading
      }
      throw error;
    }
  });

// 성능 최적화: 필요한 페이지 코드만 분리해서 다운로드 (Code Splitting / Lazy Loading)
const EditorPage = lazyWithRetry(() => import('./pages/EditorPage'));
const ViewerPage = lazyWithRetry(() => import('./pages/ViewerPage'));
const MasterDashboard = lazyWithRetry(() => import('./pages/MasterDashboard'));
const ClientDashboard = lazyWithRetry(() => import('./pages/ClientDashboard'));
const CheckoutPage = lazyWithRetry(() => import('./pages/CheckoutPage'));
const PaymentSuccessPage = lazyWithRetry(() => import('./pages/PaymentSuccessPage'));
const PaymentFailPage = lazyWithRetry(() => import('./pages/PaymentFailPage'));

const LandingPage = lazyWithRetry(() => import('./pages/LandingPage'));
const AuthPage = lazyWithRetry(() => import('./pages/AuthPage'));
const DashboardPage = lazyWithRetry(() => import('./pages/DashboardPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const PrivacyPage = lazyWithRetry(() => import('./pages/PrivacyPage'));
const SamplePage = lazyWithRetry(() => import('./pages/SamplePage'));
const QnaPage = lazyWithRetry(() => import('./pages/QnaPage'));

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
        <Suspense fallback={<div style={{ height: '100vh', backgroundColor: '#FAFAFA' }} />}>
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
              (user || localStorage.getItem('daywise_master_auth') === 'true') ? <EditorPage /> : <Navigate to="/auth" replace />
            } />
            
            {/* Viewer Route */}
            <Route path="/v/:id" element={<ViewerPage isPreviewMode={false} />} />
            <Route path="/view/:id" element={<ViewerPage isPreviewMode={false} />} />
            <Route path="/preview/:id" element={<ViewerPage isPreviewMode={true} />} />

            {/* Checkout Route */}
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/fail" element={<PaymentFailPage />} />

            {/* Admin Dashboard Route */}
            <Route path="/master" element={<MasterDashboard />} />
            <Route path="/admin/:id" element={<ClientDashboard />} />

            {/* Fallback Catch-All Route for debugging */}
            <Route path="*" element={
              <div style={{ padding: '40px', backgroundColor: '#e8f5e9', minHeight: '100vh', color: '#1b5e20', fontSize: '18px', fontWeight: 'bold', wordBreak: 'break-all' }}>
                <h2>Route Not Found (404)</h2>
                <p>Current Path: {window.location.pathname}</p>
                <p>Current Search: {window.location.search}</p>
                <p>Current Hash: {window.location.hash}</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
