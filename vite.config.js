import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/https://github.com/irvanfalasifa/irvanfalasifa.github.io/', // Ganti 'porto-web' dengan nama repository GitHub kamu nantinya
})