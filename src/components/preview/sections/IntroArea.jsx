import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const IntroArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const greetingInfo = useBuilderStore(state => state.greetingInfo);

  if (!greetingInfo.useGreeting) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '60px 20px 40px 20px', textAlign: 'center' }}>
          <h2 
            className={optionInfo.cinematicIntro ? "cinematic-text" : ""}
            style={{ 
              fontFamily: 'var(--font-en-serif)', 
              fontSize: 'calc(2.2rem * var(--font-ratio))', 
              fontStyle: 'italic', 
              marginBottom: '30px', 
              color: optionInfo.cinematicIntro ? 'transparent' : theme.accent,
              position: 'relative',
              zIndex: 1
            }}
          >
            {greetingInfo.title}
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-kr-serif)', 
            lineHeight: '2.4', 
            fontSize: 'calc(1rem * var(--font-ratio))',
            color: theme.text,
            fontWeight: '300',
            whiteSpace: 'pre-wrap',
            opacity: theme.id === 'midnight-orange' ? 0.9 : 1
          }}>
            {greetingInfo.content}
          </p>
        </div>
      </div>
    </FadeUp>
  );
};

export default IntroArea;
