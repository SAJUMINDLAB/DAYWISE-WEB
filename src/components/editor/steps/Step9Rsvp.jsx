import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Power, Utensils, Users, MessageSquare, Phone } from 'lucide-react';

const Step9Rsvp = () => {
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);
  const updateRsvpInfo = useBuilderStore(state => state.updateRsvpInfo);

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: rsvpInfo.useRsvp ? '#22222208' : '#fff', border: `1px solid ${rsvpInfo.useRsvp ? '#222' : '#ddd'}`, borderRadius: '8px' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: rsvpInfo.useRsvp ? '#222' : '#555', marginBottom: '4px' }}>참석 의사 전달 사용하기</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>청첩장 하단에 참석 의사 팝업 버튼을 생성합니다.</div>
        </div>
        <button 
          onClick={() => updateRsvpInfo('useRsvp', !rsvpInfo.useRsvp)}
          style={{ width: '50px', height: '28px', backgroundColor: rsvpInfo.useRsvp ? '#222' : '#ccc', borderRadius: '14px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          <div style={{ position: 'absolute', top: '2px', left: rsvpInfo.useRsvp ? '24px' : '2px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        하객분들의 참석 여부와 식사 여부 등을 미리 파악할 수 있는 RSVP 기능입니다.
      </div>

      {rsvpInfo.useRsvp && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>버튼 텍스트</div>
            <input 
              value={rsvpInfo.title}
              onChange={(e) => updateRsvpInfo('title', e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>참석 의사 팝업창 타이틀</div>
            <input 
              value={rsvpInfo.modalTitle}
              onChange={(e) => updateRsvpInfo('modalTitle', e.target.value)}
              placeholder="예: RSVP"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', marginBottom: '16px' }}
            />

            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>안내 문구</div>
            <textarea 
              value={rsvpInfo.description}
              onChange={(e) => updateRsvpInfo('description', e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6', marginBottom: '16px' }}
            />
            
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>참석 의사 전달 강조 방식</div>
            <select
              value={rsvpInfo.emphasisMode}
              onChange={(e) => updateRsvpInfo('emphasisMode', e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <option value="floating">스마트 플로팅 버튼 (항상 떠있음)</option>
              <option value="toast">진입 알림창 + 스크롤 이동</option>
              <option value="modal">진입 강제 팝업</option>
              <option value="none">강조하지 않음</option>
            </select>
          </div>

          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px' }}>수집 옵션</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 연락처 수집 토글 */}
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={20} color={rsvpInfo.useContactOption ? '#8C9B90' : '#aaa'} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: rsvpInfo.useContactOption ? '#333' : '#888' }}>연락처 수집하기</span>
              </div>
              <input 
                type="checkbox" 
                checked={rsvpInfo.useContactOption}
                onChange={(e) => updateRsvpInfo('useContactOption', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </label>

            {/* 식사 여부 토글 */}
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Utensils size={20} color={rsvpInfo.useMealOption ? '#8C9B90' : '#aaa'} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: rsvpInfo.useMealOption ? '#333' : '#888' }}>식사 여부 확인하기</span>
              </div>
              <input 
                type="checkbox" 
                checked={rsvpInfo.useMealOption}
                onChange={(e) => updateRsvpInfo('useMealOption', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={20} color={rsvpInfo.useCompanionOption ? '#8C9B90' : '#aaa'} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: rsvpInfo.useCompanionOption ? '#333' : '#888' }}>동반인 인원 확인하기</span>
              </div>
              <input 
                type="checkbox" 
                checked={rsvpInfo.useCompanionOption}
                onChange={(e) => updateRsvpInfo('useCompanionOption', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </label>

            {/* 전달사항 묻기 토글 (체크박스 통일) */}
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquare size={20} color={rsvpInfo.useMessageOption ? '#8C9B90' : '#aaa'} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: rsvpInfo.useMessageOption ? '#333' : '#888' }}>전달사항 묻기</span>
              </div>
              <input 
                type="checkbox"
                checked={rsvpInfo.useMessageOption}
                onChange={(e) => updateRsvpInfo('useMessageOption', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};

export default Step9Rsvp;
