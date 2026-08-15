import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';
import AccountAccordion from '../AccountAccordion';

const AccountArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const accountInfo = useBuilderStore(state => state.accountInfo);

  const selectedFontSubtitle = useBuilderStore(state => state.selectedFontSubtitle);

  if (!accountInfo.useAccount) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', position: 'relative', zIndex: 10, backgroundColor: 'transparent' }}>
        <h3 style={{ 
          fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : `'${selectedFontSubtitle}', serif`, fontSize: 'calc(0.95rem * var(--font-ratio))', textAlign: 'center', marginBottom: '30px', color: optionInfo.subtitleColor || theme.accent, letterSpacing: 'calc(0.2rem * var(--font-ratio))'
        }}>
          {optionInfo.magazineTocLanguage === 'kr' ? '마음 전하실 곳' : 'ACCOUNT'}
        </h3>
        
        {accountInfo.message && accountInfo.message.trim() !== '' && (
          <div style={{ textAlign: 'center', fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, opacity: 0.8, marginBottom: '40px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {accountInfo.message}
          </div>
        )}

        <AccountAccordion title="신랑측 계좌번호" accounts={accountInfo.groom} theme={theme} />
        <AccountAccordion title="신부측 계좌번호" accounts={accountInfo.bride} theme={theme} />
      </div>
    </FadeUp>
  );
};

export default AccountArea;
