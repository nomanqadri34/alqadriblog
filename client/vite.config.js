import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'development' ? '/' : '/', // Ensure base is correct for Vercel
  server: {
    proxy: mode === 'development' ? {  
      '/api': {
        target: 'https://alqadriblog-1.onrender.com/',
        changeOrigin: true,
        secure: false,
      }
    } : {},
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 1000, // Increase chunk limit
  }
}));
