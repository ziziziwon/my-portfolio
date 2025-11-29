# 카페24 서버 루트 디렉토리 .htaccess 설정 가이드

## 문제
`https://jjw0144.mycafe24.com/devlog/write` 경로로 접근했을 때 404 에러가 발생합니다.

## 해결 방법

카페24 서버의 **루트 디렉토리(`/www/`)**에 `.htaccess` 파일을 추가하여 `/devlog`, `/portfolio`, `/guestbook`, `/about` 경로를 자동으로 `/myportfolio/`로 리다이렉트합니다.

## 설정 방법

### 1. 파일 준비
`public/.htaccess.root` 파일의 내용을 복사하거나, 해당 파일을 사용하세요.

### 2. 카페24 서버에 업로드
1. FileZilla 또는 FTP 클라이언트로 카페24 서버에 연결
2. 루트 디렉토리(`/www/`)로 이동
3. `public/.htaccess.root` 파일을 `/www/.htaccess`로 업로드
   - **주의**: 기존 `.htaccess` 파일이 있다면 백업 후 내용을 병합하세요

### 3. 파일 내용

**최신 버전 (권장):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # /devlog로 시작하는 모든 경로를 /myportfolio/devlog로 리다이렉트
  RewriteCond %{REQUEST_URI} ^/devlog
  RewriteRule ^devlog(/.*)?$ /myportfolio/devlog$1 [R=301,L]
  
  # /portfolio로 시작하는 모든 경로를 /myportfolio/portfolio로 리다이렉트
  RewriteCond %{REQUEST_URI} ^/portfolio
  RewriteRule ^portfolio(/.*)?$ /myportfolio/portfolio$1 [R=301,L]
  
  # /guestbook으로 시작하는 모든 경로를 /myportfolio/guestbook로 리다이렉트
  RewriteCond %{REQUEST_URI} ^/guestbook
  RewriteRule ^guestbook(/.*)?$ /myportfolio/guestbook$1 [R=301,L]
  
  # /about으로 시작하는 모든 경로를 /myportfolio/about로 리다이렉트
  RewriteCond %{REQUEST_URI} ^/about
  RewriteRule ^about(/.*)?$ /myportfolio/about$1 [R=301,L]
</IfModule>
```

**간단 버전:**

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

### 4. 작동 확인

업로드 후 다음 URL로 접근해보세요:
- `https://jjw0144.mycafe24.com/devlog/write` → 자동으로 `/myportfolio/devlog/write`로 리다이렉트
- `https://jjw0144.mycafe24.com/portfolio` → 자동으로 `/myportfolio/portfolio`로 리다이렉트
- `https://jjw0144.mycafe24.com/guestbook` → 자동으로 `/myportfolio/guestbook`로 리다이렉트
- `https://jjw0144.mycafe24.com/about` → 자동으로 `/myportfolio/about`로 리다이렉트

## 주의사항

1. **기존 .htaccess 파일**: 루트 디렉토리에 이미 `.htaccess` 파일이 있다면, 기존 내용을 유지하면서 위 규칙을 추가해야 합니다.
2. **파일 권한**: `.htaccess` 파일의 권한이 올바른지 확인하세요 (일반적으로 644 또는 755).
3. **서버 설정**: 카페24 서버에서 `.htaccess` 파일 사용이 허용되어 있는지 확인하세요.

