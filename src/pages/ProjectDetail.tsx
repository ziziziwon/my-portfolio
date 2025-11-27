import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Swiper CSS는 styles.css에 포함되어 있습니다
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { projects } from "../data/projects";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="section">
        <p>프로젝트를 찾을 수 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <SectionTitle
        label={project.category}
        title={project.title}
        description={project.subtitle}
      />
      <GlassCard className="project-detail-card">
        {project.images && project.images.length > 0 ? (
          <div className="project-detail-swiper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              slidesPerGroup={1}
              navigation={project.images.length > 1}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={
                project.images.length > 1
                  ? {
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              loop={project.images.length > 1}
              className="project-swiper"
              grabCursor={true}
              speed={600}
            >
              {project.images.map((image, index) => {
                // 서브 경로 배포를 위한 이미지 경로 처리
                const imagePath = image.startsWith('/') 
                  ? `${import.meta.env.BASE_URL}${image.slice(1)}` 
                  : `${import.meta.env.BASE_URL}${image}`;
                return (
                  <SwiperSlide key={`${project.id}-${index}`}>
                    <div className="project-swiper-slide">
                      <img 
                        src={imagePath} 
                        alt={`${project.title} - Image ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = '1';
                        }}
                        style={{ opacity: 0, transition: 'opacity 0.3s' }}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div 
            className="project-detail-main-visual"
            style={{
              background: project.thumbnailColor || "linear-gradient(135deg, #ffe1ec, #fff0f6)",
            }}
          />
        )}
        <div className="project-detail-meta">
          <p>
            <strong>Year</strong> {project.year}
          </p>
          <p>
            <strong>Role</strong> {project.role}
          </p>
          <p>
            <strong>Stack</strong> {project.stack.join(" · ")}
          </p>
          {project.tags && project.tags.length > 0 && (
            <p>
              <strong>Tags</strong> {project.tags.join(" · ")}
            </p>
          )}
        </div>
        {project.summary && (
          <div className="project-detail-summary">
            <h3>프로젝트 개요</h3>
            <p>{project.summary}</p>
          </div>
        )}
        <div className="project-detail-description">
          <h3>설명</h3>
          <p>{project.description}</p>
        </div>
        {project.features && project.features.length > 0 && (
          <div className="project-detail-features">
            <h3>주요 기능</h3>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {project.highlights && project.highlights.length > 0 && (
          <div className="project-detail-highlights">
            <h3>하이라이트</h3>
            <ul>
              {project.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="project-detail-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn primary">
              Live Demo
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="btn ghost">
              GitHub
            </a>
          )}
        </div>
      </GlassCard>
    </section>
  );
};

export default ProjectDetail;



