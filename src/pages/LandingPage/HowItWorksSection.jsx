import React from 'react';

const dummyReviews = [
  { id: 1, name: 'jiyo****', date: '2025.11.25', content: '예식 2주 남기고 급하게 만들었는데, 너무 쉽고 직관적이어서 10분 만에 뚝딱 완성했어요! 폰트도 고급스럽고 양가 부모님들도 깔끔하다고 칭찬해주셨습니다 ㅎㅎ', rating: 5 },
  { id: 2, name: 'mins****', date: '2025.11.20', content: '스튜디오 사진을 가로형으로 넣고 싶었는데 다른 곳은 다 짤리더라구요 ㅠㅠ 여긴 비율 조절도 자유롭고 화질 저하가 없어서 너무 좋았어요!', rating: 5 },
  { id: 3, name: 'hyer****', date: '2025.11.02', content: '청첩장에서 제일 중요한 게 글씨체라고 생각하는데, 여긴 진짜 프리미엄 폰트들만 모아둔 느낌? 명조체가 너무 예뻐서 대만족입니다.', rating: 5 },
  { id: 4, name: 'wons****', date: '2025.10.28', content: '다 똑같이 생긴 모바일 청첩장이 싫었는데, 제 마음대로 끄적끄적 커스텀할 수 있어서 진짜 우리만의 초대장이 된 기분이에요 🥰', rating: 5 },
  { id: 5, name: 'kimb****', date: '2025.10.14', content: '결혼식 끝나고 나서도 이 도메인 그대로 갤러리처럼 평생 소장할 수 있다는 게 제일 큰 메리트 같아요. 방명록 보면서 추억하고 있어요.', rating: 5 },
  { id: 6, name: 'park****', date: '2025.10.02', content: '타임라인 기능 미쳤어요!! 우리가 어떻게 만나서 결혼까지 왔는지 스토리텔링할 수 있어서 친구들이 다들 영화 같다고 난리 났습니다 ㅋㅋㅋ', rating: 5 },
  { id: 7, name: 'choi****', date: '2025.09.28', content: '카카오톡으로 공유했을 때 미리보기 썸네일이 너무 예쁘게 잡혀서 깜짝 놀랐어요! 디테일 하나하나 신경 쓴 티가 팍팍 납니다. 최고💕', rating: 5 },
  { id: 8, name: 'yooj****', date: '2025.09.15', content: '다른 데서 봤던 뻔한 디자인이 아니라, 정말 세련되고 감각적인 레이아웃이 많아서 고르는 재미가 있었어요. 주변 예신들한테 엄청 영업 중!!', rating: 5 },
  { id: 9, name: 'kang****', date: '2025.09.10', content: '글씨 크기를 큼지막하게 키울 수 있어서 어르신들 보시기에도 편하다고 하셨어요! 디테일한 폰트 사이즈 조절 기능 진짜 칭찬합니다.', rating: 5 },
  { id: 10, name: 'song****', date: '2025.09.01', content: '배경음악 넣으니까 분위기가 완전 달라지네요. 호텔 예식이라 고급스러운 느낌을 원했는데 찰떡같이 어울립니다 ㅠㅠ 최고!!', rating: 5 },
  { id: 11, name: 'leej****', date: '2025.08.21', content: '안내 문구 수정이 자유로워서 전세버스 탑승 안내랑 코로나 방역 수칙 같은 거 적기 너무 편했어요. 커스텀 자유도가 역대급입니다.', rating: 5 },
  { id: 12, name: 'jung****', date: '2025.08.15', content: '모바일 화면뿐만 아니라 아이패드나 PC로 봐도 레이아웃이 안 깨지고 너무 예쁘게 나와요! 하객분들이 청첩장 어디서 했냐고 엄청 물어보네요 ㅎㅎ', rating: 5 },
];

const HowItWorksSection = () => {
  return (
    <>
      {/* Reviews Section */}
      <section style={{ 
        padding: '80px 0', backgroundColor: '#FDFBF7', overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2rem', color: '#2C2C2C', marginBottom: '16px', fontWeight: '500' }}>
            이미 수많은 예비부부가 경험했습니다
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem' }}>데이와이즈와 함께 가장 아름다운 첫걸음을 내디딘 분들의 이야기</p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {/* 1st set of cards */}
            {dummyReviews.map((review) => (
              <div key={review.id} className="review-card" style={{ 
                width: '380px', padding: '30px', margin: '0 15px', backgroundColor: '#fff', 
                borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', flexShrink: 0,
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#D4AF37', fontSize: '1.1rem' }}>★</span>)}
                    <span style={{ marginLeft: '6px', fontWeight: '600', color: '#333' }}>5.0</span>
                  </div>
                  <span style={{ fontSize: '1.2rem' }}>💖</span>
                </div>
                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>{review.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '10px' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{review.name}</span>
                  <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{review.date}</span>
                </div>
              </div>
            ))}
            {/* 2nd set of cards for seamless infinite scroll */}
            {dummyReviews.map((review) => (
              <div key={`dup-${review.id}`} className="review-card" style={{ 
                width: '380px', padding: '30px', margin: '0 15px', backgroundColor: '#fff', 
                borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', flexShrink: 0,
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#D4AF37', fontSize: '1.1rem' }}>★</span>)}
                    <span style={{ marginLeft: '6px', fontWeight: '600', color: '#333' }}>5.0</span>
                  </div>
                  <span style={{ fontSize: '1.2rem' }}>💖</span>
                </div>
                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>{review.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '10px' }}>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{review.name}</span>
                  <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section: How it Works --- */}
      <section style={{ padding: '120px 20px', backgroundColor: '#FDFBF7', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: '0.85rem', letterSpacing: '4px', color: '#D4AF37', marginBottom: '16px', textTransform: 'uppercase' }}>
          Process
        </div>
        <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.8rem', color: '#2C2C2C', marginBottom: '80px', fontWeight: '300' }}>
          단 3단계로 완성되는 완벽함
        </h3>
        
        <div style={{ display: 'flex', gap: '30px', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { step: '01', title: '무드 선택', en: 'CHOOSE MOOD', desc: '우리 커플에게 가장 잘 어울리는\n시그니처 템플릿을 선택합니다.' },
            { step: '02', title: '정보 입력', en: 'FILL DETAILS', desc: '초대 문구, 웨딩 사진, 예식장 위치 등\n필요한 정보를 쉽고 빠르게 입력합니다.' },
            { step: '03', title: '완성 및 공유', en: 'PUBLISH & SHARE', desc: '실시간 미리보기로 확인 후,\n카카오톡으로 하객들에게 바로 공유합니다.' }
          ].map((item, idx) => (
            <div key={idx} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#EBEBEB';
              }}
              style={{ 
                flex: '1 1 300px', 
                position: 'relative', 
                padding: '60px 40px', 
                backgroundColor: '#fff', 
                border: '1px solid #EBEBEB',
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                cursor: 'default'
            }}>
              {/* Elegant floating number */}
              <div style={{ 
                fontFamily: 'var(--font-en-serif)', fontSize: '4.5rem', color: '#2C2C2C', 
                fontWeight: '300', lineHeight: '1', marginBottom: '24px', fontStyle: 'italic'
              }}>
                {item.step}.
              </div>
              
              {/* Divider */}
              <div style={{ height: '1px', width: '30px', backgroundColor: '#D4AF37', marginBottom: '32px', transition: 'width 0.3s' }} className="step-divider" />
              
              {/* Title area */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '2px', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>
                  {item.en}
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '500', color: '#2C2C2C', marginBottom: '20px', fontFamily: 'var(--font-kr-serif)' }}>{item.title}</h4>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-kr-sans)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;
