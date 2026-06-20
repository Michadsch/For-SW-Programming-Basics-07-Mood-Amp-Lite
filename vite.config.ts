import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/For-SW-Programming-Basics-07-Mood-Amp-Lite/',
  plugins: [react(), tailwindcss()],
})


