import { useCallback } from 'react';

const KAKAO_KEY = '0dd90f0dea818aac4e6a7ae924cc5306';
const PRODUCTION_DOMAIN = 'https://daywise-web-six.vercel.app';

export const useKakaoShare = () => {
  const share = useCallback((shareUrl) => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY); 
      }
      try {
        // shareUrl도 localhost일 경우 Vercel 도메인으로 강제 치환
        const safeShareUrl = shareUrl.replace(/http:\/\/localhost:\d+/, PRODUCTION_DOMAIN);

        window.Kakao.Share.sendScrap({
          requestUrl: safeShareUrl
        });
      } catch (e) {
        alert('Kakao Error: ' + e.message);
        console.error('카카오 공유 실패, 기본 공유로 대체합니다.', e);
      }
    } else {
      alert('window.Kakao is undefined! Check if adblocker is active.');
    }
  }, []);

  return { share };
};
