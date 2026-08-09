import React from 'react';
import { Sparkles } from 'lucide-react';
import { SHOWCASE_ITEMS, THEMES_MAP } from './showcaseData';

// Divide the items dynamically into two rows
const half = Math.ceil(SHOWCASE_ITEMS.length / 2);
const row1 = SHOWCASE_ITEMS.slice(0, half);
const row2 = SHOWCASE_ITEMS.slice(half);

// CSS inline styles for the marquee animation since we need it custom
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes marqueeLeft {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-33.333333%, 0, 0); }
  }
  @keyframes marqueeRight {
    0% { transform: translate3d(-33.333333%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  .marquee-track-left {
    display: flex;
    width: max-content;
    animation: marqueeLeft 30s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
  .marquee-track-right {
    display: flex;
    width: max-content;
    animation: marqueeRight 30s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
`;
document.head.appendChild(styleSheet);

const MiniCard = ({ item }) => {
  const { theme: themeId, image, template, layout, textStyle, fontEn, fontKr, names, date } = item;
  const theme = THEMES_MAP[themeId] || THEMES_MAP['cream-beige'];
  
  // A simplified pseudo-rendering of the actual layout
  const isOverlay = layout === 'layout3';
  const isPhotoTop = layout === 'layout2';
  const isMinimal = layout === 'layout5';

  const textColor = isOverlay ? '#fff' : theme.text;
  const accentColor = isOverlay ? '#fff' : theme.accent;

  // Text Mockup based on style
  const TextMockup = () => {
    return (
      <div style={{
        padding: isMinimal ? '20px 10px' : '30px 15px',
        textAlign: textStyle === 'style2' ? 'left' : 'center',
        color: textColor,
        backgroundColor: isOverlay ? 'transparent' : theme.bg,
        borderBottom: isMinimal ? `1px solid ${theme.accent}33` : 'none',
        flex: isMinimal ? 'none' : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        '--font-en-serif': `'${fontEn}', serif`,
        '--font-en-sans': `'${fontEn}', sans-serif`,
        '--font-kr-serif': `'${fontKr}', serif`,
        '--font-kr-sans': `'${fontKr}', sans-serif`
      }}>
        {textStyle === 'style5' ? (
          <>
            <div style={{ fontSize: '24px', color: accentColor, fontWeight: '600', marginBottom: '8px', fontFamily: 'var(--font-en-serif)' }}>{date.short}</div>
            <div style={{ fontSize: '10px', opacity: 0.8, fontFamily: 'var(--font-kr-serif)' }}>{names.en[0]} & {names.en[1]}</div>
          </>
        ) : textStyle === 'style4' ? (
          <>
            <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.7, marginBottom: '8px', fontFamily: 'var(--font-en-serif)' }}>WEDDING INVITATION</div>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px', fontFamily: 'var(--font-kr-serif)' }}>{names.kr[0]} & {names.kr[1]}</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '8px', letterSpacing: '1px', color: accentColor, marginBottom: '8px', fontFamily: 'var(--font-en-serif)' }}>WEDDING INVITATION</div>
            <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '4px', display: 'flex', justifyContent: textStyle === 'style2' ? 'flex-start' : 'center', alignItems: 'center', gap: textStyle === 'style3' ? '4px' : '6px', fontFamily: 'var(--font-en-serif)' }}>
              {names.en[0]} <span style={{ fontSize: textStyle === 'style3' ? '22px' : '12px', fontStyle: textStyle === 'style3' ? 'italic' : 'normal', color: accentColor }}>&</span> {names.en[1]}
            </div>
          </>
        )}
        <div style={{ fontSize: '9px', opacity: 0.6, marginTop: '12px', fontFamily: 'var(--font-en-sans)' }}>{date.full}</div>
      </div>
    );
  };

  const ImageMockup = () => (
    <div style={{ 
      flex: 1, 
      width: '100%', 
      height: isOverlay ? '100%' : '180px',
      position: isOverlay ? 'absolute' : 'relative',
      top: 0, left: 0,
      zIndex: 1
    }}>
      <img src={image} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mockup" />
      {isOverlay && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />}
    </div>
  );

  return (
    <div style={{
      width: '240px',
      height: '380px',
      backgroundColor: theme.bg,
      borderRadius: '16px',
      overflow: 'hidden',
      margin: '0 12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      border: `1px solid rgba(0,0,0,0.05)`,
      flexShrink: 0,
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }}>
      {isOverlay ? (
        <>
          <ImageMockup />
          <TextMockup />
        </>
      ) : isPhotoTop || isMinimal ? (
        <>
          <ImageMockup />
          <TextMockup />
        </>
      ) : (
        <>
          <TextMockup />
          <ImageMockup />
        </>
      )}
    </div>
  );
};

const ShowcaseSection = () => {
  return (
    <section style={{ padding: '120px 0', backgroundColor: '#F9F8F6', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: '#F0EBE1', borderRadius: '30px', color: '#8C7B65', fontSize: '0.85rem', fontWeight: '600', marginBottom: '24px' }}>
          <Sparkles size={16} />
          <span>무한한 조합, 나만의 커스텀</span>
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#222', marginBottom: '20px', lineHeight: '1.2' }}>
          수백 가지 디자인 조합으로<br/>나만의 무드를 완성하세요
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}>
          레이아웃, 텍스트 스타일, 폰트, 색상을 마음대로 섞어<br/>누구와도 겹치지 않는 유니크한 청첩장을 만들 수 있습니다.
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        {/* Fade Edges for premium feel */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0,
          width: '200px',
          background: 'linear-gradient(to right, #F9F8F6 0%, rgba(249, 248, 246, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 30
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, right: 0,
          width: '200px',
          background: 'linear-gradient(to left, #F9F8F6 0%, rgba(249, 248, 246, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 30
        }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 0' }}>
          {/* Top Row - Scrolls Left */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div className="marquee-track-left">
              {[...row1, ...row1, ...row1].map((item, idx) => (
                <MiniCard key={`row1-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom Row - Scrolls Right */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div className="marquee-track-right">
              {[...row2, ...row2, ...row2].map((item, idx) => (
                <MiniCard key={`row2-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
