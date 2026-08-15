import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import './CinematicTemplate.css';

const CinematicTemplate = ({ sectionOrder, renderSection, theme }) => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const groomEn = mainInfo.groomNameEn || 'Groom';
  const brideEn = mainInfo.brideNameEn || 'Bride';
  const groomKo = mainInfo.groomNameKo || '신랑';
  const brideKo = mainInfo.brideNameKo || '신부';
  const dateObj = mainInfo.date ? new Date(mainInfo.date) : new Date();
  const shape = mainInfo.mainImageShape;
  const coverStyle = mainInfo.coverTextStyle || 'style1';
  
  return (
    <div className="template-cinematic" style={{ '--theme-text': theme.text, '--theme-bg': theme.bg }}>
        <div className="cinematic-grain"></div>
        {theme.id !== 'midnight-orange' && (
          <>
            <div className="cinematic-light-leak-1"></div>
            <div className="cinematic-light-leak-2"></div>
          </>
        )}
        
        <div id="section-home" style={{ backgroundColor: theme.bg, paddingBottom: '100px', position: 'relative' }}>
        {/* Cover top padding area with accent color for midnight-orange to remove the top gap */}
        {theme.id === 'midnight-orange' && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '15vh', backgroundColor: theme.accent, zIndex: 0 }}></div>
        )}
        
        {renderSection('main')}
        
        {/* Zero-height wrapper to position text relative to the bottom of the image */}
        <div style={{ position: 'relative', width: '100%', height: 0, zIndex: 20 }}>
          <div className="movie-title-block" style={{ bottom: shape === 'circle' ? '140px' : '100px' }}>
            {coverStyle === 'style4' ? (
              <>
                <div className="movie-title-main" style={{ fontFamily: 'var(--font-kr-serif)' }}>
                  {groomKo}<br/>& {brideKo}
                </div>
                <div className="movie-title-sub" style={{ fontFamily: 'var(--font-kr-sans)' }}>결혼합니다</div>
              </>
            ) : coverStyle === 'style5' ? (
              <>
                <div className="movie-title-main" style={{ fontSize: '5.5rem', letterSpacing: '-2px', paddingBottom: '10px', fontWeight: '300' }}>
                  {String(dateObj.getMonth() + 1).padStart(2, '0')}
                  <span style={{ color: theme.accent, fontSize: '0.6em', margin: '0 12px' }}>.</span>
                  {String(dateObj.getDate()).padStart(2, '0')}
                </div>
                <div className="movie-title-sub" style={{ fontSize: '0.85rem', letterSpacing: '8px' }}>{groomEn} & {brideEn}</div>
              </>
            ) : (
              <>
                <div className="movie-title-main">
                  {groomEn}<br/>& {brideEn}
                </div>
                <div className="movie-title-sub">A Love Story</div>
              </>
            )}
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

          const isFilmStrip = section.id === 'gallery' && optionInfo.showFilmStrip !== false;

          return (
            <div key={section.id} className={`cinematic-section ${isFilmStrip ? 'film-strip-enabled' : ''}`} id={`section-${section.id}`}>
              {section.id === 'calendar' && optionInfo.showSlatePlate !== false && (
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
