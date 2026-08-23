import React from 'react';

const FeaturesSection = () => {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#FDFBF7' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p style={{ fontFamily: 'var(--font-en-sans)', fontSize: '0.85rem', fontWeight: 'bold', color: '#6A7E6A', letterSpacing: '2px', marginBottom: '16px' }}>FEATURES</p>
        <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.8rem', color: '#333', fontWeight: '500', lineHeight: '1.4' }}>
          가장 완벽한 예식을 위한<br/>프리미엄 디테일.
        </h3>
      </div>

      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px', maxWidth: '1200px', margin: '0 auto' 
      }}>
        {[
          { 
            label: 'TEMPLATES', title: '다양한 디자인 템플릿', desc: '클래식, 벤토, 매거진, 시네마틱 등 두 사람만의 무드에 맞춰 템플릿을 선택하세요.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          },
          { 
            label: 'GALLERY', title: '고화질 갤러리', desc: '최대 30장의 웨딩 스냅을 화질 저하 없이 바둑판과 슬라이드 형태로 담아냅니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          },
          { 
            label: 'MAP', title: '스마트 길 안내', desc: '티맵, 카카오내비, 네이버지도 실시간 길 안내 연동 및 대중교통 정보까지 한 번에 제공합니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          },
          { 
            label: 'ACCOUNT', title: '마음 전하기 (계좌)', desc: '신랑 신부 양가 계좌를 깔끔하게 분리하여 안내하며, 원클릭 복사 기능을 지원합니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          },
          { 
            label: 'RSVP', title: '참석 의사 확인', desc: '하객의 참석 여부와 식사 여부를 미리 파악하여 완벽한 예식을 준비하세요.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          },
          { 
            label: 'GUESTBOOK', title: '축하 방명록', desc: '하객들이 남겨준 따뜻한 축하 메시지를 한 곳에서 모아보고 소중하게 간직하세요.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          },
          { 
            label: 'SHARE', title: '카카오톡 공유', desc: '가장 예쁜 사진으로 카카오톡 썸네일 카드가 만들어지며, 단축 URL이 제공됩니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          },
          { 
            label: 'CUSTOMIZE', title: '내 마음대로 ON/OFF', desc: '방명록, 갤러리 등 우리 예식에 굳이 필요 없는 섹션은 버튼 하나로 쉽게 숨길 수 있습니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="8" rx="4"></rect><circle cx="17" cy="12" r="2"></circle></svg>
          },
          { 
            label: 'PREMIUM OPTIONS', title: '다양한 프리미엄 옵션', desc: '잔잔한 배경음악(BGM), 눈내리는 효과, 꽃잎 날림 등 유료 급 프리미엄 효과를 마음껏 사용할 수 있습니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          },
          { 
            label: 'EDITOR', title: '직관적인 웹 빌더', desc: '코딩이나 복잡한 과정 없이 누구나 쉽게 PC에서 클릭 몇 번으로 바로 제작할 수 있습니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          },
          { 
            label: 'FONTS', title: '프리미엄 폰트 제공', desc: '고품질의 명조, 고딕, 영문 서체 등 상업적 이용이 가능한 아름다운 폰트들을 무료로 마음껏 사용할 수 있습니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
          },
          { 
            label: 'RESPONSIVE', title: '완벽한 반응형 설계', desc: '스마트폰과 PC 어떤 화면에서도 비율이 깨지지 않고 가장 아름다운 형태로 완벽하게 보여집니다.', 
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A7E6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          }
        ].map((item, idx) => (
          <div key={idx} style={{ 
            padding: '32px', backgroundColor: '#fff',
            border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '16px',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.04)'; }}
             onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ marginBottom: '8px' }}>
              {item.icon}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-en-sans)', fontSize: '0.8rem', fontWeight: 'bold', color: '#6A7E6A', letterSpacing: '1px', margin: '0 0 8px 0' }}>{item.label}</p>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333', margin: '0' }}>{item.title}</h4>
            </div>
            <p style={{ color: '#666', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
