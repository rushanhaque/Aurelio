import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || '5173', 10),
    open: false,
  },
  build: {
    target: 'es2019',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,            // do not ship source maps to production
    chunkSizeWarningLimit: 700,  // the gsap/motion vendor chunks are legitimately large
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'motion-vendor': ['motion'],
          'lenis-vendor': ['lenis'],
        },
      },
    },
  },
})
