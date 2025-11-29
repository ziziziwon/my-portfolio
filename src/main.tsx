import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./index.css";
import "./styles.css";

// basename을 동적으로 감지하여 두 가지 경로 모두 지원
// /myportfolio/로 시작하면 /myportfolio, 그렇지 않으면 빈 문자열
const getBasename = () => {
  // 개발/프로덕션 환경 모두에서 현재 경로를 확인
  const pathname = window.location.pathname;
  if (pathname.startsWith('/myportfolio')) {
    return '/myportfolio';
  }
  
  // /myportfolio가 없으면 빈 문자열 (루트에서 작동)
  // 이 경우 이미지 경로도 루트 기준으로 처리
  return '';
};

const basename = getBasename();

// 전역 변수로 basename 저장 (이미지 경로 처리용)
(window as any).__BASENAME__ = basename;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
