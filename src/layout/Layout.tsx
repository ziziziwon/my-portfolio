import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import LogoJelly from "../components/LogoJelly";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <LogoJelly />
        </Link>
        <nav className="nav">
          <NavLink to="/portfolio" className="nav-link" onClick={closeMobileMenu}>
            Portfolio
          </NavLink>
          <NavLink to="/devlog" className="nav-link" onClick={closeMobileMenu}>
            DevLog
          </NavLink>
          <NavLink to="/guestbook" className="nav-link" onClick={closeMobileMenu}>
            Guestbook
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>
            About
          </NavLink>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="메뉴 열기"
          >
            <span className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <NavLink 
                to="/portfolio" 
                className="mobile-nav-link" 
                onClick={closeMobileMenu}
              >
                Portfolio
              </NavLink>
              <NavLink 
                to="/devlog" 
                className="mobile-nav-link" 
                onClick={closeMobileMenu}
              >
                DevLog
              </NavLink>
              <NavLink 
                to="/guestbook" 
                className="mobile-nav-link" 
                onClick={closeMobileMenu}
              >
                Guestbook
              </NavLink>
              <NavLink 
                to="/about" 
                className="mobile-nav-link" 
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <main className="main">
        <motion.div
          className="page-wrapper"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} jiwon portfolio · made with love
      </footer>
    </div>
  );
};

export default Layout;

