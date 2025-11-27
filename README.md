# my-portfolio

Jiwon's Interactive Universe

감성을 코드로 번역하는 웹 크리에이터, 정지원의 포트폴리오 웹사이트입니다.

## ✨ 특징

- 🌌 **갤럭시 테마**: 몽환적이고 부드러운 디자인
- 🎨 **인터랙티브 UI**: Framer Motion과 GSAP을 활용한 애니메이션
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- 🌓 **다크 모드**: 라이트/다크 모드 전환 지원
- 🎭 **프로젝트 포트폴리오**: Swiper를 활용한 이미지 갤러리
- 📝 **DevLog**: 개발 일지 작성 및 관리
- 💬 **방명록**: 방문자 메시지 기능
- 👤 **About**: 자기소개 및 스킬 소개

## 🚀 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: CSS3, Glassmorphism
- **Animation**: Framer Motion, GSAP
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Image Slider**: Swiper

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
my-portfolio/
├── public/
│   └── images/
│       └── projects/     # 프로젝트 이미지
├── src/
│   ├── components/       # 재사용 컴포넌트
│   ├── data/            # 데이터 파일
│   ├── layout/          # 레이아웃 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   ├── theme/           # 테마 설정
│   └── utils/           # 유틸리티 함수
└── dist/                # 빌드 결과물
```

## 🌐 배포

이 프로젝트는 `/my-portfolio/` 서브 경로에서 배포되도록 설정되어 있습니다.

- `vite.config.ts`에서 `base: '/my-portfolio/'` 설정
- `package.json`에서 `homepage: "/my-portfolio"` 설정
- `main.tsx`에서 `BrowserRouter basename="/my-portfolio"` 설정

## 📄 라이선스

MIT License

---

Made with 💜 by Jiwon
