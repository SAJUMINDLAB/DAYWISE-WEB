import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Trash2, Plus } from 'lucide-react';

const AccountSection = ({ title, side }) => {
  const accountInfo = useBuilderStore(state => state.accountInfo);
  const updateAccount = useBuilderStore(state => state.updateAccount);
  const addAccount = useBuilderStore(state => state.addAccount);
  const removeAccount = useBuilderStore(state => state.removeAccount);

  const accounts = accountInfo[side];

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title} ({accounts.length})</span>
      </div>
      
      {accounts.map((acc, index) => (
        <div key={acc.id} style={{ padding: '16px', border: '1px solid #EBEBEB', borderRadius: '8px', marginBottom: '12px', backgroundColor: '#fff', position: 'relative' }}>
          <button onClick={() => removeAccount(side, acc.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
            <Trash2 size={18} />
          </button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px', paddingRight: '24px' }}>
            <input 
              placeholder="관계 (예: 신랑)" 
              value={acc.relation} 
              onChange={(e) => updateAccount(side, acc.id, 'relation', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
            <input 
              placeholder="예금주" 
              value={acc.holder} 
              onChange={(e) => updateAccount(side, acc.id, 'holder', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input 
              placeholder="은행명 (예: 신한은행)" 
              value={acc.bank} 
              onChange={(e) => updateAccount(side, acc.id, 'bank', e.target.value)}
              style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
            <input 
              placeholder="계좌번호 (- 제외)" 
              value={acc.account} 
              onChange={(e) => updateAccount(side, acc.id, 'account', e.target.value)}
              style={{ flex: 2, padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <input 
              placeholder="카카오페이 송금 링크 (선택)" 
              value={acc.kakaopay} 
              onChange={(e) => updateAccount(side, acc.id, 'kakaopay', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', backgroundColor: '#FEE50010', borderColor: '#FEE50050' }}
            />
            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '6px' }}>
              💡 카카오톡 앱 {'>'} 우측 하단 <b>더보기(...)</b> {'>'} 카카오페이 {'>'} 상단 <b>송금</b> {'>'} <b>QR송금</b> {'>'} 하단의 <b>내 송금코드</b>에서 [공유하기]를 눌러 링크 복사 후 붙여넣으세요. (https://qr.kakaopay.com/...)
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={() => addAccount(side)}
        style={{ width: '100%', padding: '12px', backgroundColor: '#F9F9F9', border: '1px dashed #ccc', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#666', fontWeight: 'bold', fontSize: '0.85rem' }}
      >
        <Plus size={16} /> 계좌 추가하기
      </button>
    </div>
  );
};

const Step7Account = () => {
  const accountInfo = useBuilderStore(state => state.accountInfo);
  const updateAccountMessage = useBuilderStore(state => state.updateAccountMessage);
  const updateAccountInfo = useBuilderStore(state => state.updateAccountInfo);

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: accountInfo.useAccount ? '#22222208' : '#fff', border: `1px solid ${accountInfo.useAccount ? '#222' : '#ddd'}`, borderRadius: '8px' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: accountInfo.useAccount ? '#222' : '#555', marginBottom: '4px' }}>마음 전하실 곳 사용하기</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>오시는 길과 방명록 사이에 계좌번호 안내 영역을 표시합니다.</div>
        </div>
        <button 
          onClick={() => updateAccountInfo('useAccount', !accountInfo.useAccount)}
          style={{ width: '50px', height: '28px', backgroundColor: accountInfo.useAccount ? '#222' : '#ccc', borderRadius: '14px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          <div style={{ position: 'absolute', top: '2px', left: accountInfo.useAccount ? '24px' : '2px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>

      {accountInfo.useAccount && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>안내 문구</div>
            <textarea 
              value={accountInfo.message}
              onChange={(e) => updateAccountMessage(e.target.value)}
              placeholder="계좌번호 안내 문구를 적어주세요. 비워두시면 표시되지 않습니다."
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </div>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            축의금 전달을 위한 계좌번호를 입력해주세요.<br/>
            입력된 정보는 아코디언 형태로 예쁘게 숨겨져 표시되며, 복사 버튼이 자동 생성됩니다.
          </div>
          
          <AccountSection title="신랑측 계좌번호" side="groom" />
          <AccountSection title="신부측 계좌번호" side="bride" />
        </>
      )}
    </div>
  );
};

export default Step7Account;
