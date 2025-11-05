import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // String syntax: '/api' will be proxied to 'http://localhost:8000/api'
      '/api': {
        target: 'http://localhost:8000', // Your backend server
        changeOrigin: true,
        secure: false, // Optional: if you are using http
        // Optional: rewrite path, but you don't need it since
        // your API_URL already starts with /api
        // rewrite: (path) => path.replace(/^\/api/, '') 
      },
    },
  },
})
