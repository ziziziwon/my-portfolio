import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useStaggerAnimation } from "../utils/animations";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

const TiltCard: React.FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const gridRef = useStaggerAnimation(projects);

  return (
    <section className="section portfolio-page">
      <SectionTitle
        label="Portfolio"
        title="전체 프로젝트"
        description="UI/UX, 인터랙션, 실험적인 작업들을 한 곳에 모았어요."
      />
      <div className="portfolio-grid" ref={gridRef}>
        {projects.map((p, index) => (
          <TiltCard key={p.id} index={index}>
            <GlassCard className="project-card">
              <Link
                to={`/portfolio/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="project-thumb"
                  style={{
                    background: p.thumbnailColor || "linear-gradient(135deg, #ffe1ec, #fff0f6)",
                  }}
                />
                <div className="project-content">
                  <h3>{p.title}</h3>
                  <p>{p.subtitle}</p>
                  <div className="project-tags">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="link-more">
                    자세히 보기 →
                  </div>
                </div>
              </Link>
            </GlassCard>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;

