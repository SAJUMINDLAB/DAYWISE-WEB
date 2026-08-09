import React, { useEffect, useState } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import GlobalHeader from '../components/layout/GlobalHeader';
import HeroSection from './LandingPage/HeroSection';
import PillarsSection from './LandingPage/PillarsSection';
import MockupSection from './LandingPage/MockupSection';
import TemplatesSection from './LandingPage/TemplatesSection';
import FeaturesSection from './LandingPage/FeaturesSection';
import HowItWorksSection from './LandingPage/HowItWorksSection';
import ShowcaseSection from './LandingPage/ShowcaseSection';
import FinalCtaSection from './LandingPage/FinalCtaSection';
import FooterSection from './LandingPage/FooterSection';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useBuilderStore(state => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    document.body.style.overflow = 'auto'; // Force clear any scroll locks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ flex: 1, width: '100%', backgroundColor: '#FDFBF7', fontFamily: 'var(--font-kr-sans)' }}>
      <GlobalHeader scrolled={scrolled} />
      <HeroSection user={user} />
      <TemplatesSection />
      <ShowcaseSection />
      <PillarsSection />
      <MockupSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FinalCtaSection user={user} />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
