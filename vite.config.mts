import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'HIVEGAMES_',
  resolve: {
    alias: {
      '@': '/src',
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@layout': '/src/layout',
      '@pages': '/src/pages',
      '@customTypes': '/src/types',
      '@utils': '/src/utils',
    },
  },
  //Required for ngrok
  server: {
    //allowedHosts: true,
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: process.env.HIVEGAMES_BACKEND,
    //     changeOrigin: true,
    //     secure: false,
    //     cookieDomainRewrite: {
    //         '*': '',
    //     },
    //   },
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: [...configDefaults.include],
  }
});
