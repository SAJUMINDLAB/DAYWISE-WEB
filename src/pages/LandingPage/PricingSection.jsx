import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PricingSection - 럭셔리 브랜드 감성의 가격 안내 섹션
 * 토스페이먼츠 PG 심사 필수 요건: 비로그인 상태에서도 상품 가격이 노출되어야 함
 */
const PricingSection = ({ user }) => {
  const features = [
    { icon: '◆', text: '프리미엄 템플릿 무제한' },
    { icon: '◆', text: '고화질 갤러리 30장' },
    { icon: '◆', text: '카카오톡 공유' },
    { icon: '◆', text: '스마트 RSVP' },
    { icon: '◆', text: '실시간 방명록' },
    { icon: '◆', text: '축의금 계좌 안내' },
    { icon: '◆', text: '카카오 지도 연동' },
    { icon: '◆', text: 'BGM & 시네마틱 인트로' },
  ];

  return (
    <section style={{ 
      padding: '160px 20px', 
      background: '#0A0A0A',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 배경 장식: 미세한 골드 방사형 빛 */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '900px', height: '900px', 
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 55%)',
        pointerEvents: 'none' 
      }} />

      {/* 섹션 타이틀 */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '72px' }}>
        <div style={{ 
          fontFamily: 'var(--font-en-serif)', 
          fontSize: '0.8rem', 
          letterSpacing: '8px', 
          color: 'rgba(212,175,55,0.6)', 
          marginBottom: '20px', 
          textTransform: 'uppercase' 
        }}>
          Pricing
        </div>
        <h2 style={{ 
          fontFamily: 'var(--font-kr-serif)', 
          fontSize: '2.6rem', 
          fontWeight: '300', 
          color: '#fff', 
          marginBottom: '20px', 
          lineHeight: '1.5' 
        }}>
          하나의 플랜,<br/>모든 프리미엄을 담다
        </h2>
        <div style={{ width: '32px', height: '1px', backgroundColor: '#D4AF37', margin: '0 auto' }} />
      </div>

      {/* 가격 카드 */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '420px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '2px',
        padding: '56px 44px',
        border: '1px solid rgba(212,175,55,0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* 상단 골드 장식 */}
        <div style={{ 
          position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50)', 
          width: '60px', height: '2px', 
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' 
        }} />

        {/* 플랜 라벨 */}
        <div style={{ 
          fontFamily: 'var(--font-en-serif)', 
          fontSize: '0.75rem', 
          letterSpacing: '6px', 
          color: '#D4AF37', 
          marginBottom: '32px',
          textTransform: 'uppercase'
        }}>
          All-in-One Premium
        </div>

        {/* 가격 */}
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
          <span style={{ 
            fontSize: '3.2rem', 
            fontWeight: '200', 
            color: '#fff', 
            fontFamily: 'var(--font-en-sans)',
            letterSpacing: '-1px'
          }}>
            19,900
          </span>
          <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-kr-sans)' }}>원</span>
        </div>

        <p style={{ 
          color: 'rgba(255,255,255,0.35)', 
          fontSize: '0.85rem', 
          marginBottom: '40px', 
          fontFamily: 'var(--font-kr-sans)',
          letterSpacing: '1px'
        }}>
          1년 이용 · VAT 포함
        </p>

        {/* 얇은 구분선 */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)', marginBottom: '36px' }} />

        {/* 기능 리스트 - 2열 그리드 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px 20px', 
          marginBottom: '44px',
          textAlign: 'left'
        }}>
          {features.map((f, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontFamily: 'var(--font-kr-sans)', 
              fontSize: '0.85rem', 
              color: 'rgba(255,255,255,0.6)' 
            }}>
              <span style={{ color: '#D4AF37', fontSize: '0.5rem', flexShrink: 0 }}>{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <Link to={user ? "/editor" : "/auth"} style={{
          display: 'block',
          width: '100%',
          padding: '16px',
          backgroundColor: 'transparent',
          color: '#D4AF37',
          textDecoration: 'none',
          border: '1px solid rgba(212,175,55,0.5)',
          borderRadius: '2px',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-kr-sans)',
          letterSpacing: '3px',
          textAlign: 'center',
          transition: 'all 0.4s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D4AF37';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#D4AF37';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          무료로 시작하기
        </Link>

        {/* 안내 문구 */}
        <p style={{ 
          color: 'rgba(255,255,255,0.25)', 
          fontSize: '0.75rem', 
          marginTop: '20px', 
          fontFamily: 'var(--font-kr-sans)', 
          lineHeight: '1.7',
          letterSpacing: '0.5px'
        }}>
          제작과 미리보기는 무료 · 배포 시 결제
        </p>
      </div>

      {/* 하단 얇은 청첩장 스타일 테두리 장식 */}
      <div style={{
        position: 'absolute', top: '16px', bottom: '16px', left: '16px', right: '16px',
        border: '1px solid rgba(212,175,55,0.08)',
        pointerEvents: 'none'
      }} />
    </section>
  );
};

export default PricingSection;
