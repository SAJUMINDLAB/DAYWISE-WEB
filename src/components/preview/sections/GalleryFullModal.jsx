import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const GalleryFullModal = ({ theme, images, gridCols = 3, onClose, setFullscreenIndex }) => {
  // 모달이 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    // We don't disable body scroll anymore because the modal is contained within the preview mockup,
    // and we might need the main page to still be scrollable, or we can just disable the preview scroll.
    // To disable preview scroll, we'd need a ref or ID on the preview container.
    // For now, we rely on the modal covering the screen and intercepting events.
  }, []);

  const optionInfo = useBuilderStore(state => state.optionInfo);
  const subtitleColor = optionInfo.subtitleColor || theme.accent;


  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: theme.bg, zIndex: 9999, display: 'flex', flexDirection: 'column',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* 헤더 영역 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)',
        backgroundColor: theme.bg, zIndex: 10
      }}>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
          color: theme.text, fontSize: '0.9rem', gap: '4px', padding: 0
        }}>
          <ChevronLeft size={20} />
          <span>뒤로</span>
        </button>
        <h3 style={{
          fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : 'var(--font-en-sans)',
          fontSize: 'calc(1.3rem * var(--font-ratio))',
          color: optionInfo.subtitleColor || theme.accent,
          margin: 0,
          letterSpacing: 'calc(0.1rem * var(--font-ratio))',
          fontWeight: 'normal',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {optionInfo.magazineTocLanguage === 'kr' ? '사진' : 'GALLERY'}
        </h3>
        <div style={{ width: '48px' }}></div> {/* 우측 여백 맞춤 */}
      </div>

      {/* 이미지 그리드 영역 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '4px',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gap: '4px',
        alignContent: 'start'
      }}>
        {images.map((img, idx) => (
          <div 
            key={img.id || idx} 
            onClick={() => {
              // 썸네일 클릭 시 기존 풀스크린(스와이프) 모달 띄우기
              setFullscreenIndex(idx);
            }} 
            style={{ 
              width: '100%',
              overflow: 'hidden', 
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: 'transparent'
            }}
          >
            {/* Spacer for Safari grid height bug */}
            <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'/%3E" alt="spacer" style={{ width: '100%', display: 'block', pointerEvents: 'none' }} />
            <img 
              src={img.url} 
              alt={`gallery-full-${idx}`} 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryFullModal;
