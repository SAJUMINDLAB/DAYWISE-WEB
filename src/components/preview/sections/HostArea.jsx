import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const HostArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const mainInfo = useBuilderStore(state => state.mainInfo);

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.1rem * var(--font-ratio))', lineHeight: '2' }}>
        <div>
          {mainInfo.groomFather}{mainInfo.groomFather && mainInfo.groomMother && ' · '}{mainInfo.groomMother} <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, opacity: 0.7 }}>의 {mainInfo.groomRelation}</span> <strong style={{ color: theme.id === 'midnight-orange' ? theme.accent : 'inherit' }}>{mainInfo.groomNameKo}</strong>
        </div>
        <div>
          {mainInfo.brideFather}{mainInfo.brideFather && mainInfo.brideMother && ' · '}{mainInfo.brideMother} <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, opacity: 0.7 }}>의 {mainInfo.brideRelation}</span> <strong style={{ color: theme.id === 'midnight-orange' ? theme.accent : 'inherit' }}>{mainInfo.brideNameKo}</strong>
        </div>
      </div>
    </FadeUp>
  );
};

export default HostArea;
