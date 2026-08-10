import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const MagazineTemplate = ({ sectionOrder, renderSection, theme }) => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const groomEn = mainInfo.groomNameEn || 'Groom';
  const brideEn = mainInfo.brideNameEn || 'Bride';

  return (
    <div className="template-magazine" style={{ '--theme-text': theme.text, '--theme-bg': theme.bg }}>
      <style>{`
        .template-magazine {
          padding: 16px;
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
        }

        .magazine-frame {
          border: 1px solid var(--theme-text);
          padding: 4px;
          border-radius: 2px;
          position: relative;
          z-index: 1;
        }
        .magazine-inner {
          border: 1px solid var(--theme-text);
          position: relative;
          overflow: hidden;
          background-color: transparent;
        }
        .magazine-masthead {
          text-align: center;
          padding: 24px 0 16px;
          border-bottom: 1px solid var(--theme-text);
          margin: 0 16px;
          position: relative;
        }
        .magazine-masthead h1 {
          font-family: var(--font-en-serif);
          font-size: 2.8rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin: 0;
          text-transform: uppercase;
        }
        .magazine-masthead p {
          font-family: var(--font-en-sans);
          font-size: 0.65rem;
          letter-spacing: 4px;
          margin-top: 8px;
          text-transform: uppercase;
        }
        .template-magazine #section-home {
          padding-top: 0; 
          position: relative;
        }



        /* 3. Marquee Ticker */
        .magazine-ticker {
          width: 100%;
          background-color: var(--theme-text);
          color: var(--theme-bg);
          padding: 8px 0;
          overflow: hidden;
          position: relative;
          display: flex;
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: ticker 20s linear infinite;
        }
        .ticker-track span {
          font-family: var(--font-en-sans);
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 0 20px;
          text-transform: uppercase;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* 5. Editorial heavy lines */
        .magazine-section {
          padding: 60px 16px;
          border-top: 4px solid var(--theme-text);
          margin: 0 16px;
          position: relative;
        }
        .magazine-section::before {
          content: '';
          position: absolute;
          top: -9px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--theme-text);
        }

        .template-magazine h2 {
          font-family: var(--font-en-serif) !important;
          font-size: 2rem !important;
          font-style: italic;
          margin-bottom: 24px !important;
          text-align: left !important;
        }
        .template-magazine .main-cover-image {
          filter: contrast(1.15) grayscale(30%);
        }

        /* V2-1. Page Numbers */
        .magazine-inner {
          counter-reset: page_counter;
        }
        .magazine-section {
          counter-increment: page_counter;
        }
        .magazine-section::after {
          content: "PAGE " counter(page_counter, decimal-leading-zero);
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-family: var(--font-en-sans);
          font-size: 0.55rem;
          letter-spacing: 2px;
          color: var(--theme-text);
          opacity: 0.6;
        }

        /* V2-2. Editor's Note Label */
        .magazine-label {
          text-align: center;
          font-family: var(--font-en-sans);
          font-size: 0.6rem;
          letter-spacing: 4px;
          color: var(--theme-text);
          margin-top: -30px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        /* V2-3. Scrapbook Gallery */
        .template-magazine #section-gallery .gallery-grid-container > div {
          border: 4px solid #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s, z-index 0.3s;
          background: #fff;
        }
        .template-magazine #section-gallery .gallery-grid-container > div:nth-child(odd) {
          transform: rotate(-3deg);
        }
        .template-magazine #section-gallery .gallery-grid-container > div:nth-child(even) {
          transform: rotate(2deg);
        }
        .template-magazine #section-gallery .gallery-grid-container > div:hover {
          transform: rotate(0deg) scale(1.05);
          z-index: 10;
        }

        /* V2-4. Contents Page */
        .magazine-contents {
          padding: 40px 30px;
          background-color: var(--theme-bg);
        }
        .magazine-contents-title {
          font-family: var(--font-en-serif);
          font-style: italic;
          font-size: calc(2.4rem * var(--font-ratio));
          color: var(--theme-accent);
          margin-bottom: 30px;
          border-bottom: 1px solid var(--theme-text);
          padding-bottom: 10px;
        }
        .magazine-contents-item {
          display: flex;
          align-items: baseline;
          margin-bottom: 24px;
          font-family: var(--font-en-serif);
          letter-spacing: 2px;
        }
        .magazine-contents-num {
          font-size: calc(0.7rem * var(--font-ratio));
          color: var(--theme-accent);
          margin-right: 16px;
          opacity: 0.8;
        }
        .magazine-contents-name {
          font-size: calc(0.9rem * var(--font-ratio));
          color: var(--theme-text);
          text-transform: uppercase;
        }
        .magazine-contents-name.kr {
          font-family: var(--font-kr-serif);
          letter-spacing: 0;
          font-size: calc(1rem * var(--font-ratio));
          text-transform: none;
        }
        .magazine-contents-dots {
          flex-grow: 1;
          border-bottom: 1px dotted rgba(0,0,0,0.2);
          margin: 0 10px;
          opacity: 0.5;
        }
        .magazine-contents-page {
          font-size: calc(0.7rem * var(--font-ratio));
          color: var(--theme-text);
          font-weight: bold;
        }

        /* Magazine Footer */
        .magazine-back-cover {
          padding: 80px 20px 40px;
          background-color: var(--theme-bg);
          text-align: center;
        }
        .back-masthead {
          font-family: var(--font-en-serif);
          font-size: 3rem;
          text-transform: uppercase;
          letter-spacing: 6px;
          color: var(--theme-accent);
          opacity: 0.1;
          margin-bottom: 20px;
        }
        .back-credit {
          font-family: var(--font-en-sans);
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: var(--theme-text);
          opacity: 0.6;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .back-fineprint {
          font-family: var(--font-en-sans);
          font-size: 0.5rem;
          letter-spacing: 1px;
          color: var(--theme-text);
          opacity: 0.3;
        }
      `}</style>
      
      <div className="magazine-frame">
        <div className="magazine-inner">
          <div className="magazine-masthead">
            <h1>Wedding</h1>
            <p>Special Editorial Edition</p>
          </div>
          
          <div id="section-home" style={{ position: 'relative' }}>
            {renderSection('main')}
          </div>

          <div className="magazine-ticker">
            <div className="ticker-track">
              <span>WEDDING EDITORIAL • {groomEn} & {brideEn} • </span>
              <span>WEDDING EDITORIAL • {groomEn} & {brideEn} • </span>
              <span>WEDDING EDITORIAL • {groomEn} & {brideEn} • </span>
              <span>WEDDING EDITORIAL • {groomEn} & {brideEn} • </span>
            </div>
          </div>
          
          {/* V2-4. Editor's Contents Page */}
          <div className="magazine-contents">
            <div className="magazine-contents-title">Contents</div>
            {sectionOrder.map((section, index) => {
              const isKr = optionInfo.magazineTocLanguage === 'kr';
              const getSectionName = (id) => {
                switch(id) {
                case 'intro': return isKr ? '인사말' : 'EDITOR\'S NOTE';
                case 'host': return isKr ? '혼주 정보' : 'HOST';
                case 'story': return isKr ? '우리의 이야기' : 'FEATURE STORY';
                case 'gallery': return isKr ? '갤러리' : 'LOOKBOOK';
                case 'calendar': return isKr ? '예식일' : 'THE DAY';
                case 'location': return isKr ? '오시는 길' : 'VENUE';
                case 'contact': return isKr ? '연락처' : 'DIRECTORY';
                case 'account': return isKr ? '마음 전하실 곳' : 'GIFT';
                case 'guestbook': return isKr ? '방명록' : 'LETTERS';
                case 'rsvp': return isKr ? '참석 의사 전달' : 'RSVP';
                case 'share': return isKr ? '공유하기' : 'SHARE';
                default: return isKr ? id : id.toUpperCase();
                }
              };
              return (
                <div key={`toc-${section.id}`} className="magazine-contents-item">
                  <span className="magazine-contents-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className={`magazine-contents-name ${isKr ? 'kr' : ''}`}>{getSectionName(section.id)}</span>
                  <span className="magazine-contents-dots"></span>
                  <span className="magazine-contents-page">{String(index + 1).padStart(2, '0')}</span>
                </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: '30px' }}>
            {sectionOrder.map(section => (
              <div key={section.id} className="magazine-section" id={`section-${section.id}`}>
                {section.id === 'intro' && <div className="magazine-label">[ Editor's Note ]</div>}
                {section.id === 'story' && <div className="magazine-label">[ Feature Story ]</div>}
                {renderSection(section.id)}
              </div>
            ))}
          </div>

          <div className="magazine-back-cover">
            <div className="back-masthead">Wedding</div>
            <div className="back-credit">Special Editorial Edition<br/>Published by {groomEn} & {brideEn}</div>
            <div className="back-fineprint">© D&WISE. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineTemplate;
