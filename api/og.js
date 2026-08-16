import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // 1. 원본 index.html 가져오기 (Vercel 내부 캐시를 거치므로 빠름)
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'localhost:5173';
    
    // 로컬 개발 환경(Vite) vs Vercel 배포 환경 분기
    // 로컬에서는 5173을 쓰고, Vercel에서는 host를 씁니다.
    const baseUrl = host.includes('localhost') ? `http://${host}` : `${protocol}://${host}`;
    
    let html = '';
    try {
      // 루트 URL('/')로 요청하면 Vercel이 알아서 빌드된 최신 index.html을 반환함
      const response = await fetch(`${baseUrl}/`);
      html = await response.text();
    } catch (e) {
      console.error('Failed to fetch original HTML:', e);
      // Fallback HTML (치명적 오류 방지)
      html = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8" /></head><body><div id="root"></div></body></html>`;
    }

    // 2. Supabase에서 해당 id의 데이터 가져오기 (대소문자 무시)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (id && supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const searchId = id.toLowerCase();
      
      const { data, error } = await supabase
        .from('invitations')
        .select('data')
        .eq('id', searchId)
        .single();

      if (!error && data && data.data) {
        // 고객이 설정한 shareInfo 추출 (없으면 기본값)
        const shareInfo = data.data.shareInfo || {};
        const mainInfo = data.data.mainInfo || {};
        
        const title = shareInfo.title || '저희 결혼합니다';
        const description = shareInfo.description || '두 사람이 하나 되는 날';
        const imageUrl = shareInfo.thumbnailUrl || mainInfo.mainImage || 'https://daywise.kr/images/default_og_image.jpg';

        // 3. HTML 내의 메타 태그 교체 (바꿔치기)
        // 기존에 하드코딩된 og:title, og:description, og:image 등을 정규식으로 찾아서 치환
        html = html.replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
          `<meta property="og:title" content="${title}" />`
        );
        html = html.replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
          `<meta property="og:description" content="${description}" />`
        );
        html = html.replace(
          /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
          `<meta property="og:image" content="${imageUrl}" />`
        );
        
        // 트위터(X) 봇 대응
        html = html.replace(
          /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="twitter:title" content="${title}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="twitter:description" content="${description}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="twitter:image" content="${imageUrl}" />`
        );
        
        // <title> 태그 교체
        html = html.replace(
          /<title>.*?<\/title>/i,
          `<title>${title}</title>`
        );
      }
    }

    // 4. 완성된 HTML 반환
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 캐시 설정: 카톡 서버가 너무 자주 찌르지 않도록 60초 캐싱
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('OG Tag Proxy Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
