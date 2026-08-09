import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const Step10Guestbook = () => {
  const guestbookInfo = useBuilderStore(state => state.guestbookInfo);
  const updateGuestbookInfo = useBuilderStore(state => state.updateGuestbookInfo);

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: guestbookInfo.useGuestbook ? '#22222208' : '#fff', border: `1px solid ${guestbookInfo.useGuestbook ? '#222' : '#ddd'}`, borderRadius: '8px' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: guestbookInfo.useGuestbook ? '#222' : '#555', marginBottom: '4px' }}>방명록 사용하기</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>하객들이 축하 메시지를 남길 수 있는 영역입니다.</div>
        </div>
        <button 
          onClick={() => updateGuestbookInfo('useGuestbook', !guestbookInfo.useGuestbook)}
          style={{ width: '50px', height: '28px', backgroundColor: guestbookInfo.useGuestbook ? '#222' : '#ccc', borderRadius: '14px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          <div style={{ position: 'absolute', top: '2px', left: guestbookInfo.useGuestbook ? '24px' : '2px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        하객분들이 남긴 따뜻한 축하 메시지는 나중에 엑셀 다운로드나<br/>
        관리자 페이지를 통해 한눈에 모아보실 수 있습니다.
      </div>

      {guestbookInfo.useGuestbook && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>안내 문구</div>
            <textarea 
              value={guestbookInfo.description}
              onChange={(e) => updateGuestbookInfo('description', e.target.value)}
              placeholder="방명록 안내 문구를 적어주세요."
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step10Guestbook;
