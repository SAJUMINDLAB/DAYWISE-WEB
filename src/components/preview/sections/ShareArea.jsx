import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';
import { MessageCircle, Link as LinkIcon } from 'lucide-react';

const ShareArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const mainInfo = useBuilderStore(state => state.mainInfo);

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', backgroundColor: theme.bg, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => {
              // 1. 카카오 SDK로 전용 공유창 띄우기 (권장)
              if (window.Kakao) {
                if (!window.Kakao.isInitialized()) {
                  window.Kakao.init('0dd90f0dea818aac4e6a7ae924cc5306'); 
                }
                try {
                  // 강제로 Vercel 도메인을 사용하도록 고정
                  const PRODUCTION_DOMAIN = 'https://daywise-web-six.vercel.app';
                  
                  let rawImageUrl = shareInfo.thumbnailUrl || (mainInfo.mainImageShape === 'full' ? mainInfo.mainImage : `${PRODUCTION_DOMAIN}/images/default_og_image.jpg`);
                  
                  // Kakao SDK cannot handle base64 or blob URLs. Fallback to default image.
                  if (rawImageUrl && (rawImageUrl.startsWith('data:') || rawImageUrl.startsWith('blob:'))) {
                    rawImageUrl = `${PRODUCTION_DOMAIN}/images/default_og_image.jpg`;
                  }

                  const absoluteImageUrl = (rawImageUrl && rawImageUrl.startsWith('/')) 
                    ? `${PRODUCTION_DOMAIN}${rawImageUrl}` 
                    : rawImageUrl;

                  const safeShareUrl = window.location.href.replace(/http:\/\/localhost:\d+/, PRODUCTION_DOMAIN);
                  const safeTitle = shareInfo.title || '저희 결혼합니다';
                  const safeDescription = shareInfo.description || '소중한 분들을 초대합니다';

                  window.Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                      title: safeTitle,
                      description: safeDescription,
                      imageUrl: absoluteImageUrl,
                      link: {
                        mobileWebUrl: safeShareUrl,
                        webUrl: safeShareUrl,
                      },
                    },
                    buttons: [
                      {
                        title: '모바일 청첩장 보기',
                        link: {
                          mobileWebUrl: safeShareUrl,
                          webUrl: safeShareUrl,
                        },
                      },
                    ],
                  });
                  return;
                } catch (e) {
                  console.error('카카오 공유 실패, 기본 공유로 대체합니다.', e);
                }
              }

              // 2. 카카오 SDK가 없거나 실패한 경우 스마트폰 기본 공유 기능으로 대체
              if (navigator.share) {
                try {
                  navigator.share({
                    title: shareInfo.title,
                    text: shareInfo.description,
                    url: window.location.href,
                  });
                } catch (error) {
                  console.log('공유 취소 또는 오류:', error);
                }
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('초대장 링크가 복사되었습니다.\n원하시는 곳에 붙여넣기(Ctrl+V) 하세요.');
              }
            }}
            style={{ width: '100%', padding: '16px', backgroundColor: '#FAE100', color: '#371D1E', border: 'none', borderRadius: '12px', fontSize: 'calc(1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-kr-sans)' }}
          >
            <MessageCircle size={20} color="#371D1E" />
            카카오톡으로 공유하기
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('초대장 링크가 복사되었습니다.\n원하시는 곳에 붙여넣기(Ctrl+V) 하세요.');
            }}
            style={{ width: '100%', padding: '16px', backgroundColor: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '12px', fontSize: 'calc(1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-kr-sans)' }}
          >
            <LinkIcon size={20} color="#333" />
            초대장 링크 복사하기
          </button>
        </div>
      </div>
    </FadeUp>
  );
};

export default ShareArea;
