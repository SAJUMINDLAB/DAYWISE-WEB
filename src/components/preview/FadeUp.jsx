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
        // 애니메이션 시간을 1.6s -> 2.2s로 늘려 더욱 천천히 우아하게. 
        // 처음 1번 나타난 이후(hasShown)에는 delay를 0s로 무시해서 스크롤 시 바로 반응하게 함.
        transition: `opacity 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${hasShown ? '0s' : delay}, transform 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${hasShown ? '0s' : delay}`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default FadeUp;
