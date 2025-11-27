import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import DevLog from "./pages/DevLog";
import DevLogWrite from "./pages/DevLogWrite";
import Guestbook from "./pages/Guestbook";
import About from "./pages/About";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/devlog" element={<DevLog />} />
          <Route path="/devlog/write" element={<DevLogWrite />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
