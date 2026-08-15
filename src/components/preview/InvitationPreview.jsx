import React from 'react';
import { useBuilderStore } from '../../store/useBuilderStore';
import ParticlesOverlay from './ParticlesOverlay';
import FadeUp from './FadeUp';
import Calendar from './Calendar';
import { X, Play, Menu } from 'lucide-react';

// Extracted Modals
import RsvpModal from './RsvpModal';
import GuestbookWriteModal from './GuestbookWriteModal';
import GuestbookListModal from './GuestbookListModal';
import AdminLoginModal from './AdminLoginModal';

// Extracted Sections
import MainCover from './sections/MainCover';
import IntroArea from './sections/IntroArea';
import HostArea from './sections/HostArea';
import StoryArea from './sections/StoryArea';
import GalleryArea from './sections/GalleryArea';
import LocationArea from './sections/LocationArea';
import AccountArea from './sections/AccountArea';
import GuestbookArea from './sections/GuestbookArea';
import RsvpArea from './sections/RsvpArea';
import RsvpEmphasis from './sections/RsvpEmphasis';
import ShareArea from './sections/ShareArea';

// Templates
import ClassicTemplate from './templates/ClassicTemplate';
import MagazineTemplate from './templates/MagazineTemplate';
import CinematicTemplate from './templates/CinematicTemplate';
import BentoTemplate from './templates/BentoTemplate';

const themeStyles = {
  'cream-beige': { bg: '#FDFBF7', text: '#333333', accent: '#B0946E', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'epure': { bg: '#ffffff', text: '#222222', accent: '#aaaaaa', fontTitle: 'var(--font-en-sans)', fontBody: 'var(--font-kr-sans)' },
  'vanilla-cream': { bg: '#fdfbf7', text: '#4a4036', accent: '#dcae78', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'royal-navy': { bg: '#141E30', text: '#F9F9F9', accent: '#E0C097', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'golden-hour': { bg: '#fffdfa', text: '#332211', accent: '#8B2500', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'sage-green': { bg: '#F4F5F2', text: '#3D4C41', accent: '#849C8D', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'lavender-blush': { bg: '#FBF9FA', text: '#4A3B42', accent: '#B497A6', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'classic-charcoal': { bg: '#F9F9F9', text: '#333333', accent: '#555555', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'warm-terracotta': { bg: '#FFF9F5', text: '#4A352F', accent: '#C47D68', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'sunset-breeze': { bg: '#FFF7F2', text: '#4A332A', accent: '#E86A41', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'midnight-orange': { bg: '#1A1817', text: '#F2EFEB', accent: '#F25C05', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'deep-forest': { bg: '#1A2421', text: '#F0F4F1', accent: '#D4AF37', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'dusty-blue': { bg: '#F5F7FA', text: '#405368', accent: '#6B7F96', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'vintage-wine': { bg: '#2D1B1E', text: '#FDECEF', accent: '#E6A8B6', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' },
  'default': { bg: '#FDFBF7', text: '#333333', accent: '#8C9B90', title: '#333', fontTitle: 'var(--font-en-serif)', fontBody: 'var(--font-kr-serif)' }
};

const InvitationPreview = () => {
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const selectedTheme = useBuilderStore(state => state.selectedTheme);
  const selectedFont = useBuilderStore(state => state.selectedFont);
  const selectedFontEn = useBuilderStore(state => state.selectedFontEn);
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const customColors = useBuilderStore(state => state.customColors);
  const sectionOrder = useBuilderStore(state => state.sectionOrder);
  
  // States that were needed for modals and modals display
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);
  const guestbookInfo = useBuilderStore(state => state.guestbookInfo);
  const addGuestbookEntry = useBuilderStore(state => state.addGuestbookEntry);
  const removeGuestbookEntry = useBuilderStore(state => state.removeGuestbookEntry);
  const bgmInfo = useBuilderStore(state => state.bgmInfo);

  const [fullscreenImage, setFullscreenImage] = React.useState(null);
  const [showRsvpModal, setShowRsvpModal] = React.useState(false);
  const [showGuestbookModal, setShowGuestbookModal] = React.useState(false);
  const [showGuestbookListModal, setShowGuestbookListModal] = React.useState(false);
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);

  // BGM 상태 및 오디오 제어
  const [isPlaying, setIsPlaying] = React.useState(bgmInfo.autoPlay);
  const audioRef = React.useRef(null);

  // 시네마틱 인트로 상태는 삭제됨

  const audioTracks = {
    'track1': 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
    'track2': 'https://www.mfiles.co.uk/mp3-downloads/mendelssohn-wedding-march.mp3',
    'track3': 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3'
  };

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn('자동 재생이 브라우저 정책에 의해 차단되었습니다.', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, bgmInfo.selectedTrack]);

  const fontRatioList = { 'S': 0.9, 'M': 1, 'L': 1.15, 'XL': 1.3, '2XL': 1.5, '3XL': 1.7 };
  const fontRatio = fontRatioList[optionInfo.fontSize] || 1;
  const baseFontSize = '1rem';
  const particlesType = optionInfo.particlesEffect ? (optionInfo.particleType || 'snow') : 'none';

  React.useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    if (optionInfo.pageZoom) {
      meta.content = 'width=device-width, initial-scale=1.0';
    } else {
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    }
  }, [optionInfo.pageZoom]);

  // Helper to get text color based on background luminance
  const getContrastTextColor = (hexColor) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#222222' : '#FFFFFF';
  };

  const theme = selectedTheme === 'custom'
    ? { 
        id: 'custom',
        bg: customColors.bg, 
        text: getContrastTextColor(customColors.bg), 
        accent: customColors.accent, 
        title: getContrastTextColor(customColors.bg),
        fontTitle: `'${selectedFontEn}', sans-serif`, 
        fontBody: `'${selectedFont}', sans-serif` 
      }
    : { id: selectedTheme, ...(themeStyles[selectedTheme] || themeStyles['default']) };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '480px', 
      margin: '0 auto', 
      backgroundColor: theme.bg, 
      color: theme.text,
      '--font-kr-serif': selectedFont === 'Aujournuit Myeongjo' ? "'Aujournuit', 'Noto Serif KR', serif" : `'${selectedFont}', serif`,
      '--font-kr-sans': selectedFont === 'Aujournuit Myeongjo' ? "'Aujournuit', 'Noto Sans KR', sans-serif" : `'${selectedFont}', sans-serif`,
      '--font-en-serif': `'${selectedFontEn === 'Cormorant Italic' ? 'Cormorant Garamond' : selectedFontEn}', serif`,
      '--font-en-sans': `'${selectedFontEn === 'Cormorant Italic' ? 'Cormorant Garamond' : selectedFontEn}', sans-serif`,
      '--font-en-style': selectedFontEn === 'Cormorant Italic' ? 'italic' : 'normal',
      minHeight: '100%',
      paddingBottom: '40px',
      overflowX: 'hidden',
      position: 'relative',
      '--base-font-size': baseFontSize,
      '--font-ratio': fontRatio,
      fontSize: 'calc(var(--base-font-size) * var(--font-ratio))',
      fontFamily: `'${selectedFont}', sans-serif`
    }}>
      
      {/* 4. Cinematic Intro - Removed per user request */}
      
      {/* 3. Film Grain Effect */}
      {optionInfo.texture && <div className="film-grain" />}
      
      {/* 2. Particles Overlay */}
      {particlesType !== 'none' && <ParticlesOverlay type={particlesType} />}

      {(() => {
        const renderSection = (sectionId) => {
          if (sectionId === 'main') {
            return <MainCover key="main" theme={theme} onAdminAccess={() => setShowAdminLogin(true)} />;
          }
          switch (sectionId) {
            case 'intro': return <IntroArea key="intro" theme={theme} />;
            case 'host': return <HostArea key="host" theme={theme} />;
            case 'calendar': return (
              <FadeUp key="calendar" active={optionInfo.motionEffect}>
                <Calendar 
                  dateString={mainInfo.date} 
                  themeAccent={theme.accent} 
                  themeText={theme.text}
                  groomName={mainInfo.groomNameKo} 
                  brideName={mainInfo.brideNameKo} 
                />
              </FadeUp>
            );
            case 'story': return <StoryArea key="story" theme={theme} />;
            case 'gallery': 
              if (!useBuilderStore.getState().galleryInfo.useGallery) return null;
              return <div id="section-gallery" key="gallery"><GalleryArea theme={theme} setFullscreenImage={setFullscreenImage} /></div>;
            case 'location': return <LocationArea key="location" theme={theme} />;
            case 'account': return <AccountArea key="account" theme={theme} />;
            case 'guestbook': return (
              <div id="section-guestbook" key="guestbook">
                <GuestbookArea 
                  theme={theme} 
                  setShowGuestbookModal={setShowGuestbookModal} 
                  setShowGuestbookListModal={setShowGuestbookListModal} 
                />
              </div>
            );
            case 'rsvp': return <div id="section-rsvp" key="rsvp"><RsvpArea theme={theme} setShowRsvpModal={setShowRsvpModal} /></div>;
            default: return null;
          }
        };

        const templateProps = { sectionOrder, renderSection, theme };

        switch (selectedTemplate) {
          case 'magazine': return <MagazineTemplate {...templateProps} />;
          case 'cinematic': return <CinematicTemplate {...templateProps} />;
          case 'bento': return <BentoTemplate {...templateProps} />;
          case 'classic':
          default: return <ClassicTemplate {...templateProps} />;
        }
      })()}
      
      {/* Lightbox Modal */}
      {fullscreenImage && (
        <div 
          onClick={() => setFullscreenImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: '#000000', zIndex: 10000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'zoom-out', animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={28} />
          </button>
          <img src={fullscreenImage} alt="fullscreen" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', animation: 'scaleIn 0.2s ease-out' }} />
        </div>
      )}

      <ShareArea theme={theme} />

      {/* Modals */}
      {showAdminLogin && (
        <AdminLoginModal theme={theme} onClose={() => setShowAdminLogin(false)} />
      )}

      <RsvpEmphasis theme={theme} setShowRsvpModal={setShowRsvpModal} />

      {showRsvpModal && (
        <RsvpModal theme={theme} rsvpInfo={rsvpInfo} onClose={() => setShowRsvpModal(false)} />
      )}

      {showGuestbookModal && (
        <GuestbookWriteModal 
          theme={theme} 
          onClose={() => setShowGuestbookModal(false)} 
          addGuestbookEntry={addGuestbookEntry}
        />
      )}

      {showGuestbookListModal && (
        <GuestbookListModal 
          theme={theme} 
          guestbookInfo={guestbookInfo} 
          onClose={() => setShowGuestbookListModal(false)} 
          removeGuestbookEntry={removeGuestbookEntry}
        />
      )}

      {/* Floating BGM Player */}
      {bgmInfo.useBgm && (
        <>
          <audio 
            ref={audioRef} 
            src={bgmInfo.selectedTrack === 'custom' ? bgmInfo.customTrackUrl : (audioTracks[bgmInfo.selectedTrack] || audioTracks['track1'])} 
            loop 
          />
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            style={selectedTemplate === 'bento' ? {
              position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 100,
              width: isPlaying ? '140px' : '90px', height: '32px', borderRadius: '16px',
              backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            } : { 
              position: 'fixed', bottom: '30px', right: '20px', zIndex: 50,
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: '#fff', border: `1px solid ${theme.border || 'rgba(0,0,0,0.1)'}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: 'pointer', transition: 'all 0.3s ease',
              animation: isPlaying ? 'pulse 2s infinite' : 'none'
            }}
          >
            {selectedTemplate === 'bento' ? (
              <>
                {isPlaying ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>Now Playing</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                      <div style={{ width: '2px', backgroundColor: '#fff', borderRadius: '1px', animation: 'eq 0.8s ease-in-out infinite alternate' }} />
                      <div style={{ width: '2px', backgroundColor: '#fff', borderRadius: '1px', animation: 'eq 1.2s ease-in-out infinite alternate-reverse', animationDelay: '0.2s' }} />
                      <div style={{ width: '2px', backgroundColor: '#fff', borderRadius: '1px', animation: 'eq 0.9s ease-in-out infinite alternate', animationDelay: '0.4s' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Play size={14} color="#fff" fill="#fff" />
                    <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>BGM</div>
                  </div>
                )}
              </>
            ) : (
              isPlaying ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
                  <div style={{ width: '4px', backgroundColor: ['royal-navy', 'deep-forest', 'midnight-orange'].includes(selectedTheme) ? theme.accent : theme.text, borderRadius: '2px', animation: 'eq 0.8s ease-in-out infinite alternate' }} />
                  <div style={{ width: '4px', backgroundColor: ['royal-navy', 'deep-forest', 'midnight-orange'].includes(selectedTheme) ? theme.accent : theme.text, borderRadius: '2px', animation: 'eq 1.2s ease-in-out infinite alternate-reverse', animationDelay: '0.2s' }} />
                  <div style={{ width: '4px', backgroundColor: ['royal-navy', 'deep-forest', 'midnight-orange'].includes(selectedTheme) ? theme.accent : theme.text, borderRadius: '2px', animation: 'eq 0.9s ease-in-out infinite alternate', animationDelay: '0.4s' }} />
                </div>
              ) : (
                <Play 
                  size={20} 
                  color={['royal-navy', 'deep-forest', 'midnight-orange'].includes(selectedTheme) ? theme.accent : theme.text} 
                  fill="none"
                  style={{ marginLeft: '2px' }} 
                />
              )
            )}
            
            <style>{`
              @keyframes eq { 0% { height: 4px; } 100% { height: 16px; } }
              @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.1); } 70% { box-shadow: 0 0 0 10px rgba(0,0,0,0); } 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); } }
            `}</style>
          </div>
        </>
      )}
    </div>
  );
};

export default InvitationPreview;
