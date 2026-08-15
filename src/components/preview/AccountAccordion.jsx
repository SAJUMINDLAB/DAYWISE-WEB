import React from 'react';
import { ChevronDown } from 'lucide-react';

const AccountAccordion = ({ title, accounts, theme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('계좌번호가 복사되었습니다.\n' + text);
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };

  return (
    <div style={{ borderBottom: '1px solid rgba(128,128,128,0.2)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', padding: '24px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'transparent', border: 'none', 
          cursor: 'pointer', fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.05rem * var(--font-ratio))', color: theme.text
        }}
      >
        <span style={{ fontWeight: '500', letterSpacing: '0.1em' }}>{title}</span>
        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} color={theme.accent} />
      </button>
      
      {isOpen && (
        <div style={{ 
          backgroundColor: 'transparent', border: 'none', 
          padding: '0 10px 24px 10px'
        }}>
          {accounts.map((acc, index) => (
            <div key={acc.id} style={{ marginBottom: index === accounts.length - 1 ? 0 : '24px', paddingBottom: index === accounts.length - 1 ? 0 : '24px', borderBottom: index === accounts.length - 1 ? 'none' : '1px solid rgba(128,128,128,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: 'calc(0.75rem * var(--font-ratio))', color: theme.text, opacity: 0.6, marginBottom: '6px', fontFamily: 'var(--font-kr-sans)' }}>{acc.relation}</div>
                  <div style={{ fontSize: 'calc(1.0rem * var(--font-ratio))', fontWeight: '500', color: theme.text, fontFamily: 'var(--font-kr-serif)' }}>{acc.holder}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'calc(0.75rem * var(--font-ratio))', color: theme.text, opacity: 0.6, marginBottom: '6px', fontFamily: 'var(--font-kr-sans)' }}>{acc.bank}</div>
                  <div style={{ fontSize: 'calc(1.0rem * var(--font-ratio))', color: theme.text, letterSpacing: 'calc(0.05rem * var(--font-ratio))', fontFamily: 'var(--font-kr-sans)', fontWeight: '300' }}>{acc.account}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button 
                  onClick={() => handleCopy(acc.account)}
                  style={{ flex: 1, padding: '12px 0', backgroundColor: 'transparent', border: '1px solid rgba(128,128,128,0.3)', borderRadius: '0', fontSize: 'calc(0.8rem * var(--font-ratio))', color: theme.text, cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', transition: 'background-color 0.2s' }}
                >
                  계좌 복사
                </button>
                {acc.kakaopay && (
                  <a 
                    href={acc.kakaopay} target="_blank" rel="noreferrer"
                    style={{ flex: 1, padding: '12px 0', backgroundColor: '#FEE500', border: 'none', borderRadius: '0', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: 'bold', color: '#000', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-kr-sans)' }}
                  >
                    카카오페이
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountAccordion;
