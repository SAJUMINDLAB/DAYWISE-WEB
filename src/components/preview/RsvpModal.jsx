import React, { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { submitRsvp } from '../../api/supabaseApi';

const RsvpModal = ({ rsvpInfo, theme, onClose }) => {
  const currentInvitationId = useBuilderStore(state => state.currentInvitationId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    side: '',
    attend: '',
    meal: '',
    name: '',
    contact: '',
    companions: 0,
    companionNames: '',
    message: ''
  });

  const handleSubmit = async () => {
    if (!form.side || !form.attend || !form.name) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!currentInvitationId) {
      alert('참석 의사가 전달되었습니다.\n(미리보기 환경에서는 실제로 전송되지 않습니다.)');
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRsvp(currentInvitationId, form);
      alert('참석 의사가 성공적으로 전달되었습니다.\n축하해 주셔서 감사합니다.');
      onClose();
    } catch (err) {
      alert('전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const btnStyle = (selected) => ({
    flex: 1, padding: '16px 0', 
    border: `1px solid ${selected ? theme.text : 'rgba(0,0,0,0.15)'}`, 
    backgroundColor: selected ? 'rgba(0,0,0,0.03)' : 'transparent', 
    color: theme.text, 
    borderRadius: '4px', fontWeight: selected ? 'bold' : 'normal',
    cursor: 'pointer', transition: 'all 0.2s',
    fontFamily: 'var(--font-kr-sans)'
  });

  const labelStyle = { fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'bold', marginBottom: '16px', color: theme.text, fontFamily: 'var(--font-kr-sans)' };
  
  const inputStyle = { width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)', borderRadius: '0', outline: 'none', fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(0.95rem * var(--font-ratio))', backgroundColor: 'transparent', color: theme.text };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: theme.bg, zIndex: 9999, display: 'flex', flexDirection: 'column', overflowY: 'auto', animation: 'fadeIn 0.2s ease-out' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'sticky', top: 0, backgroundColor: theme.bg, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, display: 'flex', alignItems: 'center', padding: 0 }}>
          <ChevronLeft size={28} />
        </button>
        <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', fontWeight: 'normal', letterSpacing: 'calc(0.1rem * var(--font-ratio))', color: theme.text }}>{rsvpInfo.modalTitle}</div>
        <div style={{ width: '28px' }} />
      </div>

      <div style={{ padding: '20px 24px 60px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(2.8rem * var(--font-ratio))', textAlign: 'center', marginBottom: '40px', color: theme.text, fontWeight: 'normal' }}>{rsvpInfo.modalTitle}</h2>
        
        <div style={{ textAlign: 'center', fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '60px', lineHeight: '1.8', whiteSpace: 'pre-wrap', opacity: 0.8 }}>
          {rsvpInfo.description}
        </div>
        
        {/* 어느 측 하객이신가요? */}
        <div style={{ marginBottom: '40px' }}>
          <div style={labelStyle}>어느 측 하객이신가요? <span style={{color: 'rgba(0,0,0,0.4)'}}>*</span></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setForm({...form, side: 'groom'})} style={btnStyle(form.side === 'groom')}>신랑측</button>
            <button onClick={() => setForm({...form, side: 'bride'})} style={btnStyle(form.side === 'bride')}>신부측</button>
          </div>
        </div>

        {/* 참석하실 수 있나요? */}
        <div style={{ marginBottom: '40px' }}>
          <div style={labelStyle}>참석하실 수 있나요? <span style={{color: 'rgba(0,0,0,0.4)'}}>*</span></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setForm({...form, attend: 'yes'})} style={btnStyle(form.attend === 'yes')}>참석할게요</button>
            <button onClick={() => setForm({...form, attend: 'no'})} style={btnStyle(form.attend === 'no')}>참석이 어려워요</button>
          </div>
        </div>

        {/* 식사 여부 */}
        {rsvpInfo.useMealOption && form.attend === 'yes' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={labelStyle}>식사 여부</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setForm({...form, meal: 'yes'})} style={btnStyle(form.meal === 'yes')}>예</button>
              <button onClick={() => setForm({...form, meal: 'no'})} style={btnStyle(form.meal === 'no')}>아니요</button>
              <button onClick={() => setForm({...form, meal: 'unsure'})} style={btnStyle(form.meal === 'unsure')}>미정</button>
            </div>
          </div>
        )}

        {/* 성함 */}
        <div style={{ marginBottom: '40px' }}>
          <div style={labelStyle}>성함 <span style={{color: 'rgba(0,0,0,0.4)'}}>*</span></div>
          <input placeholder="참석하실 본인 성함" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        </div>

        {/* 연락처*/}
        {rsvpInfo.useContactOption && (
          <div style={{ marginBottom: '40px' }}>
            <div style={labelStyle}>연락처</div>
            <input placeholder="010-0000-0000" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} style={inputStyle} />
          </div>
        )}

        {/* 동행인 수 */}
        {rsvpInfo.useCompanionOption && form.attend === 'yes' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={labelStyle}>동행인 수 (본인 제외)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button onClick={() => setForm({...form, companions: Math.max(0, form.companions - 1)})} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', backgroundColor: 'transparent', fontSize: 'calc(1.4rem * var(--font-ratio))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.text }}>-</button>
              <span style={{ fontSize: 'calc(1.2rem * var(--font-ratio))', fontWeight: 'bold', width: '30px', textAlign: 'center', fontFamily: 'var(--font-kr-sans)', color: theme.text }}>{form.companions}</span>
              <button onClick={() => setForm({...form, companions: form.companions + 1})} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', backgroundColor: 'transparent', fontSize: 'calc(1.4rem * var(--font-ratio))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.text }}>+</button>
            </div>
          </div>
        )}

        {/* 전달사항 */}
        {rsvpInfo.useMessageOption && (
          <div style={{ marginBottom: '60px' }}>
            <div style={labelStyle}>전달사항</div>
            <input placeholder="축하 메시지나 전달사항을 남겨주세요" value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={inputStyle} />
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          style={{ width: '100%', padding: '18px', backgroundColor: theme.text, color: theme.bg, border: 'none', borderRadius: '4px', fontSize: 'calc(1.1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? '전달 중...' : '전달하기'}
        </button>
      </div>
    </div>
  );
};

export default RsvpModal;
