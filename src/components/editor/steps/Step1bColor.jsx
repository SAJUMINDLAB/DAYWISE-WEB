import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const themes = [
  { id: 'cream-beige', name: 'Cream Beige', desc: '유행을 타지 않는 우아함', colors: ['#F5F5F0', '#D6C0B3'] },
  { id: 'epure', name: 'Épure', desc: '정제된 여백이 만드는 고요함', colors: ['#ffffff', '#f8f9fa'] },
  { id: 'vanilla-cream', name: 'Vanilla Cream', desc: '부드럽고 따뜻한 바닐라 크림', colors: ['#fdfbf7', '#f1e8d9'] },
  { id: 'royal-navy', name: 'Royal Navy', desc: '모던하고 깊이 있는 네이비', colors: ['#141E30', '#E0C097'] },
  { id: 'golden-hour', name: 'Golden Hour', desc: '황금빛 노을을 닮은 약속', colors: ['#8B2500', '#fffdfa'] },
  { id: 'sage-green', name: 'Sage Green', desc: '차분하고 고급스러운 세이지 그린', colors: ['#F4F5F2', '#849C8D'] },
  { id: 'lavender-blush', name: 'Lavender Blush', desc: '로맨틱하고 부드러운 라벤더', colors: ['#FBF9FA', '#B497A6'] },
  { id: 'classic-charcoal', name: 'Classic Charcoal', desc: '모던하고 시크한 클래식 차콜', colors: ['#F9F9F9', '#555555'] },
  { id: 'warm-terracotta', name: 'Warm Terracotta', desc: '가을을 품은 따뜻한 테라코타', colors: ['#FFF9F5', '#C47D68'] },
  { id: 'sunset-breeze', name: 'Sunset Breeze', desc: '트렌디한 코랄빛 노을', colors: ['#FFF7F2', '#E86A41'] },
  { id: 'midnight-orange', name: 'Midnight Orange', desc: '시크한 블랙과 에르메스 오렌지', colors: ['#1A1817', '#F37021'] },
  { id: 'deep-forest', name: 'Deep Forest', desc: '깊고 우아한 딥 그린과 골드', colors: ['#1A2421', '#D4AF37'] },
  { id: 'dusty-blue', name: 'Dusty Blue', desc: '차분하고 우아한 안개 낀 바다', colors: ['#F5F7FA', '#6B7F96'] },
  { id: 'vintage-wine', name: 'Vintage Wine', desc: '매혹적이고 짙은 빈티지 와인', colors: ['#2D1B1E', '#E6A8B6'] },
  { id: 'custom', name: '커스텀 색상', desc: '원하는 색상을 직접 지정', colors: ['#ffffff', '#333333'] }
];

const Step1bColor = () => {
  const selectedTheme = useBuilderStore(state => state.selectedTheme);
  const setTheme = useBuilderStore(state => state.setTheme);
  const customColors = useBuilderStore(state => state.customColors);
  const setCustomColors = useBuilderStore(state => state.setCustomColors);
  const selectedFont = useBuilderStore(state => state.selectedFont);
  const setFont = useBuilderStore(state => state.setFont);
  const selectedFontEn = useBuilderStore(state => state.selectedFontEn);
  const setFontEn = useBuilderStore(state => state.setFontEn);

  const fontsKr = [
    { id: 'Noto Serif KR', name: '본명조 (클래식)' },
    { id: 'Noto Sans KR', name: '본고딕 (모던)' },
    { id: 'Nanum Myeongjo', name: '나눔명조 (감성)' },
    { id: 'Gowun Dodum', name: '고운돋움 (정갈)' },
    { id: 'MaruBuri', name: '마루부리 (단정함)' },
    { id: 'Pretendard', name: '프리텐다드 (세련됨)' },
    { id: 'KyoboHandwriting', name: '교보손글씨 (감성적)' },
    { id: 'YesMyungjo', name: '예스명조 (우아)' },
    { id: 'Soonbatang', name: '순바탕 (부드러움)' },
    { id: 'MapoGeumbitnaru', name: '마포금빛나루 (전통)' }
  ];

  const fontsEn = [
    { id: 'Cormorant Garamond', name: 'Garamond (전통 우아)' },
    { id: 'Cormorant Italic', name: 'Garamond Italic (시네마틱)' },
    { id: 'Bodoni Moda', name: 'Bodoni Moda (하이패션)' },
    { id: 'Cinzel', name: 'Cinzel (클래식 무비)' },
    { id: 'Marcellus', name: 'Marcellus (우아함)' },
    { id: 'Playfair Display', name: 'Playfair (화보같은)' },
    { id: 'Montserrat', name: 'Montserrat (깔끔한 모던)' },
    { id: 'Libre Baskerville', name: 'Libre Baskerville (가독성)' },
    { id: 'Italiana', name: 'Italiana (이국적인)' },
    { id: 'Pinyon Script', name: 'Pinyon (고급 필기체)' }
  ];

  return (
    <div style={{ padding: '10px 0' }}>
      <div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px', fontWeight: 'bold' }}>
          색상 테마 (Color Theme)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {themes.map(theme => (
            <div 
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              style={{ 
                border: `2px solid ${selectedTheme === theme.id ? '#333' : '#eee'}`,
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: '#fff'
              }}
            >
              <div style={{ display: 'flex', height: '60px', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ flex: 1, backgroundColor: theme.colors[0] }}></div>
                <div style={{ flex: 1, backgroundColor: theme.colors[1] }}></div>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px', fontFamily: "'Noto Serif KR', serif" }}>
                {theme.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>
                {theme.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTheme === 'custom' && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '16px' }}>커스텀 색상 설정</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px' }}>배경 색상 (Background)</label>
              <input 
                type="color" 
                value={customColors.bg} 
                onChange={(e) => setCustomColors({ bg: e.target.value })}
                style={{ width: '100%', height: '40px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px' }}>포인트 색상 (Accent Color)</label>
              <input 
                type="color" 
                value={customColors.accent} 
                onChange={(e) => setCustomColors({ accent: e.target.value })}
                style={{ width: '100%', height: '40px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px', textAlign: 'center' }}>
            * AI가 배경 밝기를 자동 분석하여 최적의 본문 글자색을 적용합니다.
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px', fontWeight: 'bold' }}>
          영문 폰트 (English)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {fontsEn.map(font => (
            <label 
              key={font.id} 
              style={{ 
                display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '8px', cursor: 'pointer',
                border: `2px solid ${selectedFontEn === font.id ? '#333' : '#eee'}`,
                backgroundColor: selectedFontEn === font.id ? '#fafafa' : '#fff',
                fontFamily: `'${font.id}', sans-serif`,
                fontSize: '0.9rem'
              }}
            >
              <input 
                type="radio" 
                name="fontSelectionEn"
                value={font.id}
                checked={selectedFontEn === font.id}
                onChange={() => setFontEn(font.id)}
                style={{ marginRight: '12px', accentColor: '#222' }}
              />
              {font.name}
            </label>
          ))}
        </div>

        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px', fontWeight: 'bold' }}>
          한글 폰트 (Korean)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {fontsKr.map(font => (
            <label 
              key={font.id} 
              style={{ 
                display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '8px', cursor: 'pointer',
                border: `2px solid ${selectedFont === font.id ? '#333' : '#eee'}`,
                backgroundColor: selectedFont === font.id ? '#fafafa' : '#fff',
                fontFamily: `'${font.id}', sans-serif`,
                fontSize: '0.9rem'
              }}
            >
              <input 
                type="radio" 
                name="fontSelectionKr"
                value={font.id}
                checked={selectedFont === font.id}
                onChange={() => setFont(font.id)}
                style={{ marginRight: '12px', accentColor: '#222' }}
              />
              {font.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1bColor;
