import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { ImagePlus, Trash2, GripVertical, Crop } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import SimpleCropper from '../../common/SimpleCropper';

import { useImageUpload } from '../../../hooks/useImageUpload';

const Step5Gallery = () => {
  const galleryInfo = useBuilderStore(state => state.galleryInfo);
  const setGalleryInfo = useBuilderStore(state => state.setGalleryInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const { uploadImage } = useImageUpload();

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentCropImage, setCurrentCropImage] = useState(null);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (galleryInfo.images.length + files.length > 30) {
      alert('사진은 최대 30장까지만 추가할 수 있습니다.');
      return;
    }

    const newImages = [];
    for (const file of files) {
      const base64 = await uploadImage(file, 1080);
      if (base64) {
        newImages.push({
          id: Math.random().toString(36).substring(7),
          url: base64,
          name: file.name
        });
      }
    }

    setGalleryInfo('images', [...galleryInfo.images, ...newImages]);
  };

  const removeImage = (id) => {
    const newImages = galleryInfo.images.filter(img => img.id !== id);
    setGalleryInfo('images', newImages);
  };

  const openCropper = (img) => {
    setCurrentCropImage(img);
    setCropModalOpen(true);
  };

  const handleCropComplete = async (croppedFile) => {
    if (!currentCropImage) return;
    const base64 = await uploadImage(croppedFile, 1080);
    if (base64) {
      const newImages = galleryInfo.images.map(img => 
        img.id === currentCropImage.id ? { ...img, url: base64 } : img
      );
      setGalleryInfo('images', newImages);
    }
    setCropModalOpen(false);
    setCurrentCropImage(null);
  };

  return (
    <div style={{ padding: '10px 0' }}>
      
      {/* 사용 여부 토글 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #EBEBEB' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px' }}>갤러리 구역 사용</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>이 구역을 청첩장에 표시할지 선택합니다.</div>
        </div>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={galleryInfo.useGallery} 
            onChange={(e) => setGalleryInfo('useGallery', e.target.checked)} 
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {galleryInfo.useGallery && (
        <>
            <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>갤러리 레이아웃</div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {['grid', 'carousel'].map(layout => {
                  return (
                    <button
                      key={layout}
                      onClick={() => setGalleryInfo('layout', layout)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: '6px',
                        backgroundColor: galleryInfo.layout === layout ? '#222' : '#fff',
                        color: galleryInfo.layout === layout ? '#fff' : '#666',
                        border: `1px solid ${galleryInfo.layout === layout ? '#222' : '#ddd'}`,
                        cursor: 'pointer'
                      }}
                    >
                      {layout === 'grid' ? '바둑판 격자형' : '가로 슬라이드형'}
                    </button>
                  );
                })}
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>사진 맞춤 방식</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setGalleryInfo('imageFit', 'contain')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '6px',
                    backgroundColor: galleryInfo.imageFit === 'contain' ? '#222' : '#fff',
                    color: galleryInfo.imageFit === 'contain' ? '#fff' : '#666',
                    border: `1px solid ${galleryInfo.imageFit === 'contain' ? '#222' : '#ddd'}`,
                    cursor: 'pointer'
                  }}
                >
                  원본 비율 (여백 발생)
                </button>
                <button
                  onClick={() => setGalleryInfo('imageFit', 'cover')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '6px',
                    backgroundColor: galleryInfo.imageFit === 'cover' ? '#222' : '#fff',
                    color: galleryInfo.imageFit === 'cover' ? '#fff' : '#666',
                    border: `1px solid ${galleryInfo.imageFit === 'cover' ? '#222' : '#ddd'}`,
                    cursor: 'pointer'
                  }}
                >
                  1:1 꽉 차게 (여백 없음)
                </button>
              </div>
            </div>

          <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>사진 업로드 ({galleryInfo.images.length}/30장)</div>
          
          <label style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#f5f5f5', padding: '6px 12px', borderRadius: '4px',
            fontSize: '0.8rem', cursor: 'pointer', border: '1px solid #ddd'
          }}>
            <ImagePlus size={16} /> 사진 추가
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
            />
          </label>
        </div>

        <Droppable droppableId="gallery-dnd" type="gallery">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {galleryInfo.images.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '6px', color: '#888', fontSize: '0.9rem' }}>
                  사진을 업로드해주세요.
                </div>
              ) : (
                galleryInfo.images.map((img, index) => (
                  <Draggable key={img.id} draggableId={img.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '8px', border: '1px solid',
                          borderColor: snapshot.isDragging ? 'var(--tnc-charcoal)' : '#eee',
                          borderRadius: '6px',
                          backgroundColor: snapshot.isDragging ? '#fdfdfd' : '#fff',
                          boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                          userSelect: 'none',
                          ...provided.draggableProps.style
                        }}
                      >
                        <div style={{ padding: '4px', color: snapshot.isDragging ? 'var(--tnc-charcoal)' : '#bbb', cursor: 'grab' }}>
                          <GripVertical size={16} />
                        </div>
                        <img src={img.url} draggable={false} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, fontSize: '0.85rem', color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {img.name}
                        </div>
                        <button 
                          onClick={() => openCropper(img)} 
                          onPointerDown={(e) => e.stopPropagation()}
                          style={{ padding: '4px', cursor: 'pointer', background: 'none', border: 'none', color: '#0066cc', display: 'flex', alignItems: 'center' }}
                          title="1:1 비율로 자르기"
                        >
                          <Crop size={16} />
                        </button>
                        <button 
                          onClick={() => removeImage(img.id)} 
                          onPointerDown={(e) => e.stopPropagation()}
                          style={{ padding: '4px', cursor: 'pointer', background: 'none', border: 'none', color: '#ff4d4f' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
        </>
      )}

      {cropModalOpen && currentCropImage && (
        <SimpleCropper
          imageUrl={currentCropImage.url}
          aspectRatio={1}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setCropModalOpen(false);
            setCurrentCropImage(null);
          }}
        />
      )}

    </div>
  );
};

export default Step5Gallery;
