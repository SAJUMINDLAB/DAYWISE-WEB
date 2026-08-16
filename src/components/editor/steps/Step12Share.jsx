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
        <div style={{ marginTop: '12px', padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#333' }}>
          <div style={{ fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>※ 카카오톡 공유 미리보기 안내</div>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6', color: '#475569' }}>
            <li style={{ marginBottom: '6px' }}><strong>권장 사이즈:</strong> 미리보기 사진은 1:1 비율(정사각형)일 때 가장 예쁘게 노출됩니다.</li>
            <li>
              <strong>변경사항 반영 안내:</strong> 청첩장 내 <strong>[카카오톡 공유하기]</strong> 버튼을 누르시면 수정한 사진과 문구가 즉각 반영됩니다.<br/>
              단, 주소를 <strong>'직접 복사'</strong>하여 전송하실 경우 카카오톡 자체 캐시(기억) 기능으로 인해 일시적으로 이전 사진이 뜰 수 있습니다.<br/>
              <span style={{ color: '#0284c7', fontWeight: 'bold' }}>👉 따라서 사진이나 문구를 변경하신 직후에는 가급적 [카카오톡 공유하기] 버튼을 이용하시는 것을 권장합니다!</span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>공유 제목</div>
        <input 
          value={shareInfo.title}
          onChange={(e) => updateShareInfo('title', e.target.value)}
          placeholder="예: 신랑 ♥ 신부 결혼합니다"
          style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>공유 설명문구</div>
        <textarea 
          value={shareInfo.description}
          onChange={(e) => updateShareInfo('description', e.target.value)}
          placeholder="예: 2026년 11월 14일&#10;두 사람이 하나 되는 날"
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
        <div style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '12px', textAlign: 'center', opacity: 0.8 }}>공유 미리보기</div>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          
          {/* 1. 카카오톡 공유하기 버튼 클릭 시 */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#191919', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <MessageCircle size={14} strokeWidth={2.5} /> 카카오톡 공유
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '14px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.7rem', color: '#999' }}>나</span>
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px 12px 12px 12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e5e5' }}>
                <div style={{ width: '100%', paddingBottom: '100%', backgroundColor: '#f0f0f0', backgroundImage: currentThumbnail ? `url(${currentThumbnail})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid #f2f2f2' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#111', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.4' }}>{shareInfo.title || '신랑 ♥ 신부 결혼합니다'}</div>
                  <div style={{ fontSize: '12px', color: '#8E8E8E', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-all' }}>{shareInfo.description || '2026년 11월 14일\n두 사람이 하나 되는 날'}</div>
                </div>
                <div style={{ padding: '0 12px 12px 12px' }}>
                  <div style={{ width: '100%', padding: '10px 0', backgroundColor: '#F6F6F6', borderRadius: '6px', textAlign: 'center', fontSize: '12px', color: '#111' }}>모바일 청첩장 보기</div>
                </div>
                <div style={{ padding: '8px 12px', borderTop: '1px solid #f2f2f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundImage: 'url(/favicon.svg)', backgroundSize: 'cover', opacity: 0.5 }} /><span style={{ fontSize: '11px', color: '#8E8E8E' }}>데이와이즈</span></div>
                  <span style={{ fontSize: '11px', color: '#b3b3b3' }}>&gt;</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 주소 직접 복사 시 */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', color: '#333', border: '1px solid #d1d5db', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <LinkIcon size={14} color="#666" strokeWidth={2.5} /> 링크 복사
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '14px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.7rem', color: '#999' }}>나</span>
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px 12px 12px 12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e5e5' }}>
                <div style={{ width: '100%', paddingBottom: '50%', backgroundColor: '#f0f0f0', backgroundImage: currentThumbnail ? `url(${currentThumbnail})` : 'none', backgroundSize: 'cover', backgroundPosition: 'top', borderBottom: '1px solid #f2f2f2' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#111', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.4' }}>{shareInfo.title || '신랑 ♥ 신부 결혼합니다'}</div>
                  <div style={{ fontSize: '12px', color: '#8E8E8E', marginBottom: '8px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-all' }}>{shareInfo.description || '2026년 11월 14일\n두 사람이 하나 되는 날'}</div>
                  <div style={{ fontSize: '12px', color: '#3b82f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>www.daywise.kr</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showCropper && cropFile && (
        <SimpleCropper 
          imageFile={cropFile} 
          aspectRatio={1} // 1:1 ratio for Kakao Share
          showKakaoSafeZone={true}
          onCropComplete={handleCropComplete} 
          onCancel={handleCropCancel} 
        />
      )}

    </div>
  );
};

export default Step12Share;
