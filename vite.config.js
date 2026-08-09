import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

/**
 * ★ 카카오톡 인앱 브라우저 호환성 핵심 플러그인
 * Vite가 빌드 시 자동 주입하는 <link rel="stylesheet"> 태그를
 * 비동기(non-blocking)로 변환하여, CSS 로딩이 지연되어도
 * HTML body가 즉시 렌더링되도록 합니다.
 */
function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Vite가 주입한 빌드된 CSS 링크만 non-blocking으로 변환
      // (구글 폰트 링크는 이미 media="print"이므로 영향 없음)
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'">'
      )
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nonBlockingCss(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Android >= 5', 'iOS >= 9'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    target: 'es2015',
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('zustand') || id.includes('react-router')) {
              return 'vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            if (id.includes('@hello-pangea/dnd')) {
              return 'dnd';
            }
            return 'modules';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
