import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'HIVEGAMES_',
  resolve: {
    alias: {
      '@': '/src',
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
  server: {
    port: 3000,
  },
});
