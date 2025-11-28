import React from "react";
import { Link } from "react-router-dom";

const HeroProfile: React.FC = () => {
  // 프로필 이미지 경로 - public/images/profile/ 폴더에 저장
  const profileImage = `${import.meta.env.BASE_URL}images/profile/profile.jpg`;

  return (
    <section className="hero">
      <div className="hero-left">
        <div
          className="hero-profile-img"
          style={{
            backgroundImage: `url(${profileImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="hero-right">
        <p className="hero-label">Personal Portfolio</p>

        <h1 className="hero-title">
          감성을 설계하는 <br />
          Web Designer, Jiwon
        </h1>

        <p className="hero-desc">
          인터랙티브한 웹과 감성적인 UI/UX를 <br />연구하고 있어요.
        </p>

        <div className="hero-buttons">
          <Link to="/portfolio" className="btn primary btn-jelly">
            포트폴리오 보기
          </Link>
          <Link to="/about" className="btn ghost btn-jelly">
            소개 더 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroProfile;

