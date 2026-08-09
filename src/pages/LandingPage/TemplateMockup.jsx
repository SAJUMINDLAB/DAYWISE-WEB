import React, { useState, useEffect } from 'react';

const ClassicMockup = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-kr-serif)' }}>
    <div style={{ paddingTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', zIndex: 2 }}>
      <div style={{ animation: 'fadeUp 1s ease-out 0s both' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>WEDDING INVITATION</div>
      </div>
      <div style={{ animation: 'fadeUp 1s ease-out 0.4s both', marginTop: '12px' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#2C2C2C', lineHeight: '1.2' }}>
          <div>Groom</div>
          <div style={{ fontSize: '1rem', color: '#D4AF37', margin: '2px 0', fontStyle: 'normal' }}>&</div>
          <div>Bride</div>
        </div>
      </div>
      <div style={{ animation: 'fadeUp 1s ease-out 0.8s both', marginTop: '16px' }}>
        <div style={{ fontFamily: 'var(--font-kr-sans)', fontSize: '0.6rem', color: '#666', letterSpacing: '1px' }}>2026. 1. 1. THU. 1:00 PM</div>
      </div>
      <div style={{ animation: 'fadeUp 1s ease-out 1.2s both', marginTop: '8px', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.7rem', color: '#2C2C2C' }}>웨딩홀 이름</div>
      </div>
    </div>
    <div style={{ flex: 1, animation: 'fadeUp 1.5s ease-out 1.6s both', padding: '0 16px', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ width: '100%', height: '90%', borderRadius: '100px 100px 0 0', overflow: 'hidden', backgroundColor: '#eee' }}>
        <img src="/images/ohalek00-wedding-6787691_1920.jpg" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  </div>
);

const MagazineMockup = () => (
  <div style={{ height: '100%', padding: '6px', backgroundColor: '#fff', fontFamily: 'serif', display: 'flex', flexDirection: 'column' }}>
    <div style={{ border: '1px solid #111', padding: '4px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ border: '1px solid #111', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ animation: 'fadeUp 1s ease-out 0s both', textAlign: 'center', padding: '16px 0 8px', borderBottom: '1px solid #111', margin: '0 8px' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: '300', letterSpacing: '3px', color: '#111', fontFamily: 'var(--font-en-serif)', textTransform: 'uppercase' }}>THE MAGAZINE</div>
          <div style={{ fontSize: '0.45rem', letterSpacing: '2px', marginTop: '4px', fontFamily: 'var(--font-en-sans)', textTransform: 'uppercase' }}>OCTOBER 2026 ISSUE 01</div>
        </div>
        <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', animation: 'fadeUp 1s ease-out 0.4s both' }}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img src="/images/ohalek00-wedding-6787691_1920.jpg" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', animation: 'fadeUp 1s ease-out 0.8s both' }}>
            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-en-serif)', fontWeight: 'bold' }}>Groom & Bride</div>
            <div style={{ fontSize: '0.6rem', marginTop: '4px', letterSpacing: '1px' }}>2026. 10. 25</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CinematicMockup = () => (
  <div style={{ height: '100%', position: 'relative', backgroundColor: '#111', fontFamily: 'var(--font-kr-serif)' }}>
    <img src="/images/ohalek00-wedding-6787691_1920.jpg" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)' }}></div>
    
    <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center', zIndex: 2 }}>
      <div style={{ animation: 'fadeUp 1s ease-out 0s both' }}>
        <div style={{ fontFamily: 'var(--font-en-sans)', fontSize: '0.4rem', color: '#ccc', letterSpacing: '2px', marginBottom: '8px' }}>A FILM BY DAYWISE PRODUCTION</div>
      </div>
      <div style={{ animation: 'fadeUp 1s ease-out 0.5s both' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: '2rem', color: '#fff', lineHeight: '1.1', textTransform: 'uppercase' }}>
          <div>Groom</div>
          <div style={{ fontSize: '1rem', color: '#D4AF37', margin: '2px 0', fontFamily: 'var(--font-en-sans)' }}>&amp;</div>
          <div>Bride</div>
        </div>
      </div>
      <div style={{ animation: 'fadeUp 1s ease-out 1s both', marginTop: '12px' }}>
        <div style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '0.8rem', color: '#D4AF37', fontStyle: 'italic' }}>A Love Story</div>
      </div>
    </div>
  </div>
);

const BentoMockup = () => (
  <div style={{ height: '100%', backgroundColor: '#EFEFEF', display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', fontFamily: 'var(--font-kr-sans)', position: 'relative', overflow: 'hidden' }}>
    {/* Background Orb */}
    <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)', filter: 'blur(10px)', animation: 'fadeUp 2s infinite alternate' }}></div>
    
    {/* Main Cover Card - Reduced height */}
    <div style={{ animation: 'fadeUp 0.8s ease-out 0s both', height: '60%', backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '12px 12px 8px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: '1.2rem', color: '#2C2C2C', lineHeight: '1.1', marginBottom: '8px' }}>
          <div>Groom</div>
          <div style={{ fontSize: '0.7rem', color: '#D4AF37', margin: '2px 0' }}>&</div>
          <div>Bride</div>
        </div>
      </div>
      <div style={{ flex: 1, margin: '0 12px 12px 12px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ddd' }}>
        <img src="/images/ohalek00-wedding-6787691_1920.jpg" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
    
    {/* Bottom Widgets - 2x2 Grid Pop-up */}
    <div style={{ display: 'flex', gap: '8px', flex: 1, position: 'relative', zIndex: 1 }}>
      {/* Date Widget */}
      <div style={{ animation: 'fadeUp 0.8s ease-out 0.4s both', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
         <div style={{ color: '#D4AF37', fontSize: '0.65rem', fontWeight: 'bold' }}>OCT</div>
         <div style={{ color: '#2C2C2C', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1' }}>25</div>
      </div>
      {/* Location Widget */}
      <div style={{ animation: 'fadeUp 0.8s ease-out 0.8s both', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
         <div style={{ fontSize: '0.55rem', color: '#666', fontWeight: 'bold' }}>LOCATION</div>
      </div>
    </div>
  </div>
);

const TemplateMockup = ({ templateId }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 6000); // 6초마다 애니메이션 반복
    return () => clearInterval(timer);
  }, [templateId]);

  return (
    <div className="floating-mockup" style={{ 
      width: '100%', 
      backgroundColor: '#111', 
      borderRadius: '24px',
      padding: '8px', 
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      margin: '0 auto'
    }}>
      <div key={`${templateId}-${key}`} style={{ 
        width: '100%', 
        aspectRatio: '9/19', 
        backgroundColor: '#FDFBF7', 
        borderRadius: '16px',
        overflow: 'hidden', 
        position: 'relative'
      }}>
        {templateId === 'classic' && <ClassicMockup />}
        {templateId === 'magazine' && <MagazineMockup />}
        {templateId === 'cinematic' && <CinematicMockup />}
        {templateId === 'bento' && <BentoMockup />}
        
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TemplateMockup;
