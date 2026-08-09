import React from 'react';
import FooterSection from '../../pages/LandingPage/FooterSection';
import GlobalHeader from './GlobalHeader';

const PageLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FDFBF7', fontFamily: 'var(--font-kr-sans)' }}>
      <GlobalHeader scrolled={true} />
      <div style={{ flex: 1, padding: '60px 40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {children}
      </div>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
