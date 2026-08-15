import React, { useState, useRef } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Upload, MessageCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '../../../hooks/useImageUpload';
import SimpleCropper from '../../common/SimpleCropper';

const Step12Share = () => {
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const updateShareInfo = useBuilderStore(state => state.updateShareInfo);
  const mainImage = useBuilderStore(state => state.mainInfo.mainImage);
  const fileInputRef = useRef(null);
  const { uploadImage, isUploading } = useImageUpload();
  
  const [showCropper, setShowCropper] = useState(false);
  const [cropFile, setCropFile] = useState(null);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCropFile(file);
      setShowCropper(true);
      // 리셋하여 같은 파일을 다시 선택할 수 있게 함
      e.target.value = null;
    }
  };

  const handleCropComplete = async (croppedFile) => {
    setShowCropper(false);
    setCropFile(null);
    if (croppedFile) {
      const publicUrl = await uploadImage(croppedFile, 800); // 800x800 for 1:1 Kakao format
      if (publicUrl) {
        updateShareInfo('thumbnailUrl', publicUrl);
      }
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setCropFile(null);
  };

  const currentThumbnail = shareInfo.thumbnailUrl || mainImage;

  return (
    <div style={{ padding: '10px 0' }}>
      
      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        청첩장을 전달할 때 카카오톡 말풍선에 노출될 미리보기 화면을 설정합니다.<br/>
        받는 분이 처음 보게 될 모습이니 정성스럽게 작성해 보세요.
        <div style={{ marginTop: '12px', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ff4d4f', fontSize: '0.85rem', color: '#333' }}>
          <div style={{ fontWeight: 'bold', color: '#ff4d4f', marginBottom: '8px' }}>※ 카카오톡 공유 관련 주의사항</div>
          <div style={{ marginBottom: '12px', lineHeight: '1.5' }}>
            여기서 설정한 문구와 사진은 청첩장 내 <strong>[카카오톡으로 공유하기]</strong> 버튼을 통해 전달할 때만 적용됩니다.<br/>
            주소를 <strong>직접 복사해서 붙여넣기</strong> 하시면 카카오톡 보안 정책상 아래와 같은 <strong>'기본 이미지와 기본 문구'</strong>로 노출되니 꼭 전용 버튼을 이용해 주세요.
          </div>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '6px', backgroundImage: 'url(/images/default_og_image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }}></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>모바일 청첩장</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '2px' }}>저희 결혼합니다</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>두 사람이 하나 되는 날</div>
            </div>
          </div>
        </div>
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
              disabled={isUploading}
              style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', cursor: isUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', opacity: isUploading ? 0.6 : 1 }}
            >
              <Upload size={14} /> {isUploading ? '업로드 중...' : '이미지 변경'}
            </button>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>미설정 시 메인 화면 이미지가 적용됩니다</div>
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
                width: '100%', paddingBottom: '100%', backgroundColor: '#f0f0f0', 
                backgroundImage: currentThumbnail ? `url(${currentThumbnail})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderBottom: '1px solid #f0f0f0'
              }}
            />
            
            <div style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {shareInfo.title || '동현 ❤️ 슬기 결혼합니다'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-all' }}>
                {shareInfo.description || '2026년 11월 14일\n두 사람이 하나 되는 날'}
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #f0f0f0', display: 'flex', backgroundColor: '#f9f9f9' }}>
              <div style={{ flex: 1, padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#333' }}>모바일 청첩장 보기</div>
            </div>

            {/* 하단 출처 아이콘 영역 */}
            <div style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundImage: 'url(/favicon.svg)', backgroundSize: 'cover', opacity: 0.7 }} />
                <span style={{ fontSize: '0.7rem', color: '#888' }}>데이와이즈</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#ccc' }}>&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {showCropper && cropFile && (
        <SimpleCropper 
          imageFile={cropFile} 
          aspectRatio={1} // 1:1 ratio for Kakao Share
          onCropComplete={handleCropComplete} 
          onCancel={handleCropCancel} 
        />
      )}

    </div>
  );
};

export default Step12Share;
