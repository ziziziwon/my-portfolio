# 리다이렉트 파일 업로드 위치 수정

## 문제
리다이렉트 HTML 파일들이 `/www/myportfolio/` 안에 업로드되어 있어서 `/devlog/write`로 접근할 수 없습니다.

## 해결 방법

리다이렉트 파일들을 **루트 디렉토리(`/www/`)**에 업로드해야 합니다.

### 올바른 업로드 위치

1. **`dist/devlog/write/index.html`** → `/www/devlog/write/index.html` (루트 디렉토리)
2. **`dist/devlog/index.html`** → `/www/devlog/index.html` (루트 디렉토리)
3. **`dist/portfolio/index.html`** → `/www/portfolio/index.html` (루트 디렉토리)
4. **`dist/guestbook/index.html`** → `/www/guestbook/index.html` (루트 디렉토리)
5. **`dist/about/index.html`** → `/www/about/index.html` (루트 디렉토리)

### FileZilla 업로드 방법

1. FileZilla로 카페24 서버에 연결
2. **루트 디렉토리(`/www/`)**로 이동 (현재 `/www/myportfolio/`가 아닌 `/www/`로 이동)
3. 필요한 디렉토리 생성:
   - `/www/devlog/write/` (없으면 생성)
   - `/www/devlog/` (없으면 생성)
   - `/www/portfolio/` (없으면 생성)
   - `/www/guestbook/` (없으면 생성)
   - `/www/about/` (없으면 생성)
4. 각 `index.html` 파일을 해당 디렉토리에 업로드

### 디렉토리 구조

```
/www/                          ← 루트 디렉토리
├── devlog/
│   ├── index.html            ← 여기에 업로드
│   └── write/
│       └── index.html        ← 여기에 업로드
├── portfolio/
│   └── index.html            ← 여기에 업로드
├── guestbook/
│   └── index.html            ← 여기에 업로드
├── about/
│   └── index.html            ← 여기에 업로드
└── myportfolio/              ← 포트폴리오 파일들
    ├── index.html
    ├── assets/
    └── ...
```

### 중요 사항

- ❌ **잘못된 위치**: `/www/myportfolio/devlog/write/index.html`
- ✅ **올바른 위치**: `/www/devlog/write/index.html`

리다이렉트 파일들은 반드시 루트 디렉토리에 있어야 합니다!

