import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 800,

    // Multi-page build. Each HTML entry gets the correct hashed JS
    // bundle injected at build time and ships its own static <head>
    // meta — so social crawlers see per-route titles/OG tags without
    // executing any JavaScript. All entries share the same app bundle.
    rollupOptions: {
      input: {
        main:             resolve(__dirname, 'index.html'),
        autismConsulting: resolve(__dirname, 'autism-consulting.html'),
      },
    },
  },
});
