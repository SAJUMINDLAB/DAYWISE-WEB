import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const RsvpArea = ({ theme, setShowRsvpModal }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);

  if (!rsvpInfo.useRsvp) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div id="rsvp-area" style={{ padding: '60px 20px', backgroundColor: 'transparent', textAlign: 'center', scrollMarginTop: '80px' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', marginBottom: '20px', color: theme.accent, letterSpacing: 'calc(0.1rem * var(--font-ratio))'
        }}>
          RSVP
        </h3>
        <p style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '30px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {rsvpInfo.description}
        </p>
        <button 
          className={optionInfo.shineEffect ? 'btn-shine' : ''}
          onClick={() => setShowRsvpModal(true)}
          style={{ padding: '16px 40px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '30px', fontSize: 'calc(1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          {rsvpInfo.title}
        </button>
      </div>
    </FadeUp>
  );
};

export default RsvpArea;
