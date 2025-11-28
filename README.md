# my-portfolio

Jiwon's Interactive Universe

감성을 코드로 번역하는 프론트엔드 웹 디자이너, 정지원입니다.

## ✨ 특징

- 🌌 **갤럭시 테마**: 몽환적이고 부드러운 디자인
- ⭐ **커스텀 커서**: 파란색 별 모양 커서로 독특한 인터랙션 경험
- 🎨 **인터랙티브 UI**: Framer Motion과 GSAP을 활용한 부드러운 애니메이션
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- 🌓 **다크 모드**: 라이트/다크 모드 전환 지원
- 🎭 **프로젝트 포트폴리오**: Swiper를 활용한 멀티 이미지 갤러리
- 📝 **DevLog**: 개발 일지 작성 및 관리
- 💬 **방명록**: 방문자 메시지 기능 (관리자 삭제 기능 포함)
- 👤 **About**: 자기소개 및 스킬 소개

## 🚀 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: CSS3, Glassmorphism
- **Animation**: Framer Motion, GSAP
- **Routing**: React Router DOM v7
- **Build Tool**: Vite 7
- **Image Slider**: Swiper 12
- **State Management**: React Hooks (useState, useEffect)

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
│       ├── profile/     # 프로필 이미지
│       └── projects/    # 프로젝트 이미지
├── src/
│   ├── components/      # 재사용 컴포넌트
│   │   ├── common/      # 공통 컴포넌트 (CustomCursor, ScrollToTop 등)
│   │   ├── home/        # 홈 페이지 컴포넌트
│   │   └── modals/      # 모달 컴포넌트
│   ├── data/            # 데이터 파일 (projects.ts 등)
│   ├── layout/          # 레이아웃 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Portfolio.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── DevLog.tsx
│   │   ├── Guestbook.tsx
│   │   └── About.tsx
│   ├── theme/           # 테마 설정
│   ├── styles.css       # 전역 스타일
│   └── index.css        # 기본 스타일
└── dist/                # 빌드 결과물
```

## 🎯 주요 기능

### ⭐ 커스텀 커서
- 파란색 별 모양 커서로 독특한 사용자 경험 제공
- 마우스를 딜레이 없이 즉시 따라가는 최적화된 성능
- 링크/버튼 호버 시 확대 효과
- 클릭 시 축소 애니메이션

### 🎭 프로젝트 포트폴리오
- Swiper를 활용한 멀티 이미지 슬라이더
- 프로젝트별 상세 페이지
- 이미지 자동 재생 및 네비게이션
- 반응형 이미지 최적화

### 💬 방명록
- 방문자 메시지 작성 및 조회
- 이름, 날짜 표시
- 관리자 비밀번호 기반 삭제 기능
- 부드러운 애니메이션 효과

## 🌐 배포

이 프로젝트는 `/myportfolio/` 서브 경로에서 배포되도록 설정되어 있습니다.

### 배포 설정
- `vite.config.ts`에서 `base: '/myportfolio/'` 설정
- `package.json`에서 `homepage: "/myportfolio"` 설정
- `main.tsx`에서 `BrowserRouter basename="/myportfolio"` 설정

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물은 dist/ 폴더에 생성됩니다
# dist/ 폴더의 내용을 서버의 /myportfolio/ 경로에 업로드하세요
```

## 📄 라이선스

MIT License

---

Made with 💜 by Jiwon
