import React, { useState, useEffect } from "react";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import AdminPasswordModal from "../components/modals/AdminPasswordModal";
import { devlogs as defaultDevlogs } from "../data/devlog";

interface DevLogItem {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string | null;
}

const DevLog: React.FC = () => {
  const [logs, setLogs] = useState<DevLogItem[]>(defaultDevlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem("devlogs");
    if (savedLogs) {
      const parsed = JSON.parse(savedLogs);
      setLogs([...parsed, ...defaultDevlogs]);
    }
  }, []);

  const handleNewClick = () => {
    setIsModalOpen(true);
  };

  const handleAuthSuccess = () => {
    window.location.href = "/devlog/write";
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="section">
      <div className="section-header">
        <SectionTitle
          label="DevLog"
          title="작업 로그"
          description="프로젝트를 하면서 고민했던 점, 배운 점들을 기록합니다."
        />
        <button className="devlog-new-btn" onClick={handleNewClick}>
          New
        </button>
      </div>
      <div className="devlog-timeline">
        {logs.map((log, index) => (
          <div key={log.id} className="devlog-item">
            <div className="timeline-marker">
              <div className="timeline-line" />
              <div className="timeline-dot" />
            </div>
            <GlassCard
              className={`devlog-card ${expandedId === log.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(log.id)}
            >
              <div className="devlog-header">
                <span className="devlog-date">{log.date}</span>
                {index === 0 && <span className="badge-new">NEW</span>}
              </div>
              <h3 className="devlog-title">
                {log.title} <span className="expand-icon">{expandedId === log.id ? "▴" : "▾"}</span>
              </h3>
              {expandedId === log.id && (
                <div className="devlog-content-expanded">
                  {log.image && (
                    <div className="devlog-image">
                      <img src={log.image} alt={log.title} />
                    </div>
                  )}
                  <p className="devlog-body">{log.content}</p>
                </div>
              )}
            </GlassCard>
          </div>
        ))}
      </div>
      <AdminPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </section>
  );
};

export default DevLog;

