import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  const rawBase = env.VITE_PUBLIC_BASE ?? '/Vib3--blog-2/';
  const normalizedBase = rawBase === './'
    ? './'
    : rawBase.endsWith('/')
      ? rawBase
      : `${rawBase}/`;

  return {
    // Base path is configurable for both GitHub Pages (repository root) and docs/ branch hosting.
    base: normalizedBase,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
