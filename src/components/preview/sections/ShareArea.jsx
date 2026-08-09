import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { useKakaoShare } from '../../../hooks/useKakaoShare';
import FadeUp from '../FadeUp';
import { MessageCircle, Link as LinkIcon } from 'lucide-react';

const ShareArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const { share } = useKakaoShare();

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', backgroundColor: theme.bg, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => {
              try {
                share(window.location.href);
              } catch (e) {
                // 카카오 SDK 실패 시 스마트폰 기본 공유 기능으로 대체
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
                  alert('카카오톡 공유를 지원하지 않는 브라우저입니다.');
                }
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
