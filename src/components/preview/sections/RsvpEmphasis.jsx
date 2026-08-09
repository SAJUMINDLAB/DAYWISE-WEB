import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Mail, X } from 'lucide-react';

const RsvpEmphasis = ({ theme, setShowRsvpModal }) => {
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);
  const [isRsvpVisible, setIsRsvpVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 1. Intersection Observer (공통)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRsvpVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const rsvpElement = document.getElementById('rsvp-area');
    if (rsvpElement) {
      observer.observe(rsvpElement);
    }

    // 2. 초기 팝업/토스트 트리거
    if (rsvpInfo.useRsvp) {
      if (rsvpInfo.emphasisMode === 'toast') {
        const timer = setTimeout(() => setShowToast(true), 1500);
        return () => {
          clearTimeout(timer);
          observer.disconnect();
        };
      } else if (rsvpInfo.emphasisMode === 'modal') {
        // 이미 띄웠었는지 체크 방지 로직 (여기선 데모용으로 매번 띄움)
        const timer = setTimeout(() => setShowModal(true), 1000);
        return () => {
          clearTimeout(timer);
          observer.disconnect();
        };
      }
    }

    return () => observer.disconnect();
  }, [rsvpInfo.useRsvp, rsvpInfo.emphasisMode]);

  const scrollToRsvp = () => {
    setShowToast(false);
    const element = document.getElementById('rsvp-area');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!rsvpInfo.useRsvp || rsvpInfo.emphasisMode === 'none') return null;

  return (
    <>
      {/* 1. 플로팅 버튼 모드 */}
      {rsvpInfo.emphasisMode === 'floating' && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40, // BGM버튼(50)보다 살짝 아래, 하지만 클릭가능하게
          opacity: isRsvpVisible ? 0 : 1,
          pointerEvents: isRsvpVisible ? 'none' : 'auto',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isRsvpVisible ? 'none' : 'auto'
        }}>
              <button 
            onClick={() => setShowRsvpModal(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: theme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              fontFamily: 'var(--font-kr-sans)',
              whiteSpace: 'nowrap',
              animation: 'bounce 2s infinite'
            }}
          >
            <Mail size={18} />
            {rsvpInfo.title}
          </button>
          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-8px); }
              60% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}

      {/* 2. 진입 알림창 (Toast) 모드 */}
      {rsvpInfo.emphasisMode === 'toast' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: `translateX(-50%) translateY(${showToast && !isRsvpVisible ? '0' : '-150%'})`,
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '16px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '90%',
          maxWidth: '400px',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: `4px solid ${theme.accent}`
        }}>
          <div onClick={scrollToRsvp} style={{ cursor: 'pointer', flex: 1 }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>식사 준비를 위해 부탁드립니다.</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: theme.text }}>참석 여부를 알려주세요 👉</div>
          </div>
          <button onClick={() => setShowToast(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* 3. 진입 팝업 (Modal) 모드 */}
      {rsvpInfo.emphasisMode === 'modal' && showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            backgroundColor: theme.bg,
            padding: '30px',
            borderRadius: '16px',
            width: '85%',
            maxWidth: '360px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '1.2rem', color: theme.text, marginBottom: '16px' }}>
              {rsvpInfo.modalTitle}
            </h3>
            <p style={{ fontSize: '0.9rem', color: theme.text, opacity: 0.8, lineHeight: '1.6', marginBottom: '24px' }}>
              원활한 예식 준비를 위해<br/>
              미리 참석 여부를 여쭙고 있습니다.<br/>
              지금 작성하시겠습니까?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setShowRsvpModal(true);
                }}
                style={{ width: '100%', padding: '14px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)' }}
              >
                네, 지금 바로 전달할게요
              </button>
              <button 
                onClick={() => setShowModal(false)}
                style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', color: '#888', border: 'none', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)' }}
              >
                아니오, 나중에 할게요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RsvpEmphasis;
