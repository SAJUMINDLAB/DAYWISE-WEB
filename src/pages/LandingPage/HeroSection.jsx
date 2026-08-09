import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ user }) => {
  return (
    <section style={{ 
      height: '60vh', minHeight: '400px', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '0 20px', position: 'relative', overflow: 'hidden'
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
          transition: all 0.3s ease;
          background-color: transparent;
        }
        .btn-premium:hover {
          background-color: #D4AF37 !important;
          color: #fff !important;
          box-shadow: 0 10px 30px rgba(212,175,55,0.2) !important;
        }
      `}</style>
      {/* Wedding Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          objectFit: 'cover', objectPosition: 'center 35%', zIndex: 0 
        }}
      >
        <source src="/video/결혼식홈페이지 메인 사진 무료 픽사베이.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay to make text readable over the video */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-fade-up" style={{
          display: 'inline-block', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontWeight: '400',
          marginBottom: '32px', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          세상에 단 하나, 우리의 첫 번째 이야기.
        </div>
        
        <h1 className="hero-fade-up delay-1" style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
          color: '#fff', margin: '0 0 24px 0', textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <svg width="80" height="48" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'translateY(-2px)' }}>
            <circle cx="14" cy="12" r="10.5" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="26" cy="12" r="10.5" stroke="#ffffff" strokeWidth="2.5" />
          </svg>
          <span style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '4.5rem', fontWeight: '600', letterSpacing: '3px' }}>DAYWISE</span>
        </h1>
        
        {/* Elegant divider */}
        <div className="hero-fade-up delay-1" style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', marginBottom: '32px' }} />
        
        <p className="hero-fade-up delay-2" style={{ 
          fontFamily: 'var(--font-kr-serif)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.95)', 
          lineHeight: '1.9', marginBottom: '45px', fontWeight: '300', letterSpacing: '-0.3px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          서로를 향한 발걸음, 그 첫 시작.<br/>
          틀에 박힌 청첩장이 아닌, 우리의 분위기와 온도를 온전히 담은<br/>가장 특별한 초대장을 만들어보세요.
        </p>
        
        <Link to={user ? "/editor" : "/auth"} className="hero-fade-up delay-3 btn-premium" style={{ 
          padding: '18px 48px', color: '#D4AF37', backgroundColor: 'transparent',
          border: '1px solid #D4AF37', textDecoration: 'none', borderRadius: '2px', 
          fontSize: '1.1rem', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '8px'
        }}>
          우리만의 이야기로 시작하기 <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
