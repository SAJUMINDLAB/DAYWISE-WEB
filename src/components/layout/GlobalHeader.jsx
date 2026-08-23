import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../api/supabaseApi';
import { useBuilderStore } from '../../store/useBuilderStore';

const GlobalHeader = ({ scrolled = true }) => {
  const user = useBuilderStore(state => state.user);
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    if (window.location.pathname === '/') {
      const el = document.getElementById('templates-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('templates-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header style={{ 
      position: 'sticky', top: 0, zIndex: 1000, width: '100%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 40px', backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#fff',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {/* Logo */}
        <Link to="/" style={{ 
          display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
          background: 'linear-gradient(to right, #D4AF37, #8A6308)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          cursor: 'pointer'
        }} onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <svg width="38" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
            {/* 얇고 섬세한 링 (strokeWidth 감소) */}
            <circle cx="14.5" cy="12.5" r="9.5" stroke="url(#metallicGold)" strokeWidth="1.5" />
            <circle cx="25.5" cy="12.5" r="9.5" stroke="url(#metallicGold)" strokeWidth="1.5" />
            
            {/* 두 링이 겹치는 상단 교차점에 작은 다이아몬드 빛 반사 효과 (Sparkle) */}
            <path d="M20 2 L20.5 4.5 L23 5 L20.5 5.5 L20 8 L19.5 5.5 L17 5 L19.5 4.5 Z" fill="url(#metallicGold)" />

            <defs>
              {/* 고급스러운 하이엔드 금속 질감 그라데이션 */}
              <linearGradient id="metallicGold" x1="0" y1="0" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C59B3C" />
                <stop offset="35%" stopColor="#E2C87A" />
                <stop offset="50%" stopColor="#FFF7C0" />
                <stop offset="65%" stopColor="#C59B3C" />
                <stop offset="100%" stopColor="#8A6308" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1px' }}>DAYWISE</span>
        </Link>
        
        {/* Left Menus */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '2px' }}>
          <span 
            onClick={handleTemplateClick} 
            style={{ color: '#2C2C2C', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'color 0.2s' }} 
            onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} 
            onMouseOut={e=>e.currentTarget.style.color='#2C2C2C'}>
            모바일청첩장
          </span>
          <Link to="/qna" style={{ color: '#2C2C2C', fontSize: '1rem', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} onMouseOut={e=>e.currentTarget.style.color='#2C2C2C'}>자주묻는질문</Link>
          <a href="http://pf.kakao.com/_xbExgiX" target="_blank" rel="noopener noreferrer" style={{ color: '#2C2C2C', fontSize: '1rem', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} onMouseOut={e=>e.currentTarget.style.color='#2C2C2C'}>고객센터</a>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: '#2C2C2C', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}>나의 청첩장</Link>
            <button onClick={async () => { await signOut(); window.location.reload(); }} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.95rem', padding: 0 }}>로그아웃</button>
          </>
        ) : (
          <Link to="/auth" style={{ color: '#2C2C2C', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}>로그인</Link>
        )}
        <Link to={user ? "/editor" : "/auth"} style={{ 
          backgroundColor: '#2C2C2C', color: '#fff', padding: '10px 24px', borderRadius: '30px', 
          textDecoration: 'none', fontWeight: '500', transition: 'background-color 0.2s', fontSize: '0.95rem'
        }}>
          무료로 시작하기
        </Link>
      </div>
    </header>
  );
};

export default GlobalHeader;
