import React from 'react';

const ModernTemplate = ({ sectionOrder, renderSection, theme }) => {
  return (
    <div className="template-modern" style={{ padding: '16px', backgroundColor: '#F8F9FA' }}>
      <style>{`
        .template-modern {
          --modern-bg: #F8F9FA;
          --modern-card-bg: #FFFFFF;
          --modern-radius: 32px;
          min-height: 100vh;
        }
        .modern-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modern-card {
          background-color: var(--modern-card-bg);
          border-radius: var(--modern-radius);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          overflow: hidden;
          position: relative;
        }
        .modern-card.cover {
          margin-bottom: 8px;
        }
        
        /* Layout overrides for Grid */
        .template-modern .modern-card h3 {
          font-family: var(--font-en-sans) !important;
          letter-spacing: 2px !important;
          font-size: 1.1rem !important;
          margin-bottom: 16px !important;
        }
      `}</style>

      <div className="modern-grid">
        <div className="modern-card cover">
          {renderSection('main')}
        </div>
        
        {sectionOrder.map((section) => (
          <div key={section.id} className="modern-card">
            {renderSection(section.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;
