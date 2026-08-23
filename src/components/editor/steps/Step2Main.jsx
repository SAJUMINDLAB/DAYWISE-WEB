import React, { useRef } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Upload, Image as ImageIcon, X, AlignVerticalJustifyStart, AlignVerticalJustifyEnd, Layers, SplitSquareVertical, CheckCircle2, AlignCenter, AlignLeft, Type, Calendar, Languages } from 'lucide-react';

import { useImageUpload } from '../../../hooks/useImageUpload';
import { checkIdAvailable } from '../../../api/supabaseApi';

/* 템플릿별 호환 가능한 커버 레이아웃 정의 */
const LAYOUT_COMPAT = {
  classic:    ['layout1', 'layout2', 'layout3', 'layout5'],
  magazine:   ['layout1', 'layout2', 'layout5'],
  cinematic:  ['layout1', 'layout5'],
  bento:      ['layout1', 'layout2'],
};

const Step2Main = () => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const setMainInfo = useBuilderStore(state => state.setMainInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const customUrl = useBuilderStore(state => state.customUrl);
  const setCustomUrl = useBuilderStore(state => state.setCustomUrl);
  const fileInputRef = useRef(null);
  const { uploadImage, isUploading } = useImageUpload();

  const [urlStatus, setUrlStatus] = React.useState(''); // '', 'checking', 'available', 'taken', 'invalid'
  const [urlMessage, setUrlMessage] = React.useState('');

  /* 현재 템플릿과 호환되지 않는 레이아웃이 선택된 상태라면 자동으로 layout1로 초기화 */
  const compatList = LAYOUT_COMPAT[selectedTemplate] || LAYOUT_COMPAT.classic;
  const currentLayout = mainInfo.coverLayout || 'layout1';
  React.useEffect(() => {
    if (!compatList.includes(currentLayout)) {
      setMainInfo('coverLayout', 'layout1');
    }
  }, [selectedTemplate, compatList, currentLayout, setMainInfo]);

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await uploadImage(file, 1920);
      if (base64) {
        setMainInfo('mainImage', base64);
      }
    }
  };

  const handleUrlCheck = async () => {
    if (!customUrl) {
      setUrlStatus('invalid');
      setUrlMessage('주소를 입력해주세요.');
      return;
    }
    if (customUrl.length < 4) {
      setUrlStatus('invalid');
      setUrlMessage('주소는 4글자 이상이어야 합니다.');
      return;
    }
    
    setUrlStatus('checking');
    const isAvailable = await checkIdAvailable(customUrl);
    
    if (isAvailable) {
      setUrlStatus('available');
      setUrlMessage('사용 가능한 주소입니다!');
    } else {
      setUrlStatus('taken');
      setUrlMessage('이미 사용 중인 주소입니다. 다른 주소를 입력해주세요.');
    }
  };

  const handleUrlChange = (e) => {
    // 영소문자, 숫자, 하이픈만 허용
    let val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setCustomUrl(val);
    setUrlStatus('');
    setUrlMessage('');
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1px solid #EBEBEB',
    borderRadius: '6px', fontSize: '0.95rem', marginBottom: '16px',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    backgroundColor: '#fff',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    backgroundSize: '16px'
  };

  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#555', marginBottom: '6px' };
  const sectionTitleStyle = { fontSize: '1rem', fontWeight: 'bold', margin: '24px 0 16px 0', borderBottom: '2px solid #222', paddingBottom: '8px' };

  const getShapeStyle = (shape) => {
    switch(shape) {
      case 'full':
      case 'rectangle': return { borderRadius: '0' };
      case 'rounded': return { borderRadius: '12px' };
      case 'circle': return { borderRadius: '50%' };
      case 'arch': 
      default: 
        return { borderRadius: '40px 40px 0 0' };
    }
  };

  return (
    <div style={{ padding: '10px 0' }}>
      
      <div style={sectionTitleStyle}>나만의 청첩장 주소 설정 (Custom URL)</div>
      <div style={{ marginBottom: '24px', backgroundColor: '#FDFBF7', padding: '16px', borderRadius: '12px', border: '1px solid #EBEBEB' }}>
        <label style={labelStyle}>고유 주소 (영문 소문자, 숫자, 하이픈만 4자 이상 가능)</label>
        <div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '12px', color: '#aaa', fontSize: '0.95rem' }}>daywise.kr/v/</span>
              <input
                type="text"
                value={customUrl}
                onChange={handleUrlChange}
                placeholder="love-wedding"
                maxLength={30}
                style={{ ...inputStyle, marginBottom: 0, paddingLeft: '100px' }}
              />
            </div>
            <button 
              onClick={handleUrlCheck}
              disabled={urlStatus === 'checking' || !customUrl}
              style={{ 
                padding: '0 16px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px',
                fontWeight: 'bold', cursor: (urlStatus === 'checking' || !customUrl) ? 'not-allowed' : 'pointer',
                opacity: (urlStatus === 'checking' || !customUrl) ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap'
              }}
            >
              {urlStatus === 'checking' ? <div style={{width: 14, height: 14, border: '2px solid #ccc', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite'}} /> : '중복확인'}
            </button>
          </div>
          {urlStatus === 'available' && <div style={{ color: '#2e7d32', fontSize: '0.85rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> 사용 가능한 주소입니다.</div>}
          {urlStatus === 'duplicate' && <div style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '8px' }}>이미 사용 중인 주소입니다.</div>}
          <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: '#888' }}>* 주소 변경 시 기존 주소는 더 이상 사용할 수 없습니다.</p>
        </div>
      </div>

      <div style={sectionTitleStyle}>메인 사진 (Cover Photo)</div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div 
              style={{ 
                width: '100px', height: '140px', backgroundColor: '#eee', 
                backgroundImage: mainInfo.mainImage ? `url(${mainInfo.mainImage})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'border-radius 0.3s ease',
                ...getShapeStyle(mainInfo.mainImageShape)
              }}
            >
              {!mainInfo.mainImage && <ImageIcon size={28} color="#ccc" />}
            </div>
            {mainInfo.mainImage && (
              <button 
                onClick={() => setMainInfo('mainImage', null)}
                style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{ padding: '10px 20px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}
            >
              <Upload size={16} /> 사진 {mainInfo.mainImage ? '변경' : '업로드'}
            </button>
            <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.4' }}>
              권장 사이즈: 1080 x 1920px (세로형)
            </div>
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleMainImageUpload} />
        </div>

        {/* 형태(Shape) 선택 UI */}
        <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px', color: '#555' }}>사진 프레임 형태</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { id: 'full', label: '풀샷 (꽉 차게)' },
              { id: 'arch', label: '아치형' },
              { id: 'rectangle', label: '사각형' },
              { id: 'rounded', label: '둥근 사각형' },
              { id: 'circle', label: '원형' }
            ].map(shape => (
              <label key={shape.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.85rem', color: '#333' }}>
                <input 
                  type="radio" 
                  name="mainImageShape" 
                  value={shape.id}
                  checked={mainInfo.mainImageShape === shape.id}
                  onChange={() => setMainInfo('mainImageShape', shape.id)}
                  style={{ accentColor: '#222' }}
                />
                {shape.label}
              </label>
            ))}
          </div>
        </div>

        {/* 커버 레이아웃 (Cover Layout) 선택 UI */}
        <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '12px', color: '#555' }}>커버 레이아웃 템플릿</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {[
              { id: 'layout1', label: '텍스트 상단', icon: <AlignVerticalJustifyStart size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'layout2', label: '사진 상단', icon: <AlignVerticalJustifyEnd size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'layout3', label: '센터 오버랩', icon: <Layers size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'layout5', label: '미니멀 스플릿', icon: <SplitSquareVertical size={20} strokeWidth={1.2} color="#888" /> }
            ].map(layout => {
              const isActive = currentLayout === layout.id;
              const isDisabled = !compatList.includes(layout.id);
              return (
                <div 
                  key={layout.id}
                  onClick={() => !isDisabled && setMainInfo('coverLayout', layout.id)}
                  title={isDisabled ? `현재 ${selectedTemplate} 템플릿에서는 사용할 수 없습니다` : ''}
                  style={{ 
                    padding: '10px 4px', textAlign: 'center', borderRadius: '8px',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    border: isActive ? '2px solid #222' : '1px solid #ddd',
                    backgroundColor: isDisabled ? '#f0f0f0' : '#fff',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    opacity: isDisabled ? 0.4 : 1,
                    transition: 'all 0.2s',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>{layout.icon}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: isActive ? '#222' : '#666', lineHeight: '1.3' }}>{layout.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 텍스트 스타일 (Cover Text Style) 선택 UI */}
        <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '12px', color: '#555' }}>커버 텍스트 스타일</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {[
              { id: 'style1', label: '기본 중앙', icon: <AlignCenter size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'style2', label: '에디토리얼', icon: <AlignLeft size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'style3', label: '컴팩트', icon: <Type size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'style4', label: '한글 메인', icon: <Languages size={20} strokeWidth={1.2} color="#888" /> },
              { id: 'style5', label: '빅 데이트', icon: <Calendar size={20} strokeWidth={1.2} color="#888" /> }
            ].map(style => {
              const isActive = (mainInfo.coverTextStyle || 'style1') === style.id;
              return (
                <div 
                  key={style.id}
                  onClick={() => setMainInfo('coverTextStyle', style.id)}
                  style={{ 
                    padding: '10px 4px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer',
                    border: isActive ? '2px solid #222' : '1px solid #ddd',
                    backgroundColor: isActive ? '#fff' : '#fff',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>{style.icon}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: isActive ? '#222' : '#666', lineHeight: '1.3' }}>{style.label}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 메인 커버 상단 문구 UI */}
        <div style={{ marginTop: '16px', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
          <label style={{...labelStyle, marginBottom: '8px'}}>메인 커버 상단 문구 (선택)</label>
          <textarea 
            style={{...inputStyle, marginBottom: '12px', minHeight: '60px', resize: 'vertical'}} 
            value={mainInfo.coverTitle !== undefined ? mainInfo.coverTitle : ''} 
            onChange={(e) => setMainInfo('coverTitle', e.target.value)} 
            placeholder={(mainInfo.coverTextStyle || 'style1') === 'style4' ? '결혼합니다' : 'Wedding Invitation'} 
            rows={2}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>문구 크기</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: '작게', value: 0.8 },
                { label: '보통', value: 1.0 },
                { label: '크게', value: 1.2 }
              ].map(size => (
                <button
                  key={size.value}
                  onClick={() => setMainInfo('coverTitleSize', size.value)}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer',
                    backgroundColor: (mainInfo.coverTitleSize || 1.0) === size.value ? '#222' : '#fff',
                    color: (mainInfo.coverTitleSize || 1.0) === size.value ? '#fff' : '#444',
                    border: (mainInfo.coverTitleSize || 1.0) === size.value ? 'none' : '1px solid #ddd'
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
            <input 
              type="range" 
              min="0.5" max="2.0" step="0.1" 
              value={mainInfo.coverTitleSize || 1.0} 
              onChange={(e) => setMainInfo('coverTitleSize', parseFloat(e.target.value))}
              style={{ flex: 1, minWidth: '80px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.8rem', color: '#888', minWidth: '32px' }}>
              {((mainInfo.coverTitleSize || 1.0) * 100).toFixed(0)}%
            </span>
          </div>
        </div>

      </div>

      <div style={sectionTitleStyle}>신랑 신부 정보</div>
      
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>신랑 이름 (국문)</label>
          <input type="text" style={inputStyle} value={mainInfo.groomNameKo} onChange={(e) => setMainInfo('groomNameKo', e.target.value)} placeholder="이름만 (예: 철수)" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>신부 이름 (국문)</label>
          <input type="text" style={inputStyle} value={mainInfo.brideNameKo} onChange={(e) => setMainInfo('brideNameKo', e.target.value)} placeholder="이름만 (예: 영희)" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>신랑 이름 (영문)</label>
          <input type="text" style={inputStyle} value={mainInfo.groomNameEn} onChange={(e) => setMainInfo('groomNameEn', e.target.value)} placeholder="영문 (예: Chulsoo)" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>신부 이름 (영문)</label>
          <input type="text" style={inputStyle} value={mainInfo.brideNameEn} onChange={(e) => setMainInfo('brideNameEn', e.target.value)} placeholder="영문 (예: Younghee)" />
        </div>
      </div>

      <div style={sectionTitleStyle}>혼주 정보</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>신랑 아버지</label>
          <input type="text" style={inputStyle} value={mainInfo.groomFather} onChange={(e) => setMainInfo('groomFather', e.target.value)} placeholder="예: 아버님" />
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>신랑 어머니</label>
          <input type="text" style={inputStyle} value={mainInfo.groomMother} onChange={(e) => setMainInfo('groomMother', e.target.value)} placeholder="예: 어머님" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>관계</label>
          <input type="text" style={inputStyle} value={mainInfo.groomRelation} onChange={(e) => setMainInfo('groomRelation', e.target.value)} placeholder="예: 장남, 아들" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>신부 아버지</label>
          <input type="text" style={inputStyle} value={mainInfo.brideFather} onChange={(e) => setMainInfo('brideFather', e.target.value)} placeholder="예: 아버님" />
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>신부 어머니</label>
          <input type="text" style={inputStyle} value={mainInfo.brideMother} onChange={(e) => setMainInfo('brideMother', e.target.value)} placeholder="예: 어머님" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>관계</label>
          <input type="text" style={inputStyle} value={mainInfo.brideRelation} onChange={(e) => setMainInfo('brideRelation', e.target.value)} placeholder="예: 장녀, 딸" />
        </div>
      </div>

      <div style={sectionTitleStyle}>예식 일시 및 장소</div>
      <div>
        <label style={labelStyle}>예식 일자</label>
        <input 
          type="date" 
          style={inputStyle} 
          value={mainInfo.date} 
          onChange={(e) => setMainInfo('date', e.target.value)} 
        />
      </div>

      <div>
        <label style={labelStyle}>예식 시간</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select style={selectStyle} value={mainInfo.timeAmPm} onChange={(e) => setMainInfo('timeAmPm', e.target.value)}>
            <option value="AM">오전</option>
            <option value="PM">오후</option>
          </select>
          <select style={selectStyle} value={mainInfo.timeHour} onChange={(e) => setMainInfo('timeHour', e.target.value)}>
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}시</option>
            ))}
          </select>
          <select style={selectStyle} value={mainInfo.timeMinute} onChange={(e) => setMainInfo('timeMinute', e.target.value)}>
            {['00', '10', '20', '30', '40', '50'].map(m => (
              <option key={m} value={m}>{m}분</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>예식 장소 (웨딩홀 이름)</label>
        <input 
          type="text" 
          style={inputStyle} 
          value={mainInfo.location} 
          onChange={(e) => setMainInfo('location', e.target.value)} 
          placeholder="예: 하우스 오브 더 라움"
        />
      </div>

      <div>
        <label style={labelStyle}>상세 홀 정보 (선택)</label>
        <input 
          type="text" 
          style={inputStyle} 
          value={mainInfo.locationDetail || ''} 
          onChange={(e) => setMainInfo('locationDetail', e.target.value)} 
          placeholder="예: 그라스 가든"
        />
      </div>
    </div>
  );
};

export default Step2Main;
