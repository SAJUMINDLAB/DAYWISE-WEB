import React from 'react';
import FadeUp from '../../FadeUp';

export const getMainImageShapeStyle = (shape) => {
  switch(shape) {
    case 'full': return { borderRadius: '0' };
    case 'rectangle': return { borderRadius: '0' };
    case 'rounded': return { borderRadius: '24px' };
    case 'circle': return { borderRadius: '50%' };
    case 'arch': 
    default: 
      return { borderRadius: '160px 160px 0 0' };
  }
};

const CoverImage = ({ optionInfo, mainInfo, isOverlay, scrollY, layout }) => {
  return (
    <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '3.5s' : '0s'} isFirst={true} style={{ width: '100%', height: isOverlay ? '100%' : 'auto' }}>
      <div className="main-image-wrapper" style={{ padding: (mainInfo.mainImageShape === 'full' || isOverlay) ? '0' : '0 20px', display: 'flex', justifyContent: 'center', marginBottom: isOverlay || layout === 'layout2' ? '0' : '70px', position: 'relative', zIndex: 1, height: isOverlay ? '100%' : 'auto' }}>
        {(mainInfo.mainImageShape === 'full' || isOverlay) ? (
          <div className="main-image-frame" style={{ width: '100%', height: isOverlay ? '100%' : 'auto', position: 'relative', display: 'flex' }}>
            <img 
              className="main-image-img"
              src={mainInfo.mainImage} 
              alt="Main Cover" 
              style={{ width: '100%', height: isOverlay ? '100%' : 'auto', objectFit: 'contain', display: 'block' }} 
            />
            {isOverlay && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }} />}
          </div>
        ) : (
          <div className="main-image-frame" style={{ 
            overflow: 'hidden', width: '100%', maxWidth: '320px', 
            height: mainInfo.mainImageShape === 'circle' ? '320px' : '420px', 
            backgroundColor: '#EBEBEB', position: 'relative',
            ...getMainImageShapeStyle(mainInfo.mainImageShape) 
          }}>
            <div className="main-image-inner" style={{ 
              width: '100%', 
              height: '130%', 
              backgroundImage: mainInfo.mainImage ? `url(${mainInfo.mainImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: optionInfo.parallaxEffect ? `translateY(-${scrollY * 0.15}px)` : 'none',
              transition: 'transform 0.1s ease-out'
            }}>
            </div>
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default CoverImage;
