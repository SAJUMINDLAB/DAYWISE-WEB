import React from 'react';
import FadeUp from '../../FadeUp';

const CoverText = ({
  textStyle, isOverlay, theme, optionInfo, mainInfo, formattedDate, dayName,
  containerStyle, commonTextProps, textColor
}) => {
  if (textStyle === 'style2') {
    return (
      <div style={{ ...containerStyle, textAlign: 'left', padding: '60px 30px' }}>
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0s' : '0s'} isFirst={true}>
          <p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '40px' }}>
            Wedding<br/>Invitation
          </p>
        </FadeUp>
        
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0.6s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(3.5rem * var(--font-ratio))', lineHeight: '1.1', marginBottom: '30px' }}>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.groomNameEn}</div>
            <div style={{ fontSize: 'calc(1.5rem * var(--font-ratio))', margin: '10px 0', color: isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.accent) }}>&amp;</div>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.brideNameEn}</div>
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.2s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.1rem * var(--font-ratio))', letterSpacing: 'calc(0.05rem * var(--font-ratio))', marginTop: '40px', fontWeight: theme.id === 'midnight-orange' && !isOverlay ? '500' : '300' }}>
            {formattedDate} {dayName}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm}
          </p>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.8s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.25rem * var(--font-ratio))', marginTop: '16px', color: textColor, opacity: theme.id === 'midnight-orange' && !isOverlay ? 0.8 : (isOverlay ? 0.9 : 1) }}>
            {mainInfo.location}
            {mainInfo.locationDetail && (
              <>
                <br />
                <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px', display: 'inline-block' }}>
                  {mainInfo.locationDetail}
                </span>
              </>
            )}
          </p>
        </FadeUp>
      </div>
    );
  } else if (textStyle === 'style3') {
    return (
      <div style={{ ...containerStyle, textAlign: 'right', padding: '60px 30px' }}>
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(3.5rem * var(--font-ratio))', lineHeight: '1.1', marginBottom: '30px' }}>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.groomNameEn}</div>
            <div style={{ fontSize: 'calc(1.5rem * var(--font-ratio))', margin: '10px 0', color: isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.accent) }}>&amp;</div>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.brideNameEn}</div>
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0.6s' : '0s'} isFirst={true}>
          <p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '40px' }}>
            Wedding<br/>Invitation
          </p>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.2s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.1rem * var(--font-ratio))', letterSpacing: 'calc(0.05rem * var(--font-ratio))', marginTop: '40px', fontWeight: theme.id === 'midnight-orange' && !isOverlay ? '500' : '300' }}>
            {formattedDate} {dayName}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm}
          </p>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.8s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.25rem * var(--font-ratio))', marginTop: '16px', color: textColor, opacity: theme.id === 'midnight-orange' && !isOverlay ? 0.8 : (isOverlay ? 0.9 : 1) }}>
            {mainInfo.location}
            {mainInfo.locationDetail && (
              <>
                <br />
                <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px', display: 'inline-block' }}>
                  {mainInfo.locationDetail}
                </span>
              </>
            )}
          </p>
        </FadeUp>
      </div>
    );
  } else if (textStyle === 'style4') {
    return (
      <div style={{ ...containerStyle, textAlign: 'center' }}>
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0s' : '0s'} isFirst={true}>
          <p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '30px' }}>
            결혼합니다
          </p>
        </FadeUp>
        
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0.6s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(2.5rem * var(--font-ratio))', lineHeight: '1.2', marginBottom: '20px' }}>
            <div style={{ fontWeight: '500' }}>{mainInfo.groomNameKo}</div>
            <div style={{ fontSize: 'calc(1.2rem * var(--font-ratio))', margin: '8px 0', color: isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.accent) }}>&amp;</div>
            <div style={{ fontWeight: '500' }}>{mainInfo.brideNameKo}</div>
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.2s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.05rem * var(--font-ratio))', letterSpacing: 'calc(0.05rem * var(--font-ratio))', marginTop: '40px', fontWeight: theme.id === 'midnight-orange' && !isOverlay ? '500' : '300' }}>
            {formattedDate} {dayName}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm}
          </p>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.8s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.15rem * var(--font-ratio))', marginTop: '12px', color: textColor, opacity: theme.id === 'midnight-orange' && !isOverlay ? 0.8 : (isOverlay ? 0.9 : 1) }}>
            {mainInfo.location}
            {mainInfo.locationDetail && (
              <>
                <br />
                <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px', display: 'inline-block' }}>
                  {mainInfo.locationDetail}
                </span>
              </>
            )}
          </p>
        </FadeUp>
      </div>
    );
  } else if (textStyle === 'style5') {
    return (
      <div style={{ ...containerStyle, textAlign: 'center' }}>
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0s' : '0s'} isFirst={true}>
          <p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '20px' }}>
            Wedding Invitation
          </p>
        </FadeUp>
        
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0.6s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(5rem * var(--font-ratio))', lineHeight: '1', marginBottom: '20px', fontWeight: '300', letterSpacing: '-2px' }}>
            {formattedDate ? (
              <>
                {String(new Date(mainInfo.date).getMonth() + 1).padStart(2, '0')}
                <span style={{ color: theme.id === 'midnight-orange' && !isOverlay ? theme.bg : theme.accent, margin: '0 12px', fontSize: '0.7em' }}>.</span>
                {String(new Date(mainInfo.date).getDate()).padStart(2, '0')}
              </>
            ) : ''}
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.2s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.8rem * var(--font-ratio))', lineHeight: '1.2', marginTop: '20px' }}>
            <span style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.groomNameEn}</span>
            <span style={{ fontSize: 'calc(1.2rem * var(--font-ratio))', margin: '0 8px', color: isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.accent) }}>&amp;</span>
            <span style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.brideNameEn}</span>
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.8s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.15rem * var(--font-ratio))', marginTop: '24px', color: textColor, opacity: theme.id === 'midnight-orange' && !isOverlay ? 0.8 : (isOverlay ? 0.9 : 1) }}>
            {mainInfo.location}
            {mainInfo.locationDetail && (
              <>
                <br />
                <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px', display: 'inline-block' }}>
                  {mainInfo.locationDetail}
                </span>
              </>
            )}
          </p>
        </FadeUp>
      </div>
    );
  } else {
    return (
      <div style={{ ...containerStyle, textAlign: 'center' }}>
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0s' : '0s'} isFirst={true}>
          <p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '30px' }}>
            Wedding Invitation
          </p>
        </FadeUp>
        
        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '0.6s' : '0s'} isFirst={true}>
          <div style={{ fontFamily: 'var(--font-en-serif)', fontSize: 'calc(3.2rem * var(--font-ratio))', lineHeight: '1.2', marginBottom: '20px' }}>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.groomNameEn}</div>
            <div style={{ fontSize: 'calc(1.5rem * var(--font-ratio))', margin: '8px 0', color: isOverlay ? '#fff' : (theme.id === 'midnight-orange' ? theme.bg : theme.accent) }}>&amp;</div>
            <div style={{ fontWeight: '500', fontStyle: 'var(--font-en-style)' }}>{mainInfo.brideNameEn}</div>
          </div>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.2s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.05rem * var(--font-ratio))', letterSpacing: 'calc(0.05rem * var(--font-ratio))', marginTop: '40px', fontWeight: theme.id === 'midnight-orange' && !isOverlay ? '500' : '300' }}>
            {formattedDate} {dayName}. {mainInfo.timeHour}:{mainInfo.timeMinute} {mainInfo.timeAmPm}
          </p>
        </FadeUp>

        <FadeUp active={optionInfo.motionEffect} delay={optionInfo.cinematicIntro ? '1.8s' : '0s'} isFirst={true}>
          <p style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.15rem * var(--font-ratio))', marginTop: '12px', color: textColor, opacity: theme.id === 'midnight-orange' && !isOverlay ? 0.8 : (isOverlay ? 0.9 : 1) }}>
            {mainInfo.location}
            {mainInfo.locationDetail && (
              <>
                <br />
                <span style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px', display: 'inline-block' }}>
                  {mainInfo.locationDetail}
                </span>
              </>
            )}
          </p>
        </FadeUp>
      </div>
    );
  }
};

export default CoverText;
