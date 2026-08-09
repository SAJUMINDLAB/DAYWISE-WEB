import React, { useRef } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Upload, MessageCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const Step12Share = () => {
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const updateShareInfo = useBuilderStore(state => state.updateShareInfo);
  const mainImage = useBuilderStore(state => state.mainInfo.mainImage);
  const fileInputRef = useRef(null);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateShareInfo('thumbnailUrl', url);
    }
  };

  const currentThumbnail = shareInfo.thumbnailUrl || mainImage;

  return (
    <div style={{ padding: '10px 0' }}>
      
      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        청첩장을 전달할 때 카카오톡 말풍선에 노출될 미리보기 화면을 설정합니다.<br/>
        받는 분이 처음 보게 될 모습이니 정성스럽게 작성해 보세요.
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>공유 제목</div>
        <input 
          value={shareInfo.title}
          onChange={(e) => updateShareInfo('title', e.target.value)}
          placeholder="예: 동현과 슬기 결혼합니다"
          style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>공유 설명문구</div>
        <textarea 
          value={shareInfo.description}
          onChange={(e) => updateShareInfo('description', e.target.value)}
          placeholder="예: 2026년 11월 14일, 두 사람의 시작을 축하해 주세요."
          style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>썸네일 이미지</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div 
            style={{ 
              width: '80px', height: '80px', borderRadius: '8px', backgroundColor: '#eee', 
              backgroundImage: currentThumbnail ? `url(${currentThumbnail})` : 'none',
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              border: '1px solid #ddd'
            }}
          >
            {!currentThumbnail && <ImageIcon size={24} color="#ccc" />}
          </div>
          <div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}
            >
              <Upload size={14} /> 이미지 변경
            </button>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>미설정 시 메인 화면 이미지가 사용됩니다.</div>
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleThumbnailUpload} />
        </div>
      </div>

      {/* 카카오톡 프리뷰 UI */}
      <div style={{ padding: '24px', backgroundColor: '#b2c7d9', borderRadius: '12px' }}>
        <div style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '12px', textAlign: 'center', opacity: 0.8 }}>카카오톡 공유 미리보기</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* 가상 프로필 */}
          <div style={{ width: '36px', height: '36px', borderRadius: '14px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#999' }}>나</span>
          </div>
          
          {/* 말풍선 */}
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px 12px 12px 12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.8rem', padding: '12px 14px', lineHeight: '1.4', color: '#333' }}>
              모바일 청첩장이 도착했습니다.
            </div>
            
            <div 
              style={{ 
                width: '100%', paddingBottom: '50%', backgroundColor: '#f0f0f0', 
                backgroundImage: currentThumbnail ? `url(${currentThumbnail})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center'
              }}
            />
            
            <div style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {shareInfo.title || '공유 제목'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {shareInfo.description || '공유 문구'}
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #f0f0f0', display: 'flex' }}>
              <div style={{ flex: 1, padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#333', borderRight: '1px solid #f0f0f0' }}>청첩장 보기</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step12Share;
