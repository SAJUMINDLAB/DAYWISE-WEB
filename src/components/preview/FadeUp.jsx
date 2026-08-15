import React, { useRef, useEffect, useState } from 'react';

const FadeUp = ({ children, active, delay = '0s', isFirst = false, style = {}, className = '' }) => {
  const [isVisible, setIsVisible] = useState(!active);
  const domRef = useRef();

  useEffect(() => {
    if (!active) {
      setIsVisible(true);
      return;
    }
    
    // 강제 노출 모드 (첫 화면 요소)
    if (isFirst) {
      // 컴포넌트 마운트 직후 다음 프레임에 렌더링되도록 약간의 지연
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
    
    setIsVisible(false); // reset
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 }); // threshold 0으로 변경하여 1px이라도 보이면 트리거
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [active, isFirst]);

  return (
    <div 
      ref={domRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default FadeUp;
