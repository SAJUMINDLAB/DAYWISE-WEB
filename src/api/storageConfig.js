/**
 * Supabase Storage 업로드 공통 설정
 *
 * 왜 1년인가?
 * - 업로드 파일명은 항상 `랜덤문자_타임스탬프.확장자`로 새로 만들어지므로
 *   같은 URL의 내용이 바뀌는 일이 없다 (사진을 교체하면 URL 자체가 바뀜).
 * - 따라서 브라우저/CDN이 오래 기억해도 '옛날 사진이 보이는' 문제가 생기지 않는다.
 * - 이전 값(3600초=1시간)은 하객 재방문 때마다 재다운로드를 유발해
 *   무료 플랜 Cached Egress 한도(5GB)를 270% 초과시킨 원인이었다.
 */
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

// supabase-js의 cacheControl 옵션은 문자열(초 단위)을 받는다.
export const STORAGE_CACHE_SECONDS = String(ONE_YEAR_IN_SECONDS);
