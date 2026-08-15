import { useCallback } from 'react';

const KAKAO_KEY = '0dd90f0dea818aac4e6a7ae924cc5306';
const PRODUCTION_DOMAIN = 'https://daywise.kr';
const DEFAULT_IMAGE = `${PRODUCTION_DOMAIN}/images/default_og_image.jpg`;

/**
 * 카카오톡 공유 기능을 제공하는 커스텀 훅
 * sendDefault(feed) 방식을 사용하여 제목, 설명, 이미지, 버튼까지 커스텀 가능
 */
export const useKakaoShare = () => {
  const share = useCallback(({ url, title, description, imageUrl }) => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러올 수 없습니다. 광고 차단 확장프로그램을 확인해주세요.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }

    try {
      // 어떤 환경(테스트 도메인)에서 테스트하더라도 카카오에 등록된 공식 도메인으로 강제 고정
      const urlObj = new URL(url, PRODUCTION_DOMAIN);
      urlObj.hostname = 'daywise.kr';
      urlObj.protocol = 'https:';
      urlObj.port = ''; // 포트 번호를 명시적으로 제거해야 카카오가 오류 없이 인식합니다.
      const safeShareUrl = urlObj.toString();

      // 이미지 URL 안전하게 처리 (blob/data URL은 카카오가 못 읽으므로 기본 이미지 사용)
      let safeImageUrl = imageUrl || DEFAULT_IMAGE;
      if (safeImageUrl.startsWith('data:') || safeImageUrl.startsWith('blob:')) {
        safeImageUrl = DEFAULT_IMAGE;
      }
      if (safeImageUrl.startsWith('/')) {
        safeImageUrl = `${PRODUCTION_DOMAIN}${safeImageUrl}`;
      }

      // sendDefault(feed) 방식: 제목, 설명, 이미지, 버튼까지 예쁘게 커스텀 가능
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title || '저희 결혼합니다',
          description: description || '소중한 분들을 초대합니다',
          imageUrl: safeImageUrl,
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
    } catch (e) {
      alert('Kakao Error: ' + e.message);
      console.error('카카오 공유 실패:', e);
    }
  }, []);

  return { share };
};
