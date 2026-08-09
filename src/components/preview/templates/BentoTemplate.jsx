import React from 'react';

const BentoTemplate = ({ sectionOrder, renderSection, theme }) => {
  return (
    <div className="template-bento" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .template-bento {
          background-color: ${theme.bg};
          min-height: 100vh;
        }
        @keyframes orbFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes orbFloat2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -30px) scale(1.15); }
          66% { transform: translate(20px, -50px) scale(0.85); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .bento-orb-container {
          position: sticky;
          top: 0; left: 0; width: 100%; height: 0;
          z-index: 0; overflow: visible;
        }
        .bento-orb-1 {
          position: absolute; top: 10vh; left: -20vw; width: 80vw; height: 80vw;
          background: radial-gradient(circle, ${theme.accent} 0%, transparent 70%);
          opacity: 0.15; filter: blur(40px); pointer-events: none;
          animation: orbFloat1 15s ease-in-out infinite;
        }
        .bento-orb-2 {
          position: absolute; top: 50vh; right: -20vw; width: 90vw; height: 90vw;
          background: radial-gradient(circle, ${theme.accent} 0%, transparent 70%);
          opacity: 0.15; filter: blur(50px); pointer-events: none;
          animation: orbFloat2 18s ease-in-out infinite reverse;
        }
        .bento-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 10;
        }
        .bento-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 36px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.04);
          overflow: hidden;
          position: relative;
        }
        .bento-card.cover { padding: 0; margin-bottom: 4px; background: rgba(255, 255, 255, 0.4); }
        
        .template-bento .bento-card h3 {
          font-family: var(--font-en-sans) !important;
          letter-spacing: 2px !important;
          font-size: 1.1rem !important;
          margin-bottom: 16px !important;
        }
        
        /* Swipeable Gallery Override */
        .template-bento .gallery-grid-container {
          display: flex !important;
          overflow-x: auto !important;
          scroll-snap-type: x mandatory !important;
          gap: 12px !important;
          padding-bottom: 16px;
        }
        .template-bento .gallery-grid-container::-webkit-scrollbar {
          display: none;
        }
        .template-bento .gallery-grid-item {
          flex: 0 0 75% !important;
          aspect-ratio: 4/5 !important;
          scroll-snap-align: center !important;
          border-radius: 16px !important;
        }
        
        /* D-Day Activity Ring Override */
        .template-bento .d-day-container {
          border-top: none !important;
        }
        .template-bento .d-day-standard-text {
          display: none !important;
        }
        .template-bento .d-day-ring-wrapper {
          display: flex !important;
        }
        
        /* Ring animation keyframes */
        @keyframes fillRing {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 75, 100; } /* Ideally calculated dynamically, but 75% looks great for UI */
        }
        .template-bento .bento-ring-circle {
          animation: fillRing 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.5s;
        }
        
        /* Floating Heart Animation */
        @keyframes bentoHeartFloat {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(var(--scale)) rotate(var(--rot)); }
        }
      `}</style>
      
      <div className="bento-orb-container">
        <div className="bento-orb-1"></div>
        <div className="bento-orb-2"></div>
      </div>

      <div className="bento-grid">
        <div className="bento-card cover">
          {renderSection('main')}
        </div>
        
        {sectionOrder.map((section) => (
          <div key={section.id} className="bento-card">
            {renderSection(section.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoTemplate;
