import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // /myportfolio/로 빌드 (카페24 서버 배포 구조에 맞춤)
  // basename은 런타임에 동적으로 감지되어 두 경로 모두 지원 (main.tsx 참조)
  base: '/myportfolio/',
})
