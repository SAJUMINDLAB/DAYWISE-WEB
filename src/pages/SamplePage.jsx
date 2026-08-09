import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBuilderStore } from '../store/useBuilderStore';
import InvitationPreview from '../components/preview/InvitationPreview';
import ErrorBoundary from '../components/ErrorBoundary';

const SamplePage = () => {
  const { theme } = useParams();

  useEffect(() => {
    // 테마 설정
    if (['classic', 'bento', 'magazine', 'cinematic'].includes(theme)) {
      useBuilderStore.setState({ selectedTemplate: theme });
    }
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }, [theme]);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#F5F5F5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Sample Header Bar */}
      <div style={{ 
        width: '100%', padding: '16px 20px', backgroundColor: '#fff', 
        borderBottom: '1px solid #EBEBEB', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#2C2C2C', letterSpacing: '0.5px' }}>
            DAYWISE <span style={{ color: '#D4AF37', fontFamily: 'var(--font-en-sans)', textTransform: 'uppercase', fontSize: '0.9rem', marginLeft: '8px' }}>{theme} SAMPLE</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/" style={{ padding: '8px 16px', border: '1px solid #CCC', borderRadius: '4px', textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>돌아가기</Link>
          <Link to="/editor" onClick={() => useBuilderStore.setState({ theme })} style={{ padding: '8px 16px', backgroundColor: '#2C2C2C', borderRadius: '4px', textDecoration: 'none', color: '#fff', fontSize: '0.9rem' }}>이 테마로 만들기</Link>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px 0' }}>
        <ErrorBoundary>
          <div style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <InvitationPreview />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SamplePage;
