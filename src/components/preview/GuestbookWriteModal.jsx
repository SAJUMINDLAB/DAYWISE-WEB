import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { submitGuestbook } from '../../api/supabaseApi';

const GuestbookWriteModal = ({ theme, onClose, addGuestbookEntry }) => {
  const currentInvitationId = useBuilderStore(state => state.currentInvitationId);
  const [guestName, setGuestName] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!guestName || !guestPassword || !guestMessage) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (guestPassword.length < 4) {
      alert('비밀번호는 숫자 4자리로 입력해주세요.');
      return;
    }

    const entryData = {
      name: guestName,
      password: guestPassword,
      content: guestMessage,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').replace(/ /g, ' ')
    };

    if (!currentInvitationId) {
      // 에디터 환경인 경우 프론트엔드 스토어에만 추가
      addGuestbookEntry(entryData);
      alert('방명록이 등록되었습니다.\n(미리보기 환경에서는 새로고침 시 초기화됩니다.)');
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      const newEntry = await submitGuestbook(currentInvitationId, entryData);
      // DB에 저장 후, 로컬 상태도 업데이트해서 화면에 바로 보이게 함
      addGuestbookEntry(newEntry);
      alert('방명록이 등록되었습니다.');
      onClose();
    } catch (err) {
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: theme.bg, zIndex: 9999, display: 'flex', flexDirection: 'column', overflowY: 'auto', animation: 'fadeIn 0.2s ease-out' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'sticky', top: 0, backgroundColor: theme.bg, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, display: 'flex', alignItems: 'center', padding: 0 }}>
          <ChevronLeft size={28} />
        </button>
        <div style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.1rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text }}>방명록 작성</div>
        <div style={{ width: 28 }} />
      </div>

      <div style={{ padding: '20px 24px' }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: 'calc(0.85rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text, marginBottom: '8px', opacity: 0.7 }}>성함</div>
          <input 
            placeholder="이름을 입력해주세요" 
            value={guestName} 
            onChange={e => setGuestName(e.target.value)} 
            style={{ width: '100%', padding: '14px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)', fontSize: 'calc(1rem * var(--font-ratio))', outline: 'none', backgroundColor: 'transparent', color: theme.text, fontFamily: 'var(--font-kr-sans)' }} 
          />
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: 'calc(0.85rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text, marginBottom: '8px', opacity: 0.7 }}>비밀번호 (숫자 4자리)</div>
          <input 
            type="password"
            maxLength={4}
            inputMode="numeric"
            placeholder="나중에 수정/삭제 시 필요합니다." 
            value={guestPassword} 
            onChange={e => setGuestPassword(e.target.value.replace(/[^0-9]/g, ''))} 
            style={{ width: '100%', padding: '14px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)', fontSize: 'calc(1rem * var(--font-ratio))', outline: 'none', backgroundColor: 'transparent', color: theme.text, fontFamily: 'var(--font-kr-sans)' }} 
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: 'calc(0.85rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text, marginBottom: '8px', opacity: 0.7 }}>축하 메시지</div>
          <textarea 
            placeholder="따뜻한 축하의 한마디를 남겨주세요" 
            value={guestMessage} 
            onChange={e => setGuestMessage(e.target.value)} 
            style={{ width: '100%', padding: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: 'calc(0.95rem * var(--font-ratio))', minHeight: '120px', outline: 'none', resize: 'vertical', backgroundColor: 'rgba(255,255,255,0.5)', color: theme.text, fontFamily: 'var(--font-kr-sans)', lineHeight: '1.6' }} 
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ width: '100%', padding: '18px', backgroundColor: theme.text, color: theme.bg, border: 'none', borderRadius: '4px', fontSize: 'calc(1.1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  );
};

export default GuestbookWriteModal;
