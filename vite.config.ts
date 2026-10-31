import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const PAGES_BASE = '/billgenius-ai/';

export default defineConfig(({ command }) => {
  const base =
    process.env.VITE_BASE ??
    (process.env.NETLIFY === 'true'
      ? '/'
      : command === 'build'
        ? PAGES_BASE
        : '/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
