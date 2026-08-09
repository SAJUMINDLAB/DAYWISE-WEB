import React from 'react';

const PillarsSection = () => {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-en-sans)', fontSize: '0.85rem', fontWeight: 'bold', color: '#D4AF37', letterSpacing: '2px', marginBottom: '16px' }}>WHY DAYWISE?</p>
      <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.2rem', color: '#2C2C2C', marginBottom: '50px', fontWeight: '500' }}>
        데이와이즈가 사랑받는 이유
      </h3>

      <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
        {/* Pillar 1 */}
        <div style={{ flex: '1 1 300px', padding: '20px' }}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '4.5rem', color: '#2C2C2C', marginBottom: '16px' }}>10 min</div>
          <h4 style={{ fontSize: '1.1rem', color: '#D4AF37', marginBottom: '20px', fontWeight: 'bold' }}>완벽함까지 10분</h4>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#EBEBEB', margin: '0 auto 24px auto' }} />
          <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
            바쁜 결혼 준비, 청첩장만큼은 쉽고 직관적이게.<br/>10분 만에 하이엔드 퀄리티의 초대장을 완성하세요.
          </p>
        </div>
        {/* Pillar 2 */}
        <div style={{ flex: '1 1 300px', padding: '20px' }}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '4.5rem', color: '#2C2C2C', marginBottom: '16px' }}>Design</div>
          <h4 style={{ fontSize: '1.1rem', color: '#D4AF37', marginBottom: '20px', fontWeight: 'bold' }}>오트쿠튀르 감성</h4>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#EBEBEB', margin: '0 auto 24px auto' }} />
          <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
            틀에 박힌 디자인이 아닌, 소중한 날의 분위기를<br/>온전히 담아낼 수 있는 프리미엄 레이아웃.
          </p>
        </div>
        {/* Pillar 3 */}
        <div style={{ flex: '1 1 300px', padding: '20px' }}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '4.5rem', color: '#2C2C2C', marginBottom: '16px' }}>Endless</div>
          <h4 style={{ fontSize: '1.1rem', color: '#D4AF37', marginBottom: '20px', fontWeight: 'bold' }}>무제한 커스터마이징</h4>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#EBEBEB', margin: '0 auto 24px auto' }} />
          <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
            글귀 하나, 사진 한 장도 타협하지 마세요.<br/>언제든 실시간으로 수정하고 바로 반영할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
