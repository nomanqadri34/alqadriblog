import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
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
  }
}));
