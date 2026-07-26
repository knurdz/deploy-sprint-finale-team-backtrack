import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'process.env.FEATURE_SHOW_INSIGHTS': JSON.stringify(
      process.env.FEATURE_SHOW_INSIGHTS || process.env.VITE_FEATURE_SHOW_INSIGHTS || 'false'
    ),
  },
});
