import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer style={{ backgroundColor: '#1A1A1A', padding: '60px 40px 40px', color: '#888', fontSize: '0.9rem' }}>
      <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <h2 style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#fff', margin: 0, letterSpacing: '1px' }}>DAYWISE</h2>
            <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.9rem', color: '#aaa' }}>
              Make your special day truly yours with a wise choice. Daywise crafts the one and only invitation for your new chapter.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <strong style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Policy</strong>
              <Link to="/terms" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#888'}>이용약관</Link>
              <Link to="/privacy" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#888'}>개인정보처리방침</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <strong style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Support</strong>
              <Link to="/qna" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#888'}>자주 묻는 질문</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#666' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span>상호: 디에스컴퍼니 | 대표자: 김동현</span>
            <span>사업자등록번호: 119-29-01871</span>
            <span>통신판매업신고번호: 제2026-대구남구-422호</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span>사업장 주소: 대구광역시 남구 봉덕로9길 3-4</span>
            <span>고객센터: 010-8388-1751</span>
            <span>이메일: yudhyun@naver.com</span>
          </div>
          <span style={{ marginTop: '8px' }}>© 2026 Daywise. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
