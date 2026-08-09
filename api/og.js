import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { id } = req.query;

  let title = '모바일 청첩장';
  let description = '저희 결혼합니다. 소중한 분들을 초대합니다.';
  let imageUrl = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';

  if (id) {
    try {
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data } = await supabase.from('invitations').select('content').eq('id', id).single();

        if (data && data.content) {
          const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
          if (content.shareInfo) {
            title = content.shareInfo.title || title;
            description = content.shareInfo.description || description;
            if (content.shareInfo.thumbnailUrl) imageUrl = content.shareInfo.thumbnailUrl;
            else if (content.mainInfo && content.mainInfo.mainImage) imageUrl = content.mainInfo.mainImage;
          }
        }
      }
    } catch (e) {
      console.error('OG error:', e);
    }
  }

  const html = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <title>${title}</title>
  </head>
  <body></body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).send(html);
}
