import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const StoryArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const storyInfo = useBuilderStore(state => state.storyInfo);

  if (!storyInfo.useStory) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', backgroundColor: 'transparent' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', textAlign: 'center', marginBottom: '40px', color: theme.accent, letterSpacing: 'calc(0.1rem * var(--font-ratio))'
        }}>
          {storyInfo.title}
        </h3>
        
        {storyInfo.mode === 'letter' ? (
        <div style={{ textAlign: 'center', lineHeight: '2.2', fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text, whiteSpace: 'pre-wrap', fontFamily: theme.fontBody }}>
          {storyInfo.letterContent}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 10px' }}>
          {storyInfo.qnaList.map((qna, idx) => (
            <div key={qna.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ 
                color: theme.accent, fontWeight: 'bold', fontSize: 'calc(1.4rem * var(--font-ratio))', fontFamily: 'var(--font-en-serif)', fontStyle: 'italic',
                minWidth: '24px', marginTop: '-4px'
              }}>Q.</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'calc(0.95rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text, marginBottom: '10px', lineHeight: '1.5', fontFamily: 'var(--font-kr-sans)' }}>
                  {qna.question}
                </div>
                <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.id === 'midnight-orange' || theme.id === 'royal-navy' ? 'rgba(255,255,255,0.7)' : '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap', backgroundColor: theme.id === 'midnight-orange' || theme.id === 'royal-navy' ? 'rgba(255,255,255,0.05)' : '#fff', padding: '16px', borderRadius: '0 12px 12px 12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: theme.id === 'midnight-orange' || theme.id === 'royal-navy' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f0f0f0' }}>
                  {qna.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </FadeUp>
  );
};

export default StoryArea;
