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
    // 랜딩 페이지에 한하여 모바일에서도 PC 화면(1280px)으로 렌더링되도록 뷰포트 강제 변경
    const metaTag = document.querySelector('meta[name="viewport"]');
    const originalContent = metaTag ? metaTag.getAttribute('content') : '';
    
    if (metaTag) {
      metaTag.setAttribute('content', 'width=1280');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    document.body.style.overflow = 'auto'; // Force clear any scroll locks
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // 다른 페이지(에디터 등)로 이동할 때 뷰포트 원상 복구
      if (metaTag && originalContent) {
        metaTag.setAttribute('content', originalContent);
      }
    };
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
