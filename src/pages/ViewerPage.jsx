import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getInvitation } from '../api/supabaseApi';
import { useBuilderStore } from '../store/useBuilderStore';
import InvitationPreview from '../components/preview/InvitationPreview';
import ErrorBoundary from '../components/ErrorBoundary';
import InvitationManager from '../components/manager/InvitationManager';
import { Settings } from 'lucide-react';

/**
 * 카카오톡 인앱 브라우저인지 감지하는 함수
 * 카카오톡 인앱 브라우저는 User-Agent에 'KAKAOTALK'을 포함합니다.
 */
const isKakaoInAppBrowser = () => {
  const ua = navigator.userAgent || '';
  return /KAKAOTALK/i.test(ua);
};

const ViewerPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitationData, setInvitationData] = useState(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const currentUser = useBuilderStore(state => state.user);

  const fetchInvitationData = useCallback(async () => {
    try {
      // 10초 타임아웃: Supabase 응답이 없으면 에러 처리
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), 10000)
      );
      const dataPromise = getInvitation(id);
      
      const data = await Promise.race([dataPromise, timeoutPromise]);

      if (data) {
        useBuilderStore.setState({ ...data, currentInvitationId: id });
        setInvitationData(data);
        setLoading(false);
      } else {
        setError('해당 청첩장을 찾을 수 없습니다.');
        setLoading(false);
      }
    } catch (err) {
      if (err.message === 'TIMEOUT') {
        setLoadingTimeout(true);
        setError('데이터 로딩 시간이 초과되었습니다.\n외부 브라우저에서 열어주세요.');
      } else {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInvitationData();
  }, [fetchInvitationData]);

  useEffect(() => {
    // ViewerPage 에서는 body 스크롤을 허용하여 IntersectionObserver 모바일 버그 방지
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  // 5초 후에도 로딩 중이면 "외부 브라우저로 열기" 안내 표시 (카카오 인앱 브라우저 대응)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  /** 외부 브라우저로 강제 이동 (카카오 인앱 브라우저 탈출용) */
  const openInExternalBrowser = () => {
    const currentUrl = window.location.href;
    // 카카오톡 인앱 브라우저에서 외부 브라우저로 열기
    if (isKakaoInAppBrowser()) {
      // 안드로이드: intent 스킴으로 크롬에서 열기
      // iOS: safari로 리다이렉트
      const isAndroid = /android/i.test(navigator.userAgent);
      if (isAndroid) {
        window.location.href = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
      } else {
        // iOS에서는 window.open이 외부 Safari로 열림
        window.location.href = currentUrl;
      }
    } else {
      window.open(currentUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#FFF9C4', zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '40px' }}>
        {/* 로딩 스피너 */}
        <div style={{ width: '36px', height: '36px', border: '3px solid #e5e5e5', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ color: '#333', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>청첩장을 불러오는 중입니다...</div>
        
        {/* 5초 이상 걸리면 외부 브라우저 안내 표시 */}
        {loadingTimeout && (
          <div style={{ marginTop: '20px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '12px', lineHeight: '1.6', fontWeight: 'bold' }}>
              카카오톡 내부 브라우저 로딩 지연 중입니다.<br />
              아래 버튼을 눌러주세요.
            </p>
            <button
              onClick={openInExternalBrowser}
              style={{
                padding: '14px 28px', backgroundColor: '#000', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚀 외부 브라우저에서 열기
            </button>
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', zIndex: 99999, padding: '40px', gap: '16px' }}>
        <div style={{ color: '#d32f2f', fontSize: '14px', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{error}</div>
        <button
          onClick={openInExternalBrowser}
          style={{
            padding: '12px 24px', backgroundColor: '#333', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold',
            cursor: 'pointer', marginTop: '8px'
          }}
        >
          외부 브라우저에서 열기
        </button>
        <button
          onClick={() => { setError(null); setLoading(true); setLoadingTimeout(false); fetchInvitationData(); }}
          style={{
            padding: '10px 20px', backgroundColor: 'transparent', color: '#666',
            border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#e5e5e5', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.1)', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <InvitationPreview isPublicView={true} />
          </div>
        </ErrorBoundary>

        {/* Host Admin Floating Button */}
        {currentUser && invitationData && currentUser.id === invitationData.user_id && (
          <button 
            onClick={() => setIsManagerOpen(true)}
            style={{
              position: 'absolute', bottom: '30px', right: '30px', zIndex: 1000,
              backgroundColor: '#2C2C2C', color: '#fff', border: 'none',
              borderRadius: '30px', padding: '12px 20px', fontSize: '1rem',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)', cursor: 'pointer',
              fontFamily: 'var(--font-kr-sans)'
            }}
          >
            <Settings size={18} /> 호스트 관리
          </button>
        )}
        
        {/* Host Admin Modal */}
        {isManagerOpen && invitationData && (
          <InvitationManager 
            invitation={invitationData} 
            onClose={() => setIsManagerOpen(false)} 
            onUpdate={() => {
              fetchInvitationData();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewerPage;
