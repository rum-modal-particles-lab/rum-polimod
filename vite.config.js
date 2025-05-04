import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rum-polimod/',
  plugins: [react()],
  server: {
    hmr: false // Disables HMR overlay in the browser
  }
});
