import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://orange-dollop-7vxx76949gj4cwxxp-3000.app.github.dev',
        changeOrigin: true
      }
    }
  }
})
