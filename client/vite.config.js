import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'development' ? '/' : './', // Ensure correct base path
  server: {
    proxy: mode === 'development' ? {  // Proxy only in development
      '/api': {
        target: 'https://alqadriblog-1.onrender.com',
        secure: false,
        changeOrigin: true,
      }
    } : {}
  },
  build: {
    outDir: 'dist',  // Ensure correct output directory for deployment
    sourcemap: true,  // Helpful for debugging production errors
  },
  esbuildOptions: {
    target: 'esnext',  // Ensure compatibility with modern browsers
  }
}));
