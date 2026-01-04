// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import solid from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 세션 쿠키 처리를 위해 SSR 모드 활성화가 필수입니다.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [solid()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // '/api'로 시작하는 모든 요청을 가로챕니다.
        '/api': {
          target: 'http://127.0.0.1:3000', // localhost 대신 명시적 IPv4 사용
          changeOrigin: true,
          secure: false, // 로컬 개발 환경이므로 false
          // 프록시 작동 여부를 터미널에 출력합니다.
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('[Proxy Error]', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log(`[Proxy Request] ${req.method} ${req.url} -> http://127.0.0.1:3000`);
            });
          },
        }
      }
    }
  }
});