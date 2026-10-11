import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// GitHub Pages serves this project from https://poochi005.github.io/billgenius-ai/
// Production builds MUST use "/billgenius-ai/" as the base path.
// `npm run dev` keeps base "/". Override with VITE_BASE if needed.
const PAGES_BASE = '/billgenius-ai/';

export default defineConfig(({command}) => {
  return {
    base: process.env.VITE_BASE ?? (command === 'build' ? PAGES_BASE : '/'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
