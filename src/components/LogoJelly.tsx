import React from "react";

const LogoJelly: React.FC = () => {
  return (
    <svg
      width="240"
      height="70"
      viewBox="0 0 240 70"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id="textGrad" x1="0" y1="0" x2="0" y2="70">
          <stop offset="0%" stopColor="#71A8FF" />
          <stop offset="100%" stopColor="#A7D3FF" />
        </linearGradient>

        <filter id="softShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Text with gradient - 더 귀엽고 굵게 */}
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        fontFamily="Cafe24Ssurround, Pretendard, sans-serif"
        fontSize="44"
        fontWeight="900"
        fill="url(#textGrad)"
        filter="url(#softShadow)"
        style={{
          letterSpacing: "0.12em",
          fontStretch: "condensed",
        }}
      >
        JIWON
      </text>

      {/* Decorative sparkles - 더 귀여운 장식 */}
      <circle cx="185" cy="18" r="4" fill="#ff8ac8" opacity="0.9" className="star-twinkle" />
      <circle cx="192" cy="26" r="3" fill="#a7d3ff" opacity="0.95" className="star-twinkle" />
      <circle cx="55" cy="52" r="3" fill="#ff8ac8" opacity="0.7" className="star-twinkle" />
      <circle cx="65" cy="58" r="2" fill="#c8a8e9" opacity="0.8" className="star-twinkle" />
    </svg>
  );
};

export default LogoJelly;

