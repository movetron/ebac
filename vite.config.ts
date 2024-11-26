import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Не использует минификаторы
    terserOptions: undefined, // Убирает любые настройки terser
  },
})



