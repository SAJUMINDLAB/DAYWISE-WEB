import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const RsvpArea = ({ theme, setShowRsvpModal }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);

  const selectedFontSubtitle = useBuilderStore(state => state.selectedFontSubtitle);

  if (!rsvpInfo.useRsvp) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div id="rsvp-area" style={{ padding: '60px 20px', backgroundColor: 'transparent', textAlign: 'center', scrollMarginTop: '80px' }}>
        <h3 style={{ 
          fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : `'${selectedFontSubtitle}', serif`, fontSize: 'calc(0.95rem * var(--font-ratio))', marginBottom: '20px', color: optionInfo.subtitleColor || theme.accent, letterSpacing: 'calc(0.2rem * var(--font-ratio))'
        }}>
          {optionInfo.magazineTocLanguage === 'kr' ? '참석 의사 전달' : 'RSVP'}
        </h3>
        <p style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '30px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {rsvpInfo.description}
        </p>
        <button 
          onClick={() => setShowRsvpModal(true)}
          style={{ 
            padding: '16px 40px', 
            backgroundColor: 'transparent', 
            color: theme.text, 
            border: `1px solid ${theme.text}`, 
            borderRadius: '6px', 
            fontSize: 'calc(0.9rem * var(--font-ratio))', 
            letterSpacing: 'calc(0.15rem * var(--font-ratio))',
            fontWeight: 'normal', 
            cursor: 'pointer', 
            fontFamily: 'var(--font-kr-sans)', 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s'
          }}
        >
          <span>{rsvpInfo.title}</span>
          <span style={{ fontWeight: '300' }}>→</span>
        </button>
      </div>
    </FadeUp>
  );
};

export default RsvpArea;
