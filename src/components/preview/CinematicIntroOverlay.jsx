import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';

const themeStyles = {
  'cream-beige': { bg: 'var(--tnc-cream)', text: 'var(--tnc-charcoal)', accent: 'var(--tnc-gold)', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'epure': { bg: '#ffffff', text: '#222222', accent: '#aaaaaa', fontTitle: 'var(--font-en-sans)', fontBody: 'var(--font-kr-sans)' },
  'default': { bg: 'var(--tnc-cream)', text: 'var(--tnc-charcoal)', accent: 'var(--tnc-gold)', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' }
};

const CinematicIntroOverlay = () => {
  const active = useBuilderStore(state => state.optionInfo.cinematicIntro);
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const greetingInfo = useBuilderStore(state => state.greetingInfo);
  const selectedTheme = useBuilderStore(state => state.selectedTheme);
  const selectedFont = useBuilderStore(state => state.selectedFont);
  const selectedFontEn = useBuilderStore(state => state.selectedFontEn);
  const customColors = useBuilderStore(state => state.customColors);
  const optionInfo = useBuilderStore(state => state.optionInfo);

  const fontRatios = { 'S': 0.9, 'M': 1, 'L': 1.15, 'XL': 1.3 };
  
  const theme = selectedTheme === 'custom'
    ? { bg: customColors.bg, text: customColors.text, accent: customColors.text, fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' }
    : (themeStyles[selectedTheme] || themeStyles['default']);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (active) {
      setStage(1); // Reset and start
      const t1 = setTimeout(() => setStage(2), 100);  // Title
      const t2 = setTimeout(() => setStage(3), 500);  // Names
      const t3 = setTimeout(() => setStage(4), 1500); // Image fades in
      const t4 = setTimeout(() => setStage(5), 3500); // Fade out overlay
      const t5 = setTimeout(() => setStage(6), 4500); // Unmount
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      setStage(0);
    }
  }, [active]);

  if (!active || stage === 0 || stage === 6) return null;

  return (
    <div style={{
      '--font-kr-serif': selectedFont === 'Aujournuit Myeongjo' ? "'Aujournuit', 'Noto Serif KR', serif" : `'${selectedFont}', serif`,
      '--font-kr-sans': selectedFont === 'Aujournuit Myeongjo' ? "'Aujournuit', 'Noto Sans KR', sans-serif" : `'${selectedFont}', sans-serif`,
      '--font-en-serif': `'${selectedFontEn === 'Cormorant Italic' ? 'Cormorant Garamond' : selectedFontEn}', serif`,
      '--font-en-sans': `'${selectedFontEn === 'Cormorant Italic' ? 'Cormorant Garamond' : selectedFontEn}', sans-serif`,
      '--font-en-style': selectedFontEn === 'Cormorant Italic' ? 'italic' : 'normal',
      '--font-ratio': fontRatios[optionInfo.fontSize] || 1,
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: stage >= 4 ? '#111' : theme.bg,
      zIndex: 1000,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      opacity: stage >= 5 ? 0 : 1, 
      transition: 'opacity 1s ease-in-out, background-color 1.5s ease',
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {/* Background Image Climax */}
      {mainInfo.mainImage && (
        <img 
          src={mainInfo.mainImage} 
          alt="intro" 
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: stage >= 4 ? 0.6 : 0,
            transform: stage >= 4 ? 'scale(1.1)' : 'scale(1)',
            transition: 'opacity 1s ease, transform 6s ease-out',
            zIndex: 1
          }}
        />
      )}

      <div style={{ textAlign: 'center', color: stage >= 4 ? '#fff' : theme.text, transition: 'color 2s ease', zIndex: 10 }}>
        <h2 style={{ 
          fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', letterSpacing: 'calc(0.1rem * var(--font-ratio))', 
          fontWeight: '300', fontStyle: 'italic', marginBottom: '40px',
          opacity: stage >= 2 ? 1 : 0, transform: stage >= 2 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 1s ease'
        }}>
          {greetingInfo.title}
        </h2>
        
        <div style={{ 
          fontFamily: 'var(--font-en-serif)', fontSize: 'calc(3.2rem * var(--font-ratio))', lineHeight: '1.2', margin: '40px 0',
          opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.8s ease 0.1s'
        }}>
          <div style={{ fontStyle: 'var(--font-en-style)', fontWeight: '500' }}>{mainInfo.groomNameEn}</div>
          <div style={{ fontSize: 'calc(1.5rem * var(--font-ratio))', margin: '8px 0', color: stage >= 4 ? 'rgba(255,255,255,0.7)' : theme.accent, transition: 'color 3s ease' }}>&amp;</div>
          <div style={{ fontStyle: 'var(--font-en-style)', fontWeight: '500' }}>{mainInfo.brideNameEn}</div>
        </div>

        <div style={{
          opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.8s ease 0.3s'
        }}>
          <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(0.9rem * var(--font-ratio))', letterSpacing: 'calc(0.1rem * var(--font-ratio))', fontWeight: '300' }}>
            {mainInfo.date.replace(/-/g, '. ')}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm}
          </p>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(0.95rem * var(--font-ratio))', marginTop: '12px', color: stage >= 4 ? 'rgba(255,255,255,0.8)' : theme.text, transition: 'color 3s ease' }}>
            {mainInfo.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CinematicIntroOverlay;
