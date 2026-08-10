import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const CinematicTemplate = ({ sectionOrder, renderSection, theme }) => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const groomEn = mainInfo.groomNameEn || 'Groom';
  const brideEn = mainInfo.brideNameEn || 'Bride';
  const dateObj = mainInfo.date ? new Date(mainInfo.date) : new Date();
  const shape = mainInfo.mainImageShape;
  
  return (
    <div className="template-cinematic" style={{ '--theme-text': theme.text, '--theme-bg': theme.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Six+Caps&display=swap');

        .template-cinematic {
          background-color: var(--theme-bg);
          color: var(--theme-text);
          overflow: hidden;
          position: relative;
          min-height: 100vh;
          counter-reset: scene_counter;
        }

        .cinematic-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 90;
        }

        .cinematic-light-leak-1 {
          position: fixed;
          top: 20%; right: -20%;
          width: 70vw; height: 70vw;
          background: radial-gradient(circle, rgba(40,120,255,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: screen;
        }
        
        .cinematic-light-leak-2 {
          position: fixed;
          bottom: 10%; left: -20%;
          width: 80vw; height: 80vw;
          background: radial-gradient(circle, rgba(255,80,40,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: screen;
        }

        /* 1. Letterbox (Cinemascope) Bars */
        .template-cinematic::before,
        .template-cinematic::after {
          content: '';
          position: fixed;
          left: 0;
          width: 100%;
          height: 8vh;
          background-color: #000;
          z-index: 30;
          pointer-events: none;
        }
        .template-cinematic::before { top: 0; }
        .template-cinematic::after { bottom: 0; }

        /* Cover overrides for dramatic movie poster look */
        .template-cinematic #section-home {
          position: relative;
          display: flex;
          flex-direction: column;
          padding-top: 10vh; /* Push down to prevent top letterbox from covering Wedding Invitation text */
          box-sizing: border-box;
        }
        
        .template-cinematic .main-image-img,
        .template-cinematic .main-image-inner {
          /* 3. Film Grain & Vignette */
          filter: contrast(1.2) saturate(0.8) sepia(0.2);
        }
        
        /* Add a heavy vignette overlay over the exact photo frame */
        .template-cinematic .main-image-frame::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%),
            linear-gradient(to bottom, transparent 60%, var(--theme-bg) 100%);
          pointer-events: none;
          z-index: 5;
        }

        /* 2. Movie Title (Cover Typography) */
        .movie-title-block {
          position: absolute;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 20; /* Ensure it floats above the photo vignette */
        }
        .movie-title-main {
          font-family: var(--font-en-serif);
          font-size: 3.5rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.1;
          letter-spacing: 4px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.8);
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .movie-title-sub {
          font-family: var(--font-en-sans);
          font-size: 0.75rem;
          letter-spacing: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Sub-sections styling */
        .cinematic-section {
          padding: 80px 20px;
          position: relative;
          opacity: 0.9;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          counter-increment: scene_counter;
        }
        .cinematic-section::before {
          content: 'SCENE 0' counter(scene_counter);
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.8rem;
          color: var(--theme-text);
          opacity: 0.4;
          letter-spacing: 2px;
          z-index: 10;
        }
        
        .template-cinematic h2 {
          font-family: var(--font-en-serif) !important;
          font-size: 2.2rem !important;
          text-align: center !important;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 40px !important;
        }

        /* V2-1. Cinematic Subtitles */
        .template-cinematic #section-intro p {
          color: var(--theme-text) !important;
          background-color: transparent;
          display: inline-block;
          padding: 12px 24px;
          border-radius: 8px;
          font-family: var(--font-kr-serif), 'KoPub Batang', serif !important;
          font-weight: 300;
          text-align: center;
          font-size: 1.1rem;
          line-height: 2.4;
          letter-spacing: 1px;
          margin-top: 40px;
        }
        .template-cinematic #section-intro {
          text-align: center;
        }

        /* V2-2. Film Strip Gallery */
        .template-cinematic #section-gallery {
          position: relative;
          padding: 40px 0 !important;
          background-color: transparent;
          border-top: 24px solid var(--theme-text);
          border-bottom: 24px solid var(--theme-text);
        }
        .template-cinematic #section-gallery::before,
        .template-cinematic #section-gallery::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 8px;
          background-image: repeating-linear-gradient(90deg, var(--theme-bg) 0, var(--theme-bg) 4px, transparent 4px, transparent 12px);
          opacity: 0.8;
          pointer-events: none;
        }
        .template-cinematic #section-gallery::before { top: -16px; }
        .template-cinematic #section-gallery::after { bottom: -16px; }

        /* V2-3. Clapperboard Date */
        .cinematic-clapperboard {
          background: transparent;
          border-radius: 4px;
          margin: 0 auto 30px;
          max-width: 320px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid var(--theme-text);
          position: relative;
          z-index: 5;
        }
        .clapper-top {
          height: 24px;
          background: repeating-linear-gradient(45deg, var(--theme-text) 0, var(--theme-text) 15px, transparent 15px, transparent 30px);
          border-bottom: 1px solid var(--theme-text);
          border-radius: 2px 2px 0 0;
          transform-origin: left bottom;
          transform: rotate(-6deg);
          margin-bottom: 4px;
        }
        .clapper-body {
          padding: 12px;
          display: flex;
          justify-content: space-around;
          font-family: 'Courier New', Courier, monospace;
          color: var(--theme-text);
          font-weight: bold;
          text-align: center;
        }
        .clapper-body span {
          display: block;
          font-size: 0.55rem;
          color: var(--theme-text);
          opacity: 0.6;
          margin-bottom: 4px;
          letter-spacing: 2px;
        }
        .clapper-row {
          font-size: 1.2rem;
        }

        /* V2-4. End Credits Roll */
        .cinematic-end-credits {
          height: 40vh;
          overflow: hidden;
          position: relative;
          background: #000;
          margin-top: 40px;
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
        }
        .credits-roll {
          text-align: center;
          font-family: var(--font-en-serif);
          letter-spacing: 2px;
          animation: rollUp 15s linear infinite;
          position: absolute;
          width: 100%;
          top: 40vh;
        }
        .credits-roll h4 {
          font-family: var(--font-en-sans);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          margin: 40px 0 10px;
          font-weight: normal;
          letter-spacing: 4px;
        }
        .credits-roll p {
          font-size: 1.2rem;
          margin: 5px 0;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        .credit-dots {
          font-family: Arial, sans-serif;
          font-size: 1rem;
          opacity: 0.5;
          letter-spacing: 4px;
        }
        .credit-ko {
          font-family: var(--font-kr-serif), 'KoPub Batang', 'Nanum Myeongjo', serif;
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: 4px;
        }
        /* V2-5. VIP Ticket Style (RSVP Only) */
        .cinematic-ticket-wrapper {
          background-color: transparent;
          margin: 40px 16px 20px;
          border-radius: 8px;
          border: 1px solid var(--theme-text);
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          opacity: 0.85;
        }
        .cinematic-ticket-wrapper::before,
        .cinematic-ticket-wrapper::after {
          content: '';
          position: absolute;
          top: 40px;
          width: 20px;
          height: 20px;
          background-color: var(--theme-bg);
          border-radius: 50%;
          border: 1px solid var(--theme-text);
          z-index: 10;
        }
        .cinematic-ticket-wrapper::before {
          left: -11px;
          border-left: none;
        }
        .cinematic-ticket-wrapper::after {
          right: -11px;
          border-right: none;
        }
        .cinematic-ticket-header {
          text-align: center;
          padding: 16px 0;
          border-bottom: 1px dashed var(--theme-text);
          font-family: var(--font-en-sans);
          font-size: 0.7rem;
          letter-spacing: 4px;
          color: var(--theme-text);
          opacity: 0.7;
          font-weight: 300;
          text-transform: uppercase;
        }
        .cinematic-ticket-barcode {
          text-align: center;
          padding: 20px 0 16px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 1.2rem;
          color: var(--theme-text);
          opacity: 0.3;
          letter-spacing: 2px;
        }
        
        /* Age Rating Badge CSS Removed */
        @keyframes rollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-40vh - 100%)); }
        }
      `}</style>

      <div className="cinematic-grain"></div>
      <div className="cinematic-light-leak-1"></div>
      <div className="cinematic-light-leak-2"></div>
      
      <div id="section-home">
        {renderSection('main')}
        
        {/* Zero-height wrapper to position text relative to the bottom of the image */}
        <div style={{ position: 'relative', width: '100%', height: 0, zIndex: 20 }}>
          <div className="movie-title-block" style={{ bottom: shape === 'circle' ? '140px' : '100px' }}>
            <div className="movie-title-main">
              {groomEn}<br/>& {brideEn}
            </div>
            <div className="movie-title-sub">A Love Story</div>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '0 0 40px 0', marginTop: '20px' }}>
        {sectionOrder.map(section => {
          const isTicketSection = section.id === 'rsvp';
          
          if (isTicketSection) {
            return (
              <div key={section.id} className="cinematic-ticket-wrapper">
                <div className="cinematic-ticket-header">VIP PREMIERE TICKET</div>
                <div className="cinematic-section" id={`section-${section.id}`} style={{ borderBottom: 'none', padding: '40px 20px 20px', margin: 0 }}>
                  {renderSection(section.id)}
                </div>
                <div className="cinematic-ticket-barcode">|| ||| | ||| || ||| | ||</div>
              </div>
            );
          }

          return (
            <div key={section.id} className="cinematic-section" id={`section-${section.id}`}>
              {section.id === 'calendar' && (
                <div className="cinematic-clapperboard">
                  <div className="clapper-top"></div>
                  <div className="clapper-body">
                    <div className="clapper-row"><span>SCENE</span> 01</div>
                    <div className="clapper-row"><span>TAKE</span> {String(dateObj.getMonth() + 1).padStart(2, '0')}{String(dateObj.getDate()).padStart(2, '0')}</div>
                    <div className="clapper-row"><span>DIR</span> {groomEn[0]}&{brideEn[0]}</div>
                  </div>
                </div>
              )}
              {renderSection(section.id)}
            </div>
          );
        })}
      </div>

      {optionInfo.cinematicCredits !== false && (
        <div className="cinematic-end-credits">
          <div className="credits-roll">
            <h4>CAST</h4>
            <p>{groomEn.toUpperCase()}</p>
            <p>{brideEn.toUpperCase()}</p>
            
            <h4>SPECIAL THANKS TO</h4>
            <p style={{ fontSize: '1.4rem' }}>OUR BELOVED FAMILY & FRIENDS</p>
            
            <h2 style={{ marginTop: '80px', fontFamily: 'var(--font-en-serif)', letterSpacing: '8px', color: '#fff', fontSize: '2rem' }}>THE END</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinematicTemplate;
