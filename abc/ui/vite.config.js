import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    port:3008,
    proxy:{
      '/api':
      {
        target:'http://localhost:8003',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,""),  
      }
    }
  }
})
