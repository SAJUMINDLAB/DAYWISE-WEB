import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import FadeUp from '../FadeUp';

const LocationArea = ({ theme }) => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const locationInfo = useBuilderStore(state => state.locationInfo);
  const mapContainer = React.useRef(null);

  React.useEffect(() => {
    if (locationInfo.mapType === 'image') return;
    
    // 카카오맵 스크립트가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        if (!mapContainer.current) return;
        const geocoder = new window.kakao.maps.services.Geocoder();
        
        geocoder.addressSearch(locationInfo.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            
            const options = {
              center: coords,
              level: 4 // 지도의 확대 레벨
            };
            
            const map = new window.kakao.maps.Map(mapContainer.current, options);
            
            new window.kakao.maps.Marker({
              map: map,
              position: coords
            });

            // 지도 드래그(이동) 및 줌 막기 - 모바일 스크롤 중 지도 오작동 방지
            map.setDraggable(false);
            map.setZoomable(false);
          }
        });
      });
    }
  }, [locationInfo.address, locationInfo.mapType]);

  return (
    <FadeUp active={optionInfo.motionEffect}>
      <div style={{ padding: '60px 20px', position: 'relative', zIndex: 10, backgroundColor: 'transparent' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.5rem * var(--font-ratio))', textAlign: 'center', marginBottom: '30px', color: theme.accent, letterSpacing: 'calc(0.1rem * var(--font-ratio))'
        }}>
          Location
        </h3>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontFamily: 'var(--font-kr-serif)', fontSize: 'calc(1.2rem * var(--font-ratio))', fontWeight: '600', marginBottom: '8px' }}>
            {locationInfo.venueName}
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
          <div style={{ width: '100%', height: '240px', backgroundColor: '#eee', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
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
