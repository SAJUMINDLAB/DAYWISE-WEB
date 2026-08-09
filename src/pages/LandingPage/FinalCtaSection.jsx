import React from 'react';
import { Link } from 'react-router-dom';

const FinalCtaSection = ({ user }) => {
  return (
    <section style={{ 
      padding: '160px 20px', 
      background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)', 
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Elegant thin border frame like an invitation */}
      <div style={{
        position: 'absolute', top: '20px', bottom: '20px', left: '20px', right: '20px',
        border: '1px solid rgba(212,175,55,0.15)',
        pointerEvents: 'none'
      }} />

      {/* Subtle radial spotlight */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 60%)', zIndex: 0 }}></div>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: '0.85rem', letterSpacing: '5px', color: '#D4AF37', marginBottom: '24px', textTransform: 'uppercase' }}>
          Your Beautiful Beginning
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '3rem', color: '#fff', marginBottom: '32px', fontWeight: '300', lineHeight: '1.4' }}>
          가장 아름다운 첫걸음,<br/>데이와이즈와 함께 시작하세요.
        </h2>
        
        <div style={{ height: '1px', width: '40px', backgroundColor: '#D4AF37', marginBottom: '32px' }} />
        
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: '48px', fontFamily: 'var(--font-kr-sans)' }}>
          지금 바로 무료로 가입하고, 나만의 특별한 웨딩 스토리를 만들어보세요.
        </p>
        
        <Link to={user ? "/editor" : "/auth"} style={{ 
          padding: '18px 48px', 
          backgroundColor: 'transparent', 
          color: '#D4AF37', 
          border: '1px solid #D4AF37',
          textDecoration: 'none', 
          fontSize: '1.1rem', 
          letterSpacing: '2px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.3s ease',
          fontFamily: 'var(--font-kr-sans)',
          borderRadius: '2px' // Sharp, elegant corners
        }} 
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#D4AF37';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#D4AF37';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          무료로 시작하기
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
};

export default FinalCtaSection;
