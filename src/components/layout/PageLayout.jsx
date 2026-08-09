import React from 'react';
import FooterSection from '../../pages/LandingPage/FooterSection';

const PageLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div style={{ flex: 1, padding: '60px 40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {children}
      </div>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
