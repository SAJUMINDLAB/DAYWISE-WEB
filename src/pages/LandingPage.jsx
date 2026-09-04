import React, { useEffect, useState } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import GlobalHeader from '../components/layout/GlobalHeader';
import HeroSection from './LandingPage/HeroSection';
import PillarsSection from './LandingPage/PillarsSection';
import MockupSection from './LandingPage/MockupSection';
import TemplatesSection from './LandingPage/TemplatesSection';
import FeaturesSection from './LandingPage/FeaturesSection';
import HowItWorksSection from './LandingPage/HowItWorksSection';
import PricingSection from './LandingPage/PricingSection';
import ShowcaseSection from './LandingPage/ShowcaseSection';
import FinalCtaSection from './LandingPage/FinalCtaSection';
import FooterSection from './LandingPage/FooterSection';

import { Link } from 'react-router-dom';
import FadeIn from '../components/layout/FadeIn';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useBuilderStore(state => state.user);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.style.overflow = 'auto'; 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ flex: 1, width: '100%', backgroundColor: '#FDFBF7', fontFamily: 'var(--font-kr-sans)', position: 'relative', paddingBottom: '80px' }}>
      <GlobalHeader scrolled={scrolled} />
      <HeroSection user={user} />
      <FadeIn><TemplatesSection /></FadeIn>
      <FadeIn><ShowcaseSection /></FadeIn>
      <FadeIn><PillarsSection /></FadeIn>
      <FadeIn><MockupSection /></FadeIn>
      <FadeIn><FeaturesSection /></FadeIn>
      <FadeIn><HowItWorksSection /></FadeIn>
      <FadeIn><PricingSection user={user} /></FadeIn>
      <FadeIn><FinalCtaSection user={user} /></FadeIn>
      <FooterSection />

      {/* 아이디어 2: Sticky 하단 버튼 */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        padding: '20px', backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.05)',
        zIndex: 9999, display: 'flex', justifyContent: 'center',
        transform: scrolled ? 'translateY(0)' : 'translateY(100%)',
        opacity: scrolled ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}>
        <Link to={user ? "/editor" : "/auth"} style={{
          width: '100%', maxWidth: '400px', backgroundColor: '#D4AF37', color: '#fff',
          padding: '16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none',
          fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 8px 24px rgba(212,175,55,0.3)',
          transition: 'background-color 0.2s', cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B8962E'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
        >
          지금 무료로 청첩장 만들기
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
