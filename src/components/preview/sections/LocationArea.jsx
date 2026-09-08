import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const LocationArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const locationInfo = useBuilderStore(state => state.locationInfo);
  const mapContainer = React.useRef(null);
  const mapInstance = React.useRef(null);
  const mapCoords = React.useRef(null);

  React.useEffect(() => {
    if (!mapContainer.current) return;
    
    // 방어 1: 지도 컨테이너의 크기 변경을 실시간 감지하여 relayout 호출
    // (FadeUp 애니메이션, 브라우저 주소창 변화 등에 대응)
    const observer = new ResizeObserver(() => {
      if (mapInstance.current && mapCoords.current) {
        mapInstance.current.relayout();
        mapInstance.current.setCenter(mapCoords.current);
      }
    });
    
    observer.observe(mapContainer.current);

    // 방어 2: 지도 영역이 화면에 보이기 시작하면 relayout 호출
    // FadeUp 애니메이션(2.8초) 도중/이후에 타일이 안 그려지는 모바일 버그 방어
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && mapInstance.current && mapCoords.current) {
          // FadeUp이 2.8초짜리이므로, 애니메이션 진행 중/완료 후 여러 번 relayout
          const delays = [100, 500, 1500, 3000];
          delays.forEach(delay => {
            setTimeout(() => {
              if (mapInstance.current && mapCoords.current) {
                mapInstance.current.relayout();
                mapInstance.current.setCenter(mapCoords.current);
              }
            }, delay);
          });
        }
      });
    }, { threshold: 0.1 });

    visibilityObserver.observe(mapContainer.current);

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (locationInfo.mapType === 'image') return;
    
    /**
     * 카카오맵 SDK가 async로 로드되므로, SDK가 완전히 준비될 때까지
     * 폴링(polling)으로 기다린 후 지도를 초기화합니다.
     * 최대 10초간 대기하며, 그 안에 로드되지 않으면 조용히 포기합니다.
     */
    let attempts = 0;
    const maxAttempts = 50; // 200ms * 50 = 10초
    
    const tryInitMap = () => {
      // SDK가 아직 로드되지 않았으면 재시도
      if (!window.kakao || !window.kakao.maps) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryInitMap, 200);
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
                level: 4 // 지도의 확대 레벨
              };
              
              const map = new window.kakao.maps.Map(mapContainer.current, options);
              mapInstance.current = map;
              mapCoords.current = coords;
              
              new window.kakao.maps.Marker({
                map: map,
                position: coords
              });

              // 지도 드래그(이동) 및 줌 막기 - 모바일 스크롤 중 지도 오작동 방지
              map.setDraggable(false);
              map.setZoomable(false);

              // 지도 초기화 직후 relayout (FadeUp 2.8초 애니메이션 대응)
              // 모바일에서 애니메이션 도중 타일이 안 그려지는 문제를 방어
              [300, 1000, 2000, 3200].forEach(delay => {
                setTimeout(() => {
                  if (map) {
                    map.relayout();
                    map.setCenter(coords);
                  }
                }, delay);
              });
            }
          });
        } catch (e) {
          console.warn('카카오맵 초기화 실패 (무시 가능):', e);
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
            borderRadius: '8px', overflow: 'hidden', position: 'relative',
            // iOS Safari GPU 가속 및 캔버스 렌더링 버그 방어
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            transform: 'translateZ(0)'
          }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
            {/* 스크롤 방해 방지용 투명 오버레이 (지도를 터치해도 페이지가 스크롤되도록 함) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }} />
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
