import React, { useState, useEffect } from 'react';

const AnimatedMockupScreen = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 8000); // 8초마다 반복
    return () => clearInterval(timer);
  }, []);

  return (
    <div key={key} style={{ 
      width: '100%', height: '100%', backgroundColor: '#FDFBF7', borderRadius: '30px',
      overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-kr-serif)'
    }}>
      {/* 텍스트 영역 (시네마틱 인트로 딜레이 적용) */}
      <div style={{ paddingTop: '50px', textAlign: 'center', display: 'flex', flexDirection: 'column', zIndex: 2 }}>
        <div style={{ animation: 'fadeUp 1s ease-out 0s both' }}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '0.85rem', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>WEDDING INVITATION</div>
        </div>

        <div style={{ animation: 'fadeUp 1s ease-out 0.6s both', marginTop: '24px' }}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '2.6rem', color: '#2C2C2C', lineHeight: '1.2' }}>
            <div>Groom</div>
            <div style={{ fontSize: '1.4rem', color: '#D4AF37', margin: '4px 0', fontStyle: 'normal' }}>&</div>
            <div>Bride</div>
          </div>
        </div>

        <div style={{ animation: 'fadeUp 1s ease-out 1.2s both', marginTop: '30px' }}>
          <div style={{ fontFamily: 'var(--font-kr-sans)', fontSize: '0.85rem', color: '#666', letterSpacing: '1px' }}>2026. 1. 1. THU. 1:00 PM</div>
        </div>

        <div style={{ animation: 'fadeUp 1s ease-out 1.8s both', marginTop: '12px', marginBottom: '30px' }}>
          <div style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '1rem', color: '#2C2C2C' }}>웨딩홀 이름</div>
        </div>
      </div>

      {/* 히어로 이미지 (마지막에 등장) */}
      <div style={{ flex: 1, padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeUp 1.5s ease-out 2.4s both', zIndex: 2 }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#eee' }}>
           <img src="/images/ohalek00-wedding-6787691_1920.jpg" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const MockupSection = () => {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#FDFBF7', contentVisibility: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.5rem', color: '#2C2C2C', marginBottom: '16px', fontWeight: '500' }}>
          더 쉬운 제작, 더 높은 완성도
        </h3>
        <p style={{ color: '#D4AF37', fontSize: '1.1rem', fontWeight: '600' }}>데이와이즈 프리미엄 모바일 청첩장</p>
      </div>

      <div style={{ display: 'flex', gap: '80px', maxWidth: '1100px', margin: '0 auto', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left: Bullet Points */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { title: '10분 완성', desc: '— 시작부터 하객 공유까지 막힘없이' },
            { title: '맞춤형 디자인', desc: '— 폰트, 색상, 레이아웃 등 자유로운 커스텀' },
            { title: '프리미엄 갤러리', desc: '— 30장까지 화질 저하 없는 선명한 화보' },
            { title: '감성 BGM', desc: '— 클릭 한 번으로 더해지는 영화 같은 분위기' },
            { title: '스마트 RSVP', desc: '— 식수 인원 파악이 쉬운 참석 여부 조사' },
            { title: '무제한 수정', desc: '— 예식 당일까지 언제나 자유롭게 수정' },
            { title: '풀패키지 완비', desc: '— 방명록, 길안내, 계좌 송금 등 모든 기능 포함' }
          ].map((item, idx) => (
            <div key={idx} style={{ 
              padding: '24px 32px', backgroundColor: '#fff', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '1.2rem' }}>✓</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2C2C2C' }}>{item.title}</span>
              <span style={{ color: '#888', fontSize: '1.05rem' }}>{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Right: Phone Mockup */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div className="floating-mockup" style={{ 
            width: '320px', height: '650px', backgroundColor: '#111', borderRadius: '40px',
            padding: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', position: 'relative'
          }}>
            {/* Screen */}
            <div style={{ 
              width: '100%', height: '100%', backgroundColor: '#F9F8F6', borderRadius: '30px',
              overflow: 'hidden', position: 'relative'
            }}>
              <AnimatedMockupScreen />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupSection;
