import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ user }) => {
  return (
    <section style={{ 
      height: '80vh', minHeight: '600px', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '0 20px', position: 'relative', overflow: 'hidden',
      backgroundColor: '#fdfbf7'
    }}>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-up {
          animation: heroFadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .btn-premium {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: transparent;
        }
        .btn-premium:hover {
          background-color: #2C2C2C !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
      `}</style>
      
      {/* Elegant High-End Background */}
      <img 
        src="/images/elegant_landing_bg.jpg" 
        alt="Premium Background" 
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          objectFit: 'cover', objectPosition: 'center', zIndex: 0,
          opacity: 0.6 // Blend with the #fdfbf7 background
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(253, 251, 247, 0.3), rgba(253, 251, 247, 0.8))', zIndex: 1 }}></div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-fade-up" style={{
          display: 'inline-block', color: '#8b7355', fontSize: '0.95rem', fontWeight: '500',
          marginBottom: '24px', letterSpacing: '3px'
        }}>
          PREMIUM WEDDING INVITATION BUILDER
        </div>
        
        <h1 className="hero-fade-up delay-1" style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#2C2C2C', margin: '0 0 32px 0', letterSpacing: '-1px'
        }}>
          <span style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '3.5rem', fontWeight: '400', lineHeight: '1.2', marginBottom: '8px' }}>
            가장 아름다운 순간을 위한
          </span>
          <span style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '3.5rem', fontWeight: '400', lineHeight: '1.2' }}>
            나만의 모바일 청첩장
          </span>
        </h1>
        
        {/* Elegant divider */}
        <div className="hero-fade-up delay-1" style={{ height: '1px', width: '40px', backgroundColor: '#d4af37', marginBottom: '32px' }} />
        
        <p className="hero-fade-up delay-2" style={{ 
          fontFamily: 'var(--font-kr-sans)', fontSize: '1.15rem', color: '#555', 
          lineHeight: '1.8', marginBottom: '45px', fontWeight: '300', letterSpacing: '-0.3px'
        }}>
          틀에 박힌 디자인에서 벗어나, 두 사람만의 분위기와 온도를 담으세요.<br/>
          클릭 몇 번으로 완성되는 프리미엄 청첩장 서비스 <strong>DAYWISE</strong>
        </p>
        
        <Link to={user ? "/editor" : "/auth"} className="hero-fade-up delay-3 btn-premium" style={{ 
          padding: '18px 48px', color: '#2C2C2C', backgroundColor: 'transparent',
          border: '1px solid #2C2C2C', textDecoration: 'none', borderRadius: '4px', 
          fontSize: '1rem', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontWeight: '500'
        }}>
          무료로 제작 시작하기 <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
