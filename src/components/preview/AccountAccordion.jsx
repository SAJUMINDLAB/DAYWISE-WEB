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
    <div style={{ marginBottom: '12px' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.03)', border: 'none', borderRadius: isOpen ? '8px 8px 0 0' : '8px', 
          cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text
        }}
      >
        <span style={{ fontWeight: 'bold' }}>{title}</span>
        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} color={theme.text} />
      </button>
      
      {isOpen && (
        <div style={{ 
          backgroundColor: 'transparent', border: `1px solid ${theme.accent}`, borderTop: 'none', 
          borderRadius: '0 0 8px 8px', padding: '16px 20px'
        }}>
          {accounts.map((acc, index) => (
            <div key={acc.id} style={{ marginBottom: index === accounts.length - 1 ? 0 : '16px', paddingBottom: index === accounts.length - 1 ? 0 : '16px', borderBottom: index === accounts.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: 'calc(0.8rem * var(--font-ratio))', color: theme.text, opacity: 0.8, marginBottom: '4px' }}>{acc.relation}</div>
                  <div style={{ fontSize: 'calc(0.95rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text }}>{acc.holder}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'calc(0.8rem * var(--font-ratio))', color: theme.text, opacity: 0.8, marginBottom: '4px' }}>{acc.bank}</div>
                  <div style={{ fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text, letterSpacing: 'calc(0.05rem * var(--font-ratio))' }}>{acc.account}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button 
                  onClick={() => handleCopy(acc.account)}
                  style={{ flex: 1, padding: '10px 0', backgroundColor: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '4px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text, cursor: 'pointer', fontFamily: 'var(--font-kr-sans)' }}
                >
                  계좌 복사
                </button>
                {acc.kakaopay && (
                  <a 
                    href={acc.kakaopay} target="_blank" rel="noreferrer"
                    style={{ flex: 1, padding: '10px 0', backgroundColor: '#FEE500', border: 'none', borderRadius: '4px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: 'bold', color: '#000', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-kr-sans)' }}
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
