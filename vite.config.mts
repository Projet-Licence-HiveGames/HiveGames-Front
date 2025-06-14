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
      '@constants': '/src/constants',
      '@context': '/src/context',
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: [...configDefaults.include],
  }
});
