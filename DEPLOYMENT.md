# 카페24 서버 배포 가이드

## 배포 전 확인 사항

### 1. 빌드
```bash
npm run build
```

### 2. 배포할 파일
`dist/` 폴더의 모든 내용을 카페24 서버의 `/myportfolio/` 경로에 업로드하세요.

**중요 파일:**
- `index.html` - 메인 HTML 파일
- `.htaccess` - 서버 라우팅 설정 (React Router를 위한 필수 파일)
- `assets/` - CSS, JS 파일
- `images/` - 이미지 파일
- `favicon.svg` - 파비콘

### 3. 서버 경로 설정

카페24 서버에서 포트폴리오는 `/myportfolio/` 경로에 배포되어야 합니다.

**올바른 URL:**
- 메인: `https://jjw0144.mycafe24.com/myportfolio/`
- DevLog: `https://jjw0144.mycafe24.com/myportfolio/devlog`
- DevLog 작성: `https://jjw0144.mycafe24.com/myportfolio/devlog/write`

**잘못된 URL (404 에러 발생):**
- `https://jjw0144.mycafe24.com/devlog/write` ❌

### 4. .htaccess 파일 확인

`.htaccess` 파일이 `dist/` 폴더에 포함되어 있는지 확인하세요. 이 파일이 없으면 React Router의 클라이언트 사이드 라우팅이 작동하지 않습니다.

### 5. Firebase 설정

`.env` 파일의 Firebase 설정 정보가 올바른지 확인하세요. 배포 서버에서는 환경 변수를 직접 설정할 수 없으므로, Firebase Console에서 Authorized domains에 `jjw0144.mycafe24.com`을 추가해야 합니다.

### 6. 파일 업로드 후 확인

1. 메인 페이지 접속: `https://jjw0144.mycafe24.com/myportfolio/`
2. 각 페이지 접속 확인:
   - `/myportfolio/portfolio`
   - `/myportfolio/devlog`
   - `/myportfolio/devlog/write`
   - `/myportfolio/guestbook`
   - `/myportfolio/about`

### 7. 문제 해결

**404 에러가 발생하는 경우:**
1. `.htaccess` 파일이 서버에 업로드되었는지 확인
2. 카페24 서버에서 `.htaccess` 파일 사용이 허용되는지 확인
3. URL이 `/myportfolio/`로 시작하는지 확인

**Firebase 에러가 발생하는 경우:**
1. Firebase Console > Authentication > Settings > Authorized domains에 도메인 추가
2. Firestore 보안 규칙 확인
3. 브라우저 콘솔에서 에러 메시지 확인

