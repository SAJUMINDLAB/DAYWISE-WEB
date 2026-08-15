import React, { useRef, useState } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';
import { ChevronDown } from 'lucide-react';

const svgPlaceholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#F0F0F0"/>
    <rect x="180" y="180" width="40" height="40" rx="4" stroke="#999" stroke-width="2" fill="none"/>
    <circle cx="192" cy="192" r="4" stroke="#999" stroke-width="2" fill="none"/>
    <path d="M180 210 L195 195 L205 205 L220 190 L220 220 L180 220 Z" fill="#999"/>
  </svg>`
)}`;

const dummyImages = Array.from({ length: 9 }).map((_, i) => ({
  id: `d${i + 1}`,
  url: svgPlaceholder
}));

const GalleryArea = ({ theme, setFullscreenIndex, onOpenFullGallery }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const galleryInfo = useBuilderStore(state => state.galleryInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const selectedFontSubtitle = useBuilderStore(state => state.selectedFontSubtitle);

  // Carousel Drag-to-Scroll Logic
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handleDragStart = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    startX.current = pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.scrollSnapType = 'none';
  };
  
  const handleDragEnd = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.scrollSnapType = 'x mandatory';
    }
  };
  
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
    
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
  };

  const handleImageClick = (idx) => {
    if (hasDragged.current) return; // Prevent click if dragging
    setFullscreenIndex(idx);
  };

  if (!galleryInfo.useGallery) return null;
  if (!galleryInfo.useGallery || !galleryInfo.images || galleryInfo.images.length === 0) return null;

  const displayImages = galleryInfo.images.length > 0 ? galleryInfo.images : dummyImages;
  const isMagazine = selectedTemplate === 'magazine';
  const gridLimit = isMagazine ? 6 : 9;
  const gridCols = isMagazine ? 2 : 3;
  const visibleGridImages = galleryInfo.layout === 'grid' ? displayImages.slice(0, gridLimit) : displayImages;
  const hasMore = galleryInfo.layout === 'grid' && displayImages.length > gridLimit;

  return (
    <>
      <FadeUp active={optionInfo.motionEffect}>
        <div style={{ padding: '60px 20px', position: 'relative', zIndex: 10 }}>
          <h3 style={{ 
            fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : `'${selectedFontSubtitle}', serif`, 
            fontSize: 'calc(0.95rem * var(--font-ratio))', 
            textAlign: 'center', 
            marginBottom: '40px', 
            color: optionInfo.subtitleColor || theme.accent,
            letterSpacing: 'calc(0.2rem * var(--font-ratio))'
          }}>
            {optionInfo.magazineTocLanguage === 'kr' ? '사진' : 'GALLERY'}
          </h3>
          
          {galleryInfo.layout === 'grid' && (
            <>
              <div className="gallery-grid-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '4px' }}>
                {visibleGridImages.map((img, idx) => (
                  <div key={img.id} onClick={() => setFullscreenIndex(idx)} className="gallery-grid-item hover-scale" style={{ width: '100%', paddingBottom: '100%', overflow: 'hidden', cursor: 'pointer', position: 'relative', backgroundColor: 'transparent' }}>
                    <img src={img.url} alt={`gallery-${idx}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.3s' }} />
                    
                    {/* +N 더보기 오버레이 (마지막 이미지에만) */}
                    {hasMore && idx === (gridLimit - 1) && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation(); // 썸네일(스와이프 모달) 안 뜨게 막기
                          onOpenFullGallery && onOpenFullGallery(displayImages, gridCols);
                        }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'calc(1.4rem * var(--font-ratio))', fontFamily: 'var(--font-kr-sans)' }}
                      >
                        +{displayImages.length - 9}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                  <button 
                    onClick={() => onOpenFullGallery && onOpenFullGallery(displayImages, gridCols)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: `1px solid ${theme.text}`, color: theme.text, padding: '10px 24px', borderRadius: '24px', fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(0.9rem * var(--font-ratio))', cursor: 'pointer', transition: 'all 0.2s', opacity: 0.8 }}
                  >
                    더보기 <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}

          {galleryInfo.layout === 'carousel' && (
            <div 
              ref={carouselRef}
              onMouseDown={handleDragStart}
              onMouseLeave={handleDragEnd}
              onMouseUp={handleDragEnd}
              onMouseMove={handleDragMove}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              onTouchMove={handleDragMove}
              style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '10px', scrollSnapType: 'x mandatory', cursor: 'grab' }} 
              className="hide-scrollbar"
            >
              {displayImages.map((img, idx) => (
                <div key={img.id} onClick={() => handleImageClick(idx)} className="carousel-item hover-scale" style={{ flex: '0 0 auto', width: '280px', height: '360px', scrollSnapAlign: 'center', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={img.url} alt={`gallery-${idx}`} draggable={false} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeUp>

    </>
  );
};

export default GalleryArea;
