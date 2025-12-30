// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 'hybrid' 대신 이제 기본값인 'static'을 사용합니다.
  // 어댑터가 설정되어 있으면 static 모드 내에서도 SSR 페이지를 만들 수 있습니다.
  output: 'static',

  adapter: node({
    mode: 'standalone',
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});