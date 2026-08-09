import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';
import CoverText from './coverStyles/CoverText';
import CoverImage from './coverStyles/CoverImage';

const MainCover = ({ theme, onAdminAccess }) => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const scrollY = useBuilderStore(state => state.scrollY);
  const timerRef = React.useRef(null);

  const handlePointerDown = () => {
    timerRef.current = setTimeout(() => {
      if (onAdminAccess) onAdminAccess();
    }, 5000); 
  };

  const handlePointerUpOrLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const dateObj = new Date(mainInfo.date);
  const formattedDate = isNaN(dateObj) ? '' : `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}.`;
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayName = isNaN(dateObj) ? '' : days[dateObj.getDay()];

  const layout = mainInfo.coverLayout || 'layout1';
  const isOverlay = layout === 'layout3';
  const textColor = isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.text);
  const accentColor = isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? 'rgba(0,0,0,0.4)' : theme.accent);

  const textStyle = mainInfo.coverTextStyle || 'style1';

  const basePadding = theme.id === 'midnight-orange' && !isOverlay ? '80px 20px 60px 20px' : '60px 20px';
  const baseBg = theme.id === 'midnight-orange' && !isOverlay ? theme.accent : 'transparent';
  const baseMarginBottom = theme.id === 'midnight-orange' && !isOverlay ? '-30px' : '0';
  
  const commonTextProps = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUpOrLeave,
    onPointerLeave: handlePointerUpOrLeave,
    onTouchStart: handlePointerDown,
    onTouchEnd: handlePointerUpOrLeave,
    onContextMenu: (e) => { e.preventDefault(); e.stopPropagation(); return false; },
    style: {
      fontFamily: 'var(--font-en-serif)', fontStyle: 'var(--font-en-style)',
      fontSize: 'calc(0.85rem * var(--font-ratio))', letterSpacing: 'calc(0.2rem * var(--font-ratio))',
      color: accentColor, textTransform: 'uppercase',
      userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', cursor: 'default'
    }
  };

  const containerStyle = {
    padding: basePadding,
    position: 'relative',
    zIndex: 10,
    backgroundColor: baseBg,
    color: textColor,
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    marginBottom: baseMarginBottom,
    width: '100%',
    textShadow: isOverlay ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
  };

  const textContent = (
    <CoverText 
      textStyle={textStyle} isOverlay={isOverlay} theme={theme} optionInfo={optionInfo}
      mainInfo={mainInfo} formattedDate={formattedDate} dayName={dayName}
      containerStyle={containerStyle} commonTextProps={commonTextProps}
      textColor={textColor} accentColor={accentColor}
    />
  );

  const imageContent = (
    <CoverImage optionInfo={optionInfo} mainInfo={mainInfo} isOverlay={isOverlay} scrollY={scrollY} />
  );

  if (layout === 'layout1') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {textContent}
        {imageContent}
      </div>
    );
  }
  
  if (layout === 'layout2') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: '0px' }}>{imageContent}</div>
        {textContent}
      </div>
    );
  }
  
  if (layout === 'layout3') {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          {imageContent}
        </div>
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
          {textContent}
        </div>
      </div>
    );
  }

  if (layout === 'layout5') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px 30px 20px', textAlign: 'center', borderBottom: `1px solid ${theme.accent}22` }}>
          <FadeUp active={optionInfo.motionEffect} delay={'0s'} isFirst={true}>
            <p 
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUpOrLeave}
              onPointerLeave={handlePointerUpOrLeave}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUpOrLeave}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
              style={{ 
                fontFamily: 'var(--font-en-serif)', fontStyle: 'var(--font-en-style)', 
                fontSize: 'calc(0.75rem * var(--font-ratio))', letterSpacing: 'calc(0.15rem * var(--font-ratio))', 
                marginBottom: '16px', color: theme.accent, textTransform: 'uppercase',
                userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', cursor: 'default'
              }}
            >Wedding Day</p>
          </FadeUp>
          <FadeUp active={optionInfo.motionEffect} delay={'0.3s'} isFirst={true}>
            <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(2.4rem * var(--font-ratio))', lineHeight: '1.2' }}>
              <span style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.groomNameEn}</span>
              <span style={{ fontSize: 'calc(1.2rem * var(--font-ratio))', margin: '0 10px', color: theme.accent }}>&amp;</span>
              <span style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.brideNameEn}</span>
            </div>
          </FadeUp>
          <FadeUp active={optionInfo.motionEffect} delay={'0.6s'} isFirst={true}>
            <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(0.8rem * var(--font-ratio))', marginTop: '16px', fontWeight: '300', color: theme.text, opacity: 0.7 }}>
              {formattedDate} {dayName}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm} · {mainInfo.location}
            </p>
          </FadeUp>
        </div>
        <div style={{ flex: 1 }}>
          <FadeUp active={optionInfo.motionEffect} delay={'0.9s'} isFirst={true}>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <img 
                src={mainInfo.mainImage} 
                alt="Main Cover" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </FadeUp>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {textContent}
      {imageContent}
    </div>
  );
};

export default MainCover;
