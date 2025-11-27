import React from "react";

interface Props {
  label?: string;
  title: string;
  description?: string;
}

const SectionTitle: React.FC<Props> = ({ label, title, description }) => {
  return (
    <div className="section-title">
      {label && <p className="section-label">{label}</p>}
      <h2 className="section-heading">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
};

export default SectionTitle;



