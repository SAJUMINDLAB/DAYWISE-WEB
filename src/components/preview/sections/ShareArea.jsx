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
  const customUrl = useBuilderStore(state => state.customUrl);
  const currentInvitationId = useBuilderStore(state => state.currentInvitationId);
  const { share } = useKakaoShare();

  // 공유용 뷰어 URL 생성: 커스텀 URL이 있으면 /view/커스텀, 없으면 /v/초대장ID
  const getViewerUrl = () => {
    // 이미 뷰어 페이지(/v/ 또는 /view/)에 있다면 현재 URL에서 파라미터(?t=...)를 제거하고 반환
    if (window.location.pathname.startsWith('/v/') || window.location.pathname.startsWith('/view/')) {
      return window.location.origin + window.location.pathname;
    }
    // 에디터 페이지에서 공유하는 경우: 올바른 뷰어 URL 생성
    const origin = window.location.origin;
    if (customUrl) {
      return `${origin}/view/${customUrl}`;
    }
    if (currentInvitationId) {
      return `${origin}/v/${currentInvitationId}`;
    }
    // fallback
    return window.location.href;
  };

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: `60px 20px ${selectedTemplate === 'cinematic' ? 'calc(20px + 8vh)' : '20px'} 20px`, backgroundColor: theme.bg }}>
        <div style={{ display: 'flex', width: '100%', gap: '12px' }}>
          <button 
            onClick={() => {
              const title = shareInfo.title || `${mainInfo.groomNameKo} ♥ ${mainInfo.brideNameKo} 결혼합니다`;
              const description = shareInfo.description || '두 사람이 하나 되는 날';
              const imageUrl = shareInfo.thumbnailUrl || mainInfo.mainImage;
              const viewerUrl = getViewerUrl();

              share({ url: viewerUrl, title, description, imageUrl });
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
              const viewerUrl = getViewerUrl();
              navigator.clipboard.writeText(viewerUrl);
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
