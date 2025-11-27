import React from "react";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";

const About: React.FC = () => {
  return (
    <section className="section">
      <SectionTitle
        label="About"
        title="자기 소개"
        description="세계관·픽셀·감성 인터랙션을 통해 작은 감정의 공간을 만드는 웹 크리에이터입니다."
      />
      <GlassCard className="about-card">
        <div className="about-content">
          <div className="about-intro">
            <p className="about-intro-main">
              감성을 코드로 번역하는 웹 크리에이터, 정지원입니다.
            </p>
            <p>
              저는 제가 만든 세계관과 캐릭터들을 웹 속에서 살아 움직이게 만드는 일을 해요.
            </p>
          </div>

          <div className="about-story">
            <h3>✨ 세계관 기반 웹 크리에이션</h3>
            <p>
              저에게 웹은 단순히 정보를 올려두는 공간이 아니라,
              누군가의 감정이 잠깐 머물러 쉬어갈 수 있는 작은 세계라고 생각합니다.
            </p>
            <p>
              그래서 저는 웹을 만들 때 늘 상상해요.
              사용자가 스크롤을 내릴 때마다
              조금은 귀엽고, 몽환적이고, 부드럽게 반응하는 작은 생명체 같은 웹 페이지를요.
            </p>
            <p>
              저는 하늘색·파스텔·몽환적인 색감을 좋아합니다.
              빛이 번지듯 흐르고, 투명한 플라스틱처럼 은은한 글래스 느낌,
              픽셀처럼 아기자기한 요소들이 조용히 움직이는 디자인
              이런 요소들이 모여 제 세계를 만듭니다.
            </p>
          </div>

          <div className="about-character">
            <h3>🐙 극단이와 함께하는 스토리</h3>
            <p>
              이 세계관 안에서 탄생한 캐릭터가 바로 <strong>‘극단이(Tiger Octo)’</strong>예요.
              단순한 마스코트가 아니라, 제가 만든 웹의 스토리를 함께 이끌어가는
              작은 가이드이자 친구 같은 존재입니다.
            </p>
            <p>
              또한 Dream Candy Lab처럼,
              저만의 브랜드와 스토리를 담은 프로젝트에서
              인터랙션·일러스트·UI 감성·풀스택 구조를 연결하는 작업을 즐깁니다.
              웹이 한 장의 화면이 아니라
              <strong>"하나의 공간"</strong>으로 느껴지도록 만드는 건
              제가 가장 즐기는 과정이기도 해요.
            </p>
          </div>

          <div className="about-research">
            <h3>✦ 지속적으로 연구하는 요소들</h3>
            <ul className="about-research-list">
              <li>사용자 감정을 바탕으로 한 UI/UX 연출</li>
              <li>픽셀 캐릭터, 이모티콘, 작은 애니메이션</li>
              <li>스크롤에 따라 흘러가는 인터랙션</li>
              <li>브랜딩 감성 + 웹 기술을 결합한 연출</li>
              <li>세계관 기반 인터랙티브 사이트 구성</li>
            </ul>
          </div>

          <div className="about-vision">
            <h3>💫 앞으로의 비전</h3>
            <p>
              앞으로도 저는
              <strong>"누군가의 하루에 아주 작은 힐링을 줄 수 있는 웹"</strong>,
              <strong>"기억에 남는 감성"</strong>,
              <strong>"살아 있는 듯한 UI"</strong>를 만들기 위해 계속 배우고, 디자인하고, 개발할 예정이에요.
            </p>
            <p className="about-vision-end">
              제 웹에 들어오는 순간, 잠깐이라도
              <em>"아, 뭔가 예쁘다… 귀엽다… 편하다…"</em>
              이런 감정이 스치길 바라는 마음으로 작업합니다.
            </p>
          </div>

          <div className="about-identity">
            <h3>Identity</h3>
            <div className="identity-tags">
              <span className="tag">💙 Sky Lover</span>
              <span className="tag">✦ Pastel & Interactive</span>
              <span className="tag">🎸 Guitar + Pixel Vibe</span>
              <span className="tag">🐙 극단이 유니버스 제작자</span>
            </div>
          </div>

          <div className="about-skills">
            <h3>Skills</h3>
            <div className="skill-icons">
              <span className="skill-icon" title="React">⚛️ React</span>
              <span className="skill-icon" title="TypeScript">📘 TypeScript</span>
              <span className="skill-icon" title="React Three Fiber">🎨 R3F</span>
              <span className="skill-icon" title="GSAP">🎬 GSAP</span>
              <span className="skill-icon" title="Framer Motion">✨ Framer Motion</span>
              <span className="skill-icon" title="Zustand">🔄 Zustand</span>
              <span className="skill-icon" title="Firebase">🔥 Firebase</span>
              <span className="skill-icon" title="Figma">🎨 Figma</span><br />
              <span className="skill-icon" title="Illustrator">✏️ Illustrator</span>
              <span className="skill-icon" title="Photoshop">🖼️ Photoshop</span>
              <span className="skill-icon" title="Premiere Pro">🎞️ Premiere Pro</span>
            </div>
          </div>

          <div className="about-links">
            <a href="mailto:jjw0144@naver.com">Email</a>
            <a href=" https://github.com/ziziziwon" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default About;



