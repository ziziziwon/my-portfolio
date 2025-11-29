import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 개발/프로덕션 모두 /myportfolio/로 설정 (일관성 유지)
  // basename은 런타임에 동적으로 감지되어 두 경로 모두 지원 (main.tsx 참조)
  base: '/myportfolio/',
})
