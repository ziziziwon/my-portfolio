import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// localStorage에서 테마 불러오기
const getInitialTheme = (): Theme => {
  // SSR 환경에서는 "light" 반환
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    // localStorage에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    // 저장된 테마가 없으면 시스템 다크모드 설정 확인
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch (error) {
    console.error("Failed to get theme from localStorage:", error);
  }

  return "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 테마 적용 (렌더링 전에 적용하여 깜빡임 방지)
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setIsInitialized(true);
  }, []);

  // 테마 변경 시 DOM과 localStorage 업데이트
  useEffect(() => {
    if (!isInitialized) return;

    try {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme, isInitialized]);

  // 시스템 다크모드 변경 감지 (선택적 - 사용자가 수동으로 변경한 경우 무시)
  useEffect(() => {
    if (!isInitialized) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // localStorage에 저장된 테마가 없을 때만 시스템 설정 따름
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // 모바일 환경에서도 작동하도록 addEventListener 사용
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // 구형 브라우저 지원 (addListener)
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [isInitialized]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      // 즉시 localStorage에 저장
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.error("Failed to save theme to localStorage:", error);
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};



