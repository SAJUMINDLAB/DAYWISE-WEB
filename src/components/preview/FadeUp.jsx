import React, { useRef, useEffect, useState } from 'react';

const FadeUp = ({ children, active, delay = '0s', isFirst = false, style = {}, className = '' }) => {
  const [isVisible, setIsVisible] = useState(!active);
  const [hasShown, setHasShown] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (!active) {
      setIsVisible(true);
      return;
    }
    
    // 강제 노출 모드 (첫 화면 요소)
    // isFirst라도 스크롤해서 안보이게 되면 다시 애니메이션 되도록 observer를 사용하되,
    // 초기 로딩 시 깜빡임을 방지하기 위해 일단 먼저 켜줍니다.
    if (isFirst) {
      setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, 50);
    } else {
      setIsVisible(false); // reset
    }
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasShown(true);
        } else {
          // 화면에서 벗어나면 다시 false로 만들어 스크롤 시 재발동되게 함
          setIsVisible(false);
        }
      });
    }, { threshold: 0.05 }); // 약간 화면에 들어왔을 때 발동
    
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
        // 프리미엄 2.8s 모션 효과 (끝부분이 더 부드럽게 감속하는 곡선 적용)
        // 처음 1회이후(hasShown)면 delay를 0s로 해서 스크롤시 즉시 보이게 함
        transition: `opacity 2.8s cubic-bezier(0.22, 1, 0.36, 1) ${hasShown ? '0s' : delay}, transform 2.8s cubic-bezier(0.22, 1, 0.36, 1) ${hasShown ? '0s' : delay}`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default FadeUp;
