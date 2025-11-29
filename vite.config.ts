import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 루트 경로로 빌드하여 두 가지 경로 모두 지원
  // basename은 런타임에 동적으로 감지됨 (main.tsx 참조)
  base: '/',
})
