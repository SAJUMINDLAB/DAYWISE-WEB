import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { useKakaoShare } from '../../../hooks/useKakaoShare';
import FadeUp from '../FadeUp';
import { MessageCircle, Link as LinkIcon } from 'lucide-react';

const ShareArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const { share } = useKakaoShare();

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: `60px 20px ${selectedTemplate === 'cinematic' ? 'calc(20px + 8vh)' : '20px'} 20px`, backgroundColor: theme.bg }}>
        <div style={{ display: 'flex', width: '100%', gap: '12px' }}>
          <button 
            onClick={() => {
              const title = shareInfo.title || `${mainInfo.groomNameKo} ♥ ${mainInfo.brideNameKo} 결혼합니다`;
              const description = shareInfo.description || '소중한 분들을 초대합니다';
              const imageUrl = shareInfo.thumbnailUrl || mainInfo.mainImage;

              share({ url: window.location.href, title, description, imageUrl });
            }}
            style={{ 
              flex: 1, 
              padding: '16px 0', 
              backgroundColor: '#FAE100', 
              color: '#371D1E', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: 'calc(0.9rem * var(--font-ratio))', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '6px', 
              fontFamily: 'var(--font-kr-sans)'
            }}
          >
            <MessageCircle size={18} color="#371D1E" />
            카카오톡 공유
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('초대장 링크가 복사되었습니다.\n원하시는 곳에 붙여넣기(Ctrl+V) 하세요.');
            }}
            style={{ 
              flex: 1, 
              padding: '16px 0', 
              backgroundColor: '#fff', 
              color: '#333', 
              border: '1px solid #ddd', 
              borderRadius: '12px', 
              fontSize: 'calc(0.9rem * var(--font-ratio))', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '6px', 
              fontFamily: 'var(--font-kr-sans)'
            }}
          >
            <LinkIcon size={18} color="#333" />
            링크 복사
          </button>
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: theme.text, opacity: 0.7, fontFamily: 'var(--font-en-sans)', letterSpacing: '0.05em' }}>
          &copy; DAYWISE. All rights reserved.
        </div>
      </div>
    </FadeUp>
  );
};

export default ShareArea;
