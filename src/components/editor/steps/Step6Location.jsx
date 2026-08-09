import React, { useState } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { MapPin, Phone, ImagePlus, CheckCircle2, Trash2, Plus, X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';

const InputRow = ({ icon: Icon, label, value, onChange, placeholder, isTextarea = false, rightElement }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>
        <Icon size={16} /> {label}
      </div>
      {rightElement}
    </div>
    {isTextarea ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px',
          fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', minHeight: '60px', resize: 'vertical'
        }}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px',
          fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit'
        }}
      />
    )}
  </div>
);

const NavToggle = ({ active, label, onClick, color }) => (
  <button 
    onClick={onClick}
    style={{
      flex: 1, padding: '14px 0', border: active ? `2px solid ${color}` : '1px solid #e0e0e0',
      backgroundColor: '#fff',
      borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      transition: 'all 0.2s ease'
    }}
  >
    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333', fontFamily: 'var(--font-kr-sans)' }}>{label}</div>
    <div style={{
      width: '24px', height: '24px', borderRadius: '50%',
      backgroundColor: active ? color : '#f5f5f5',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      transition: 'all 0.2s ease'
    }}>
      <svg width="12" height="9" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4.5L5 8.5L13 1" stroke={active ? "#fff" : "#ccc"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </button>
);

const Step6Location = () => {
  const locationInfo = useBuilderStore(state => state.locationInfo);
  const setLocationInfo = useBuilderStore(state => state.setLocationInfo);
  const updateTransportation = useBuilderStore(state => state.updateTransportation);
  const addTransportation = useBuilderStore(state => state.addTransportation);
  const removeTransportation = useBuilderStore(state => state.removeTransportation);

  const [showPostcode, setShowPostcode] = useState(false);

  const handleCompletePostcode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setLocationInfo('address', fullAddress);
    setShowPostcode(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocationInfo('mapImage', URL.createObjectURL(file));
    }
  };

  const toggleNavButton = (type) => {
    setLocationInfo('navButtons', {
      ...locationInfo.navButtons,
      [type]: !locationInfo.navButtons[type]
    });
  };

  return (
    <div style={{ padding: '10px 0' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>지도 표시 방식 (MAP TYPE)</div>
        <div style={{ display: 'flex', border: '1px solid #EBEBEB', borderRadius: '6px', overflow: 'hidden' }}>
          <button
            onClick={() => setLocationInfo('mapType', 'image')}
            style={{
              flex: 1, padding: '14px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold',
              backgroundColor: locationInfo.mapType === 'image' ? '#fff' : '#f9f9f9',
              color: locationInfo.mapType === 'image' ? '#333' : '#aaa',
              borderBottom: locationInfo.mapType === 'image' ? '2px solid var(--tnc-charcoal)' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            이미지 약도 (IMAGE)
          </button>
          <button
            onClick={() => setLocationInfo('mapType', 'dynamic')}
            style={{
              flex: 1, padding: '14px', border: 'none', fontSize: '0.85rem', fontWeight: 'bold',
              backgroundColor: locationInfo.mapType === 'dynamic' ? '#fff' : '#f9f9f9',
              color: locationInfo.mapType === 'dynamic' ? '#333' : '#aaa',
              borderBottom: locationInfo.mapType === 'dynamic' ? '2px solid var(--tnc-charcoal)' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            카카오맵 (DYNAMIC)
          </button>
        </div>
      </div>

      <div style={{ padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '8px', marginBottom: '24px' }}>
        
        {locationInfo.mapType === 'image' ? (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px' }}>이미지 약도를 업로드 해주세요.</div>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '140px', border: '1px dashed #ccc', borderRadius: '8px',
              backgroundColor: '#fff', cursor: 'pointer', overflow: 'hidden'
            }}>
              {locationInfo.mapImage ? (
                <img src={locationInfo.mapImage} alt="map-preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <>
                  <ImagePlus size={28} color="#aaa" style={{ marginBottom: '8px' }} />
                  <span style={{ fontSize: '0.85rem', color: '#888' }}>클릭하여 약도 등록</span>
                </>
              )}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </label>
          </div>
        ) : (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px', textAlign: 'center', lineHeight: '1.5' }}>
              <strong>카카오맵 연동 안내</strong><br/>
              입력된 위치가 자동으로 표시됩니다.<br/>
              * 정확한 위치 표시를 위해 상세 주소를 입력해주세요.
            </div>
            
            <InputRow 
              icon={MapPin} label="예식장 이름" value={locationInfo.venueName} 
              onChange={(e) => setLocationInfo('venueName', e.target.value)} placeholder="예: 엘파소 하우스 웨딩" 
            />
            
            <InputRow 
              icon={MapPin} label="상세 주소" value={locationInfo.address} 
              onChange={(e) => setLocationInfo('address', e.target.value)} placeholder="도로명 주소 입력" 
              rightElement={
                <button onClick={() => setShowPostcode(true)} style={{ 
                  padding: '4px 10px', fontSize: '0.75rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' 
                }}>주소 검색</button>
              }
            />

            {showPostcode && (
              <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
              }}>
                <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>주소 검색</div>
                    <button onClick={() => setShowPostcode(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <X size={20} />
                    </button>
                  </div>
                  <DaumPostcode 
                    onComplete={handleCompletePostcode}
                    style={{ width: '100%', height: '400px' }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => alert('핀 위치를 마우스로 직접 끌어서(드래그) 조정하려면 카카오 지도 API 세부 설정이 필요합니다.\n현재 버전에서는 입력하신 주소를 바탕으로 한 자동 검색 핀만 지원됩니다.')}
              style={{
                width: '100%', padding: '12px', marginBottom: '16px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 'bold', color: '#555', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
              }}
            >
              <MapPin size={16} /> 핀 위치 조정
            </button>
            
            <InputRow 
              icon={Phone} label="예식장 연락처" value={locationInfo.tel} 
              onChange={(e) => setLocationInfo('tel', e.target.value)} placeholder="예: 053-384-5959" 
            />
          </div>
        )}
      </div>

      <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '6px' }}>지도 앱 연동 버튼</div>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '16px' }}>청첩장에 내비게이션 실행 버튼을 표시합니다.</div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <NavToggle active={locationInfo.navButtons.naver} label="네이버 지도" color="#03C75A" onClick={() => toggleNavButton('naver')} />
          <NavToggle active={locationInfo.navButtons.kakao} label="카카오맵" color="#FEE500" onClick={() => toggleNavButton('kakao')} />
          <NavToggle active={locationInfo.navButtons.tmap} label="티맵 (TMAP)" color="#000000" onClick={() => toggleNavButton('tmap')} />
        </div>
      </div>

      <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '16px' }}>교통편 안내</div>
        
        {locationInfo.transportation.map(item => (
          <div key={item.id} style={{ marginBottom: '16px', position: 'relative', padding: '16px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff' }}>
            <button onClick={() => removeTransportation(item.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
            <input 
              value={item.label} 
              onChange={(e) => updateTransportation(item.id, 'label', e.target.value)} 
              placeholder="수단 이름 (예: 지하철)"
              style={{ width: '80%', padding: '8px', marginBottom: '12px', border: 'none', borderBottom: '2px solid #eee', fontSize: '0.9rem', fontWeight: 'bold', outline: 'none', fontFamily: 'var(--font-kr-sans)' }}
            />
            <textarea 
              value={item.content} 
              onChange={(e) => updateTransportation(item.id, 'content', e.target.value)} 
              placeholder="이용 안내를 적어주세요."
              style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '6px', minHeight: '80px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
        ))}
        
        <button 
          onClick={addTransportation} 
          style={{ width: '100%', padding: '14px', backgroundColor: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#666', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          <Plus size={18} /> 교통편 추가
        </button>
      </div>
    </div>
  );
};

export default Step6Location;
