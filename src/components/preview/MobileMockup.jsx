import React from 'react';
import InvitationPreview from './InvitationPreview';
import CinematicIntroOverlay from './CinematicIntroOverlay';
import { useBuilderStore } from '../../store/useBuilderStore';

const MobileMockup = () => {
  const setScrollY = useBuilderStore(state => state.setScrollY);
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const [viewMode, setViewMode] = React.useState('mobile'); // 'mobile' | 'web'
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      // 120px for top toggle and bottom text clearance
      const availableHeight = window.innerHeight - 120; 
      if (availableHeight < 896) {
        setScale(availableHeight / 896);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (e) => {
    setScrollY(e.target.scrollTop);
  };

  return (
    <div className="preview-section">
      <div className="preview-toggle">
        <button 
          className={viewMode === 'mobile' ? 'active' : ''} 
          onClick={() => setViewMode('mobile')}
        >
          📱 모바일
        </button>
        <button 
          className={viewMode === 'web' ? 'active' : ''} 
          onClick={() => setViewMode('web')}
        >
          💻 웹
        </button>
      </div>

      <div 
        className={viewMode === 'mobile' ? 'mobile-mockup' : 'web-mockup'}
        style={{ transform: viewMode === 'mobile' ? `scale(${scale}) translateZ(0)` : 'translateZ(0)', transformOrigin: 'center center' }}
      >
        {/* Dynamic header / notch area could go here */}
        
        <CinematicIntroOverlay />

        <div key={`preview-${optionInfo.motionEffect}`} className="mobile-screen-content" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }} onScroll={handleScroll}>
          <InvitationPreview />
        </div>
      </div>
      
      {/* Tiny descriptive text below the mockup */}
      <div style={{ position: 'absolute', bottom: '20px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
        PC 모니터 환경에 따라 미리보기 화면의 글꼴 크기가 실제보다 작게 보일 수 있습니다.<br/>
        제작 완료 후 스마트폰에서 직접 열어보시면 훨씬 더 정확한 비율로 확인하실 수 있습니다.
      </div>
    </div>
  );
};

export default MobileMockup;
