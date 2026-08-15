import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';
import { X } from 'lucide-react';

const GuestbookArea = ({ theme, setShowGuestbookModal, setShowGuestbookListModal }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const guestbookInfo = useBuilderStore(state => state.guestbookInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const removeGuestbookEntry = useBuilderStore(state => state.removeGuestbookEntry);
  
  const [hearts, setHearts] = React.useState([]);

  const handleButtonClick = () => {
    if (selectedTemplate === 'bento') {
      const newHearts = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        tx: `${(Math.random() - 0.5) * 150}px`,
        ty: `${- (Math.random() * 200 + 100)}px`,
        rot: `${Math.random() * 360}deg`,
        scale: Math.random() * 0.6 + 0.6,
        emoji: ['💖','✨','🎉','💕','🥰'][Math.floor(Math.random() * 5)]
      }));
      setHearts(prev => [...prev, ...newHearts]);
      setTimeout(() => {
        setShowGuestbookModal(true);
      }, 500); // Wait 500ms before opening modal to see hearts
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.find(n => n.id === h.id)));
      }, 1500);
    } else {
      setShowGuestbookModal(true);
    }
  };

  const selectedFontSubtitle = useBuilderStore(state => state.selectedFontSubtitle);

  if (!guestbookInfo.useGuestbook) return null;

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', backgroundColor: 'transparent' }}>
        <h3 style={{ 
          fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : `'${selectedFontSubtitle}', serif`, fontSize: 'calc(0.95rem * var(--font-ratio))', textAlign: 'center', marginBottom: '30px', color: optionInfo.subtitleColor || theme.accent, letterSpacing: 'calc(0.2rem * var(--font-ratio))'
        }}>
          {optionInfo.magazineTocLanguage === 'kr' ? '방명록' : 'GUEST BOOK'}
        </h3>
        
        {guestbookInfo.description && (
          <div style={{ textAlign: 'center', fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '40px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {guestbookInfo.description}
          </div>
        )}

        {/* 방명록 작성하기 버튼 */}
        <div style={{ marginBottom: '40px', position: 'relative' }}>
          <button 
            onClick={() => handleButtonClick()}
            style={{ 
              width: '100%', 
              padding: '16px', 
              backgroundColor: 'transparent', 
              color: theme.text, 
              border: `1px solid ${theme.text}`, 
              borderRadius: '0', 
              fontWeight: 'normal', 
              cursor: 'pointer', 
              fontFamily: 'var(--font-kr-sans)', 
              fontSize: 'calc(0.9rem * var(--font-ratio))', 
              letterSpacing: 'calc(0.15rem * var(--font-ratio))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            <span>축하 메시지 남기기</span>
            <span style={{ fontWeight: '300' }}>→</span>
          </button>
          
          {/* Floating Hearts Portal (Relative to button) */}
          {hearts.map(h => (
            <div 
              key={h.id} 
              style={{ 
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', 
                zIndex: 99, pointerEvents: 'none',
                fontSize: '2rem', animation: 'bentoHeartFloat 1.5s ease-out forwards',
                '--tx': h.tx, '--ty': h.ty, '--rot': h.rot, '--scale': h.scale
              }}
            >
              {h.emoji}
            </div>
          ))}
        </div>

        {/* 방명록 리스트 (최대 3개까지만 노출) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {guestbookInfo.entries.slice(0, 3).map((entry) => (
            <div key={entry.id} style={{ backgroundColor: 'transparent', border: '1px solid rgba(127,127,127,0.2)', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text }}>{entry.name}</div>
                <div style={{ fontSize: 'calc(0.75rem * var(--font-ratio))', color: '#999' }}>{entry.date}</div>
              </div>
              <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, lineHeight: '1.6', whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                {entry.content}
              </div>
              <button 
                onClick={() => {
                  const pwd = prompt('삭제하시려면 비밀번호를 입력하세요.');
                  if (pwd) {
                    removeGuestbookEntry(entry.id);
                    alert('삭제되었습니다.');
                  }
                }}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 'calc(1rem * var(--font-ratio))' }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {guestbookInfo.entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999', fontSize: 'calc(0.9rem * var(--font-ratio))' }}>
              첫 번째 축하 메시지를 남겨주세요!
            </div>
          )}
        </div>

        {/* 방명록 전체보기 버튼 (3개 초과일 때만 노출) */}
        {guestbookInfo.entries.length > 3 && (
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button 
              onClick={() => setShowGuestbookListModal(true)}
              style={{ background: 'none', border: 'none', borderBottom: `1px solid ${theme.text}`, color: theme.text, fontSize: 'calc(0.9rem * var(--font-ratio))', padding: '4px 8px', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)' }}
            >
              방명록 전체보기 ({guestbookInfo.entries.length})
            </button>
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default GuestbookArea;
