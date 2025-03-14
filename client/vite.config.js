import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Ensure correct asset base path (use '/' for absolute paths in deployment)
  base: mode === 'development' ? '/' : '/',

  server: {
    port: 5173, // Ensure Vite runs on a consistent port
    proxy: mode === 'development' ? {
      '/api': {
        target: 'https://alqadriblog-1.onrender.com',
        secure: false,
        changeOrigin: true,
      }
    } : undefined,
  },

  resolve: {
    alias: {
      '@': '/src', // Allows using '@' as a shorthand for '/src'
    }
  },

  build: {
    outDir: 'dist', // Ensure correct output directory for Render deployment
    sourcemap: true, // Enable source maps for easier debugging
    target: 'esnext', // Ensure compatibility with modern browsers
  }
}));

