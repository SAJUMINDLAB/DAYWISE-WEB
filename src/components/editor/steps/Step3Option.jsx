import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Activity, Film, Type, Layers, Maximize, Sparkles, MoveVertical, MousePointerClick, Lock } from 'lucide-react';

const OptionRow = ({ icon: Icon, title, desc, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
    <div style={{ color: '#888', marginRight: '16px' }}>
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#333', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '0.8rem', color: '#888' }}>{desc}</div>
    </div>
    <div>
      {children}
    </div>
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-slider"></span>
  </label>
);

const Step3Option = () => {
  const optionInfo = useBuilderStore(state => state.optionInfo);
  const setOptionInfo = useBuilderStore(state => state.setOptionInfo);
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);

  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

  return (
    <div style={{ padding: '0 10px' }}>
      
      <OptionRow 
        icon={Activity} 
        title="모션 효과 (MOTION EFFECT)" 
        desc="스크롤 시 부드러운 등장 효과와 시차(Parallax)를 적용합니다."
      >
        <Toggle checked={optionInfo.motionEffect} onChange={(e) => setOptionInfo('motionEffect', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Film} 
        title="시네마틱 인트로" 
        desc="미리보기: 토글을 껐다가 다시 켜주세요"
      >
        <Toggle checked={optionInfo.cinematicIntro} onChange={(e) => setOptionInfo('cinematicIntro', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Type} 
        title="글자 크기 (FONT SIZE)" 
        desc="본문의 글자 크기를 조정합니다."
      >
        <div style={{ display: 'flex', width: '100%', gap: '4px' }}>
          {sizes.map(s => (
            <button 
              key={s} 
              style={{
                flex: 1,
                padding: '8px 0',
                border: '1px solid',
                borderColor: optionInfo.fontSize === s ? '#222' : '#ddd',
                borderRadius: '6px',
                backgroundColor: optionInfo.fontSize === s ? '#222' : '#fff',
                color: optionInfo.fontSize === s ? '#fff' : '#666',
                fontSize: '0.85rem',
                fontWeight: optionInfo.fontSize === s ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setOptionInfo('fontSize', s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#ff4d4f', fontWeight: 'bold' }}>
          ※ 글자를 너무 크게 설정하면 전체적인 디자인과 비율을 해칠 수 있습니다.
        </div>
      </OptionRow>

      <OptionRow 
        icon={Type}
        title="글자 굵게 (BOLD)" 
        desc="전체적인 글자를 굵게 표시합니다."
      >
        <Toggle checked={optionInfo.fontWeightBold} onChange={(e) => setOptionInfo('fontWeightBold', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Layers} 
        title="종이 질감(TEXTURE) 추가" 
        desc="화면에 실제 종이 같은 질감과 입체감을 더합니다."
      >
        <Toggle checked={optionInfo.texture} onChange={(e) => setOptionInfo('texture', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Maximize} 
        title="페이지 확대(PAGE ZOOM) 허용" 
        desc="청첩장 전체를 두 손가락으로 확대할 수 있습니다."
      >
        <Toggle checked={optionInfo.pageZoom} onChange={(e) => setOptionInfo('pageZoom', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Sparkles} 
        title="계절 파티클 (PARTICLES)" 
        desc="화면 위로 은은하게 떨어지는 효과를 켭니다."
      >
        <Toggle checked={optionInfo.particlesEffect} onChange={(e) => setOptionInfo('particlesEffect', e.target.checked)} />
      </OptionRow>

      {optionInfo.particlesEffect && (
        <div style={{ padding: '10px 16px 20px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <select
              value={optionInfo.particleType || 'snow'}
              onChange={(e) => setOptionInfo('particleType', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                appearance: 'none',
                backgroundColor: '#F9F9F9',
                border: '1px solid #EAEAEA',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: '#444',
                fontFamily: 'var(--font-kr-sans)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="snow">❄️ 눈꽃 (Snow)</option>
              <option value="blossom">🌸 벚꽃 (Blossom)</option>
              <option value="rain">🌧️ 비 (Rain)</option>
              <option value="leaves">🍂 가을 낙엽 (Leaves)</option>
              <option value="fireflies">✨ 반딧불이 (Fireflies)</option>
              <option value="starlight">🌟 별빛 (Starlight)</option>
              <option value="confetti">🎉 팡파르 (Confetti)</option>
            </select>
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      )}

      <OptionRow 
        icon={MoveVertical} 
        title="입체 스크롤 (PARALLAX)" 
        desc="스크롤 시 배경과 글자가 다른 속도로 움직여 입체감을 줍니다."
      >
        <Toggle checked={optionInfo.parallaxEffect} onChange={(e) => setOptionInfo('parallaxEffect', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={MousePointerClick} 
        title="버튼 빛번짐 (SHINE EFFECT)" 
        desc="중요한 버튼의 테두리에 시선을 끄는 빛번짐 모션을 추가합니다."
      >
        <Toggle checked={optionInfo.shineEffect} onChange={(e) => setOptionInfo('shineEffect', e.target.checked)} />
      </OptionRow>

      <OptionRow 
        icon={Type} 
        title="소제목 언어" 
        desc="청첩장 메뉴와 소제목의 언어를 선택합니다."
      >
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F5F5F5', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setOptionInfo('magazineTocLanguage', 'en')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: optionInfo.magazineTocLanguage !== 'kr' ? '#fff' : 'transparent',
              boxShadow: optionInfo.magazineTocLanguage !== 'kr' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              color: optionInfo.magazineTocLanguage !== 'kr' ? '#222' : '#888',
              fontWeight: optionInfo.magazineTocLanguage !== 'kr' ? 'bold' : 'normal',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            영어
          </button>
          <button
            onClick={() => setOptionInfo('magazineTocLanguage', 'kr')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: optionInfo.magazineTocLanguage === 'kr' ? '#fff' : 'transparent',
              boxShadow: optionInfo.magazineTocLanguage === 'kr' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              color: optionInfo.magazineTocLanguage === 'kr' ? '#222' : '#888',
              fontWeight: optionInfo.magazineTocLanguage === 'kr' ? 'bold' : 'normal',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            한글
          </button>
        </div>
      </OptionRow>

      <OptionRow 
        icon={Type} 
        title="소제목 색상 설정" 
        desc="소제목의 글자색을 직접 지정할 수 있습니다. (미지정 시 테마 포인트 색상 적용)"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input 
            type="color" 
            value={optionInfo.subtitleColor || '#000000'} 
            onChange={(e) => setOptionInfo('subtitleColor', e.target.value)}
            style={{ width: '40px', height: '40px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px', padding: 0 }}
          />
          {optionInfo.subtitleColor && (
            <button 
              onClick={() => setOptionInfo('subtitleColor', '')}
              style={{ padding: '6px 12px', fontSize: '0.8rem', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px', cursor: 'pointer' }}
            >
              초기화
            </button>
          )}
        </div>
      </OptionRow>

      {selectedTemplate === 'cinematic' && (
        <>
          <OptionRow 
            icon={Film} 
            title="엔딩 크레딧 (ENDING CREDITS)" 
            desc="시네마틱 테마의 마지막에 영화처럼 올라가는 엔딩 크레딧을 표시합니다."
          >
            <Toggle checked={optionInfo.cinematicCredits !== false} onChange={(e) => setOptionInfo('cinematicCredits', e.target.checked)} />
          </OptionRow>

          <OptionRow 
            icon={Film} 
            title="영화 슬레이트 (SLATE PLATE)" 
            desc="시네마틱 테마의 일시/장소 섹션에 영화 슬레이트(씬/테이크) 디자인을 표시합니다."
          >
            <Toggle checked={optionInfo.showSlatePlate !== false} onChange={(e) => setOptionInfo('showSlatePlate', e.target.checked)} />
          </OptionRow>

          <OptionRow 
            icon={Film} 
            title="필름 갤러리 (FILM STRIP)" 
            desc="시네마틱 테마의 갤러리에 영화 필름 모양의 디자인을 적용합니다."
          >
            <Toggle checked={optionInfo.showFilmStrip !== false} onChange={(e) => setOptionInfo('showFilmStrip', e.target.checked)} />
          </OptionRow>
        </>
      )}

      {/* Hidden Admin Config */}
      <OptionRow 
        icon={Lock} 
        title="스마트폰 비밀 관리자 접속" 
        desc={
          <>
            폰에서 즉시 방명록과 하객을 관리할 수 있는 숨겨진 기능입니다.<br/>
            <strong>접속 방법:</strong> 청첩장 맨 위의 <strong>'Wedding Invitation'</strong> 또는 <strong>'결혼합니다'</strong> 글씨를 5초간 꾹 누르세요.
          </>
        }
      >
        <Toggle checked={optionInfo.useHiddenAdmin} onChange={(e) => setOptionInfo('useHiddenAdmin', e.target.checked)} />
      </OptionRow>

      {optionInfo.useHiddenAdmin && (
        <div style={{ marginLeft: '40px', marginBottom: '16px', padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '8px', fontWeight: 'bold' }}>접속 비밀번호 설정 (숫자 4자리)</div>
          <input 
            type="text" 
            maxLength={4}
            value={optionInfo.hiddenAdminPin || '1234'}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              setOptionInfo('hiddenAdminPin', val);
            }}
            style={{ 
              width: '100px', 
              padding: '8px 12px', 
              border: '1px solid #ddd', 
              borderRadius: '6px',
              fontSize: '1rem',
              textAlign: 'center',
              letterSpacing: '4px'
            }}
          />
        </div>
      )}

    </div>
  );
};

export default Step3Option;
