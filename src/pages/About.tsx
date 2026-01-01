import React from "react";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";

const About: React.FC = () => {
  return (
    <section className="section">
      <SectionTitle
        label="About"
        title="자기 소개"
        description="세계관·픽셀·감성 인터랙션을 통해 작은 감정의 공간을 만드는 프론트엔드 웹 디자이너입니다."
      />
      <GlassCard className="about-card">
        <div className="about-content">
          <div className="about-intro">
            <p className="about-intro-main">
              사용자의 감정을 이해하고 경험으로 설계하는 프론트엔드 웹 디자이너, 정지원입니다.
            </p>
            <p>
              저는 단순히 ‘보여지는 화면’이 아니라, 사용자가 웹을 이용하며 느끼는 감정·리듬·몰입감까지
              함께 설계합니다. 장면 전환의 호흡, 인터랙션의 온도, 마이크로 카피의 어조가 하나의 경험으로
              이어지도록 조율합니다.
            </p>
            <p>
              React·TypeScript를 중심으로 프론트엔드를 시작해 백엔드·데이터베이스·배포까지
              직접 경험하며 기획–디자인–개발이 자연스럽게 연결된 구조를 만듭니다. Firebase, Render 등
              클라우드 환경에서 서비스 흐름을 설계·운영하며 실제 사용자 경험을 다듬어 왔습니다.
            </p>
          </div>

          <div className="about-story">
            <h3>🌏 세계관 기반 웹 크리에이터</h3>
            <p>
              웹은 정보를 전달하는 도구를 넘어, 사용자가 잠시 머물며 편안함을 느끼는
              인터랙티브한 공간이라고 생각합니다.
            </p>
            <p>
              그래서 저는 설계 단계에서 항상 사용자 입장에서 상상합니다. 스크롤마다 미세한
              움직임이 스토리를 이어주고, 픽셀 요소와 작은 애니메이션이 정서적 온기를
              전달하는 웹을 만듭니다.
            </p>
            <p>
              하늘색·파스텔 톤, 유리처럼 부드러운 질감, 작은 생명감이 느껴지는 인터랙션을
              선호합니다. 감성을 유지하면서도 레이아웃, 정보 구조, 접근성을 함께 설계해
              협업과 확장이 쉬운 구조를 지향합니다.
            </p>
          </div>

          <div className="about-story">
            <h3>🫧 브랜드 감성과 서비스 경험을 잇다</h3>
            <p>
              Dream Candy Lab 같은 스토리형 프로젝트를 만들며,
              인터랙션·일러스트·UI 감성·풀스택 구조를 연결하는 방식을 연구합니다.
              웹을 한 장의 화면이 아닌 <strong>"하나의 공간"</strong>처럼 느끼게 만드는 과정에
              진심입니다.
            </p>
            <p>
              브랜드 세계관이 담긴 디테일을 유지하면서도,
              서비스 흐름과 정보 구조가 깔끔하게 읽히도록 설계해
              실무 환경에서도 바로 협업 가능한 아키텍처를 지향합니다.
            </p>
          </div>

          <div className="about-research">
            <h3>✦ 지속적으로 연구하는 요소들</h3>
            <ul className="about-research-list">
              <li>사용자 감정 기반 UI/UX 설계</li>
              <li>픽셀 캐릭터 & 작은 애니메이션</li>
              <li>스크롤 인터랙션 설계</li>
              <li>브랜드 아이덴티티와 웹 기술의 결합</li>
              <li>세계관을 담은 인터랙티브 사이트 구축</li>
            </ul>
          </div>

          <div className="about-vision">
            <h3>💫 앞으로의 비전</h3>
            <p>
              앞으로도 저는 <strong>"누군가의 하루에 작은 위로가 될 수 있는 웹"</strong>,
              <strong>"기억에 남는 감성"</strong>, <strong>"살아있는 듯한 UI"</strong>를
              만들기 위해 계속 배우고, 디자인하고, 개발할 예정입니다.
            </p>
            <p className="about-vision-end">
              누군가 제 웹에 들어와 <em>"예쁘다"</em>, <em>"귀엽다"</em>,
              <em>"편안하다"</em> 같은 감정을 자연스럽게 느낀다면 그 순간이 가장 보람된
              순간입니다.
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
              <span className="skill-icon" title="Render">🚀 Render</span>
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



