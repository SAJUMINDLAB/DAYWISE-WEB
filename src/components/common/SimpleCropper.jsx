import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';

const SimpleCropper = ({ imageFile, imageUrl, aspectRatio = 1, showKakaoSafeZone = false, onCropComplete, onCancel }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImgSrc(e.target.result);
      reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageFile, imageUrl]);

  const handleImageLoad = () => {
    if (containerRef.current && imgRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      
      const scaleX = container.width / imgRef.current.naturalWidth;
      const scaleY = container.height / imgRef.current.naturalHeight;
      
      setScale(Math.max(scaleX, scaleY));
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;
    
    if (containerRef.current && imgRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const imgWidth = imgRef.current.naturalWidth * scale;
      const imgHeight = imgRef.current.naturalHeight * scale;
      
      const minX = container.width - imgWidth;
      const minY = container.height - imgHeight;
      
      newX = Math.min(0, Math.max(newX, minX));
      newY = Math.min(0, Math.max(newY, minY));
    }
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, scale]);

  const handleMouseUp = () => setIsDragging(false);
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
  };
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    let newX = e.touches[0].clientX - dragStart.x;
    let newY = e.touches[0].clientY - dragStart.y;
    
    if (containerRef.current && imgRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const imgWidth = imgRef.current.naturalWidth * scale;
      const imgHeight = imgRef.current.naturalHeight * scale;
      
      const minX = container.width - imgWidth;
      const minY = container.height - imgHeight;
      
      newX = Math.min(0, Math.max(newX, minX));
      newY = Math.min(0, Math.max(newY, minY));
    }
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, scale]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const handleCrop = () => {
    if (!imgRef.current || !containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800 / aspectRatio;
    const ctx = canvas.getContext('2d');

    const container = containerRef.current.getBoundingClientRect();
    
    ctx.drawImage(
      imgRef.current,
      -position.x / scale, 
      -position.y / scale, 
      container.width / scale, 
      container.height / scale,
      0, 
      0, 
      canvas.width, 
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
        onCropComplete(croppedFile);
      }
    }, 'image/jpeg', 0.9);
  };

  if (!imgSrc) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 99999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1rem', fontWeight: 'bold' }}>
        이미지를 드래그하여 위치를 조정해주세요
      </div>
      
      <div 
        ref={containerRef}
        style={{
          width: '300px',
          height: `${300 / aspectRatio}px`,
          backgroundColor: '#333',
          position: 'relative',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          border: '2px solid #fff'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img 
          ref={imgRef}
          src={imgSrc} 
          alt="crop" 
          crossOrigin="anonymous"
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            maxWidth: 'none'
          }}
          onLoad={handleImageLoad}
        />
        {showKakaoSafeZone && (
          <div style={{
            position: 'absolute',
            top: '50%', // 잘려나가는 하단 50% 영역
            left: 0,
            right: 0,
            bottom: 0,
            borderTop: '2px dashed rgba(255, 60, 60, 0.9)',
            backgroundColor: 'rgba(0,0,0,0.5)', // 어둡게 처리하여 잘림을 직관적으로 표현
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              🚫 주소 복사 시 잘리는 영역
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              (단, [카카오톡 공유하기] 버튼 사용 시 전체 노출)
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
        <button 
          onClick={onCancel}
          style={{ padding: '12px 24px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <X size={18} /> 취소
        </button>
        <button 
          onClick={handleCrop}
          style={{ padding: '12px 24px', backgroundColor: '#FEE500', color: '#191919', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Check size={18} /> 확인
        </button>
      </div>
    </div>
  );
};

export default SimpleCropper;
