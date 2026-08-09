import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const GalleryFullModal = ({ theme, images, gridCols = 3, onClose, setFullscreenImage }) => {
  // 모달이 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    // We don't disable body scroll anymore because the modal is contained within the preview mockup,
    // and we might need the main page to still be scrollable, or we can just disable the preview scroll.
    // To disable preview scroll, we'd need a ref or ID on the preview container.
    // For now, we rely on the modal covering the screen and intercepting events.
  }, []);

  return (
    <div style={{
      position: 'fixed', // This will be relative to .mobile-mockup because it has a CSS transform!
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.bg,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* 헤더 영역 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: theme.bg,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: theme.text,
            padding: '8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '1rem',
            fontFamily: 'var(--font-kr-sans)'
          }}
        >
          <ChevronLeft size={24} />
          <span>뒤로</span>
        </button>
        <h3 style={{
          fontFamily: 'var(--font-en-serif)',
          fontSize: 'calc(1.2rem * var(--font-ratio))',
          color: theme.accent,
          margin: 0,
          letterSpacing: 'calc(0.1rem * var(--font-ratio))',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          Gallery
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
              setFullscreenImage(img.url);
            }} 
            style={{ 
              aspectRatio: '1', 
              overflow: 'hidden', 
              cursor: 'pointer' 
            }}
          >
            <img 
              src={img.url} 
              alt={`gallery-full-${idx}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryFullModal;
