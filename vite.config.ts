import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Deploying to root of pedaconnect.com
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});