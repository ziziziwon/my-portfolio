# PHP 리다이렉트 파일 사용 가이드

## .htaccess 없이 리다이렉트하기

카페24에서 `.htaccess` 파일이 작동하지 않거나 사용할 수 없는 경우, PHP 파일을 사용하여 리다이렉트할 수 있습니다.

## 배포 방법

### 1. PHP 파일 업로드 위치

**루트 디렉토리(`/www/`)**에 다음 디렉토리와 파일을 생성하세요:

```
/www/
├── devlog/
│   ├── index.php          ← 여기에 업로드
│   └── write/
│       └── index.php      ← 여기에 업로드
├── portfolio/
│   └── index.php          ← 여기에 업로드
├── guestbook/
│   └── index.php          ← 여기에 업로드
└── about/
    └── index.php          ← 여기에 업로드
```

### 2. 파일 업로드

`dist/` 폴더에서 다음 파일들을 카페24 서버의 루트 디렉토리에 업로드:

- `dist/devlog/index.php` → `/www/devlog/index.php`
- `dist/devlog/write/index.php` → `/www/devlog/write/index.php`
- `dist/portfolio/index.php` → `/www/portfolio/index.php`
- `dist/guestbook/index.php` → `/www/guestbook/index.php`
- `dist/about/index.php` → `/www/about/index.php`

### 3. 작동 확인

업로드 후 다음 URL로 접근해보세요:
- `https://jjw0144.mycafe24.com/devlog/write` → 자동으로 `/myportfolio/devlog/write`로 리다이렉트됩니다.

## PHP 파일 내용

각 PHP 파일은 다음과 같은 간단한 리다이렉트 코드를 포함합니다:

```php
<?php
header('Location: /myportfolio/devlog/write');
exit;
?>
```

## 장점

- ✅ `.htaccess` 파일이 필요 없음
- ✅ 카페24에서 PHP는 기본적으로 지원됨
- ✅ 서버 설정 변경 불필요
- ✅ 즉시 작동

## 주의사항

- PHP 파일은 반드시 루트 디렉토리(`/www/`)에 있어야 합니다
- `/www/myportfolio/` 안에 있으면 작동하지 않습니다
- 파일 권한은 644로 설정하세요

