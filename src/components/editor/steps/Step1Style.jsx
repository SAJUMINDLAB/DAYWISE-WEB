import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const templates = [
  { id: 'classic', name: 'The Classic', desc: '단정하고 우아한 정통 스타일' },
  { id: 'magazine', name: 'The Magazine', desc: '감각적인 패션 화보 무드' },
  { id: 'cinematic', name: 'The Cinematic', desc: '영화 포스터 같은 깊은 감성' },
  { id: 'bento', name: 'The Bento', desc: '유리 질감의 프리미엄 앱 UI' }
];

const Step1Style = () => {
  const selectedTemplate = useBuilderStore(state => state.selectedTemplate);
  const setTemplate = useBuilderStore(state => state.setTemplate);

  return (
    <div style={{ padding: '10px 0' }}>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
        마음에 드는 레이아웃 템플릿을 선택하세요.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {templates.map(tpl => (
          <div 
            key={tpl.id}
            onClick={() => setTemplate(tpl.id)}
            style={{ 
              border: `2px solid ${selectedTemplate === tpl.id ? '#D4AF37' : '#eee'}`,
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: selectedTemplate === tpl.id ? '#FFFBF2' : '#fff',
              textAlign: 'center'
            }}
          >
            <div style={{ 
              width: '100%', height: '100px', borderRadius: '8px', marginBottom: '16px',
              backgroundColor: selectedTemplate === tpl.id ? '#FDF8EC' : '#F5F5F5',
              border: `1px solid ${selectedTemplate === tpl.id ? '#D4AF37' : '#E5E5E5'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '10px', boxSizing: 'border-box'
            }}>
              {tpl.id === 'classic' && (
                <div style={{ 
                  width: '85%', height: '100%', 
                  backgroundColor: '#FAF9F6', 
                  border: '1px solid #E5E0D8',
                  padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  {/* Inner elegant border */}
                  <div style={{ 
                    width: '100%', height: '100%', 
                    border: '1px solid #D4AF37', 
                    opacity: 0.5,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '4px'
                  }}>
                    <div style={{ height: '14px', width: '14px', border: '1px solid #D4AF37', borderRadius: '50%', marginBottom: '4px' }} />
                    <div style={{ height: '2px', width: '80%', backgroundColor: '#D4AF37', margin: '2px 0' }} />
                    <div style={{ height: '1.5px', width: '50%', backgroundColor: '#999', margin: '2px 0', opacity: 0.5 }} />
                  </div>
                </div>
              )}
              {tpl.id === 'magazine' && (
                <div style={{ 
                  width: '85%', height: '100%', 
                  backgroundColor: '#fff', 
                  border: '1px solid #EBEBEB',
                  padding: '2px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}>
                  <div style={{
                    width: '100%', height: '100%',
                    border: 'double 3px #E5E5E5',
                    display: 'flex', flexDirection: 'column',
                    paddingTop: '2px'
                  }}>
                    {/* Magazine Header */}
                    <div style={{ 
                      fontSize: '7px', fontWeight: 'bold', fontFamily: 'serif', 
                      textAlign: 'center', letterSpacing: '1px', color: '#111',
                      marginTop: '2px', marginBottom: '2px'
                    }}>
                      THE MAGAZINE
                    </div>
                    <div style={{ height: '1px', width: '80%', backgroundColor: '#E5E5E5', margin: '0 auto 2px' }} />
                    {/* Large Hero Image (Editorial style) */}
                    <div style={{ 
                      flex: 1, 
                      margin: '0 2px 2px 2px',
                      background: 'linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 100%)',
                      position: 'relative'
                    }}>
                       <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '70%', height: '3px', backgroundColor: '#fff', opacity: 0.9 }} />
                       <div style={{ position: 'absolute', bottom: '10px', left: '4px', width: '40%', height: '4px', backgroundColor: '#D4AF37' }} />
                    </div>
                  </div>
                </div>
              )}
              {tpl.id === 'cinematic' && (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#222', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* 슬레이트 위쪽(빗금) */}
                  <div style={{ 
                    height: '24px', width: '100%', 
                    background: 'repeating-linear-gradient(-45deg, #fff, #fff 8px, #222 8px, #222 16px)',
                    borderBottom: '2px solid #555',
                    transformOrigin: 'left bottom',
                    transform: 'rotate(-5deg)',
                    marginTop: '-2px'
                  }} />
                  {/* 슬레이트 아래쪽(보드) */}
                  <div style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#222' }}>
                    <div style={{ height: '2px', width: '80%', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '4px' }} />
                    <div style={{ height: '2px', width: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                  </div>
                </div>
              )}
              {tpl.id === 'bento' && (
                <div style={{ width: '85%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '45% 1fr', gap: '5px', padding: '2px' }}>
                  {/* Top wide block */}
                  <div style={{ 
                    gridColumn: '1 / 3', 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)', 
                    border: '1px solid rgba(255,255,255,0.8)',
                    display: 'flex', flexDirection: 'column', padding: '6px 6px', gap: '3px',
                    justifyContent: 'center'
                  }}>
                    <div style={{ height: '4px', width: '40%', backgroundColor: '#D4AF37', borderRadius: '2px' }} />
                    <div style={{ height: '3px', width: '70%', backgroundColor: '#E0E0E0', borderRadius: '2px' }} />
                  </div>
                  {/* Bottom left square (Dark widget) */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)', 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2.5px solid #D4AF37' }} />
                  </div>
                  {/* Bottom right square (Mini grid widget) */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)', 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', padding: '4px'
                  }}>
                    <div style={{ backgroundColor: '#D4AF37', borderRadius: '2px', opacity: 0.8 }} />
                    <div style={{ backgroundColor: '#E0E0E0', borderRadius: '2px' }} />
                    <div style={{ backgroundColor: '#E0E0E0', borderRadius: '2px' }} />
                    <div style={{ backgroundColor: '#D4AF37', borderRadius: '2px', opacity: 0.8 }} />
                  </div>
                </div>
              )}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '4px', fontFamily: "'Cormorant Garamond', serif" }}>
              {tpl.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888', wordBreak: 'keep-all' }}>
              {tpl.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1Style;
