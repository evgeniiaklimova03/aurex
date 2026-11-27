import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Сайт публикуется на GitHub Pages по адресу /aurex/
  base: '/aurex/',
  plugins: [react()],
})
