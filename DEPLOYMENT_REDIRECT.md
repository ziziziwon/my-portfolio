# 카페24 서버 리다이렉트 설정 가이드

## 문제
`https://jjw0144.mycafe24.com/devlog/write` 경로로 접근했을 때 404 에러가 발생합니다.

## 해결 방법

`.htaccess` 파일이 작동하지 않는 경우, JavaScript 리다이렉트 HTML 파일을 사용할 수 있습니다.

## 설정 방법

### 방법 1: JavaScript 리다이렉트 HTML 파일 사용 (권장)

1. **빌드된 파일 확인**
   - `dist/devlog/write/index.html` 파일이 생성되었는지 확인

2. **카페24 서버에 업로드**
   - `dist/devlog/write/index.html` 파일을 카페24 서버의 `/www/devlog/write/index.html`에 업로드
   - `dist/devlog/index.html` 파일을 `/www/devlog/index.html`에 업로드
   - `dist/portfolio/index.html` 파일을 `/www/portfolio/index.html`에 업로드
   - `dist/guestbook/index.html` 파일을 `/www/guestbook/index.html`에 업로드
   - `dist/about/index.html` 파일을 `/www/about/index.html`에 업로드

3. **작동 확인**
   - `https://jjw0144.mycafe24.com/devlog/write` 접근 시 자동으로 `/myportfolio/devlog/write`로 리다이렉트됩니다.

### 방법 2: .htaccess 파일 사용

1. **파일 준비**
   - `public/.htaccess.root.simple` 파일의 내용을 복사

2. **카페24 서버에 업로드**
   - 카페24 서버의 루트 디렉토리(`/www/`)에 `.htaccess` 파일로 업로드

3. **파일 내용**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # /devlog로 시작하는 모든 경로를 /myportfolio/devlog로 리다이렉트
  RewriteRule ^devlog(/.*)?$ /myportfolio/devlog$1 [R=301,L]
  
  # /portfolio로 시작하는 모든 경로를 /myportfolio/portfolio로 리다이렉트
  RewriteRule ^portfolio(/.*)?$ /myportfolio/portfolio$1 [R=301,L]
  
  # /guestbook으로 시작하는 모든 경로를 /myportfolio/guestbook로 리다이렉트
  RewriteRule ^guestbook(/.*)?$ /myportfolio/guestbook$1 [R=301,L]
  
  # /about으로 시작하는 모든 경로를 /myportfolio/about로 리다이렉트
  RewriteRule ^about(/.*)?$ /myportfolio/about$1 [R=301,L]
</IfModule>
```

## 파일 구조

```
/www/
├── .htaccess (선택사항 - 방법 2 사용 시)
├── devlog/
│   ├── index.html (리다이렉트 파일)
│   └── write/
│       └── index.html (리다이렉트 파일)
├── portfolio/
│   └── index.html (리다이렉트 파일)
├── guestbook/
│   └── index.html (리다이렉트 파일)
├── about/
│   └── index.html (리다이렉트 파일)
└── myportfolio/
    └── (포트폴리오 파일들)
```

## 주의사항

1. **파일 권한**: HTML 파일의 권한이 올바른지 확인하세요 (일반적으로 644).
2. **디렉토리 생성**: `/www/devlog/write/` 같은 디렉토리가 없으면 먼저 생성해야 합니다.
3. **기존 파일**: 기존에 같은 경로에 파일이 있다면 백업 후 교체하세요.

