import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={`glass-card ${className ?? ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default GlassCard;



