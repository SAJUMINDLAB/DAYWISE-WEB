import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const LocationArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const locationInfo = useBuilderStore(state => state.locationInfo);
  const mapContainer = React.useRef(null);
  
  // 디버깅 오버레이용 상태
  const [debugLog, setDebugLog] = React.useState('Init...');

  React.useEffect(() => {
    if (locationInfo.mapType === 'image') return;
    
    let attempts = 0;
    const maxAttempts = 50;
    
    const tryInitMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryInitMap, 200);
        } else {
          setDebugLog('Timeout: Kakao SDK not loaded');
        }
        return;
      }
      
      window.kakao.maps.load(() => {
        if (!mapContainer.current) return;
        
        try {
          const geocoder = new window.kakao.maps.services.Geocoder();
          
          geocoder.addressSearch(locationInfo.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              
              const options = {
                center: coords,
                level: 4
              };
              
              const checkAndRenderMap = () => {
                if (!mapContainer.current) return;
                
                const width = mapContainer.current.clientWidth;
                const height = mapContainer.current.clientHeight;
                
                if (width === 0 || height === 0) {
                  setDebugLog(`Waiting for size... W:${width} H:${height}`);
                  setTimeout(checkAndRenderMap, 100);
                  return;
                }
                
                try {
                  const staticMapOption = {
                    center: coords,
                    level: 4,
                    marker: {
                      position: coords
                    }
                  };
                  
                  // 모바일 렌더링 버그(타일 누락)를 원천 차단하기 위해 StaticMap 사용
                  new window.kakao.maps.StaticMap(mapContainer.current, staticMapOption);
                  
                  setDebugLog(`StaticMap OK. Size: ${width}x${height}`);
                } catch (err) {
                  setDebugLog(`Map error: ${err.message}`);
                }
              };
              
              checkAndRenderMap();
            } else {
              setDebugLog(`Geocoder Error: ${status}`);
            }
          });
        } catch (e) {
          setDebugLog(`Kakao Error: ${e.message}`);
        }
      });
    };
    
    tryInitMap();
  }, [locationInfo.address, locationInfo.mapType]);

  const selectedFontSubtitle = useBuilderStore(state => state.selectedFontSubtitle);

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', position: 'relative', zIndex: 10, backgroundColor: 'transparent' }}>
        <h3 style={{ 
          fontFamily: optionInfo.magazineTocLanguage === 'kr' ? 'var(--font-kr-serif)' : `'${selectedFontSubtitle}', serif`, fontSize: 'calc(0.95rem * var(--font-ratio))', textAlign: 'center', marginBottom: '30px', color: optionInfo.subtitleColor || theme.accent, letterSpacing: 'calc(0.2rem * var(--font-ratio))'
        }}>
          {optionInfo.magazineTocLanguage === 'kr' ? '장소' : 'LOCATION'}
        </h3>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.2rem * var(--font-ratio))', fontWeight: '600', marginBottom: '8px' }}>
            {locationInfo.venueName}
            {locationInfo.venueDetail && (
              <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>
                {locationInfo.venueDetail}
              </div>
            )}
          </div>
          <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, opacity: 0.85, marginBottom: '4px' }}>
            {locationInfo.address}
          </div>
          {locationInfo.tel && (
            <div style={{ fontSize: 'calc(0.85rem * var(--font-ratio))', color: theme.text, opacity: 0.7 }}>
              tel. {locationInfo.tel}
            </div>
          )}
        </div>

        {locationInfo.mapType === 'image' && locationInfo.mapImage ? (
          <div style={{ width: '100%', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
            <img src={locationInfo.mapImage} alt="map" style={{ width: '100%', display: 'block' }} />
          </div>
        ) : (
          <div style={{ 
            width: '100%', height: '240px', backgroundColor: '#eee', marginBottom: '16px', 
            borderRadius: '8px', overflow: 'hidden', position: 'relative'
          }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
          {locationInfo.navButtons.naver && (
            <a href={`https://map.naver.com/v5/search/${encodeURIComponent(locationInfo.address)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '12px 0', textAlign: 'center', backgroundColor: 'transparent', border: `1px solid ${theme.text}`, color: theme.text, textDecoration: 'none', borderRadius: '6px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: '500', fontFamily: 'var(--font-kr-sans)', letterSpacing: 'calc(0.02rem * var(--font-ratio))' }}>
              네이버 지도
            </a>
          )}
          {locationInfo.navButtons.kakao && (
            <a href={`https://map.kakao.com/link/search/${encodeURIComponent(locationInfo.address)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '12px 0', textAlign: 'center', backgroundColor: 'transparent', border: `1px solid ${theme.text}`, color: theme.text, textDecoration: 'none', borderRadius: '6px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: '500', fontFamily: 'var(--font-kr-sans)', letterSpacing: 'calc(0.02rem * var(--font-ratio))' }}>
              카카오맵
            </a>
          )}
          {locationInfo.navButtons.tmap && (
            <a href={`tmap://search?name=${encodeURIComponent(locationInfo.address)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '12px 0', textAlign: 'center', backgroundColor: 'transparent', border: `1px solid ${theme.text}`, color: theme.text, textDecoration: 'none', borderRadius: '6px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: '500', fontFamily: 'var(--font-kr-sans)', letterSpacing: 'calc(0.02rem * var(--font-ratio))' }}>
              티맵
            </a>
          )}
        </div>

        {locationInfo.useTransportation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {locationInfo.transportation.map(item => (
              item.content.trim() && (
                <div key={item.id}>
                  <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', fontWeight: 'bold', color: theme.accent, marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: 'calc(0.85rem * var(--font-ratio))', color: theme.text, opacity: 0.85, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.content}</div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default LocationArea;
