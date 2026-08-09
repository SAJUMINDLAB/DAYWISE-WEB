import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../api/supabaseApi';

const Header = ({ scrolled, user }) => {
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
          <svg width="36" height="22" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2px' }}>
            <circle cx="14" cy="12" r="10.5" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <circle cx="26" cy="12" r="10.5" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D4AF37" />
                <stop offset="1" stopColor="#8A6308" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1px' }}>DAYWISE</span>
        </Link>
        
        {/* Left Menus */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '2px' }}>
          <span onClick={() => {
            const el = document.getElementById('templates-section');
            if(el) el.scrollIntoView({ behavior: 'smooth' });
          }} style={{ color: '#2C2C2C', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} onMouseOut={e=>e.currentTarget.style.color='#2C2C2C'}>모바일청첩장</span>
          <Link to="/qna" style={{ color: '#2C2C2C', fontSize: '1rem', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#D4AF37'} onMouseOut={e=>e.currentTarget.style.color='#2C2C2C'}>자주묻는질문</Link>
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

export default Header;
