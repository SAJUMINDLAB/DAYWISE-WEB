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
        // 어떤 환경(테스트 도메인 등)에서 테스트하더라도 카카오에 등록된 정식 도메인으로 강제 고정
        const urlObj = new URL(shareUrl, PRODUCTION_DOMAIN);
        urlObj.hostname = 'daywise-web-six.vercel.app';
        urlObj.protocol = 'https:';
        // 카카오 스크랩 캐시를 우회하기 위해 (쿼리파라미터를 무시하므로) 무의미한 쿼리 파라미터라도 일단 붙여둠
        const safeShareUrl = urlObj.toString();

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
