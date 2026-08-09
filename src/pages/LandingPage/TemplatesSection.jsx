import React from 'react';
import { Link } from 'react-router-dom';
import TemplateMockup from './TemplateMockup';

const TemplateIcon = ({ templateId }) => {
  return (
    <div style={{ 
      width: '100%', height: '160px', 
      backgroundColor: '#F5F5F5',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '20px', boxSizing: 'border-box'
    }}>
      {templateId === 'classic' && (
        <div style={{ 
          width: '65%', height: '100%', 
          backgroundColor: '#FAF9F6', 
          border: '1px solid #E5E0D8',
          padding: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          {/* Inner elegant border */}
          <div style={{ 
            width: '100%', height: '100%', 
            border: '1px solid #D4AF37', 
            opacity: 0.5,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '4px'
          }}>
            <div style={{ height: '16px', width: '16px', border: '1.5px solid #D4AF37', borderRadius: '50%', marginBottom: '8px' }} />
            <div style={{ height: '2px', width: '80%', backgroundColor: '#D4AF37', margin: '4px 0' }} />
            <div style={{ height: '2px', width: '50%', backgroundColor: '#999', margin: '4px 0', opacity: 0.5 }} />
          </div>
        </div>
      )}
      {templateId === 'magazine' && (
        <div style={{ 
          width: '65%', height: '100%', 
          backgroundColor: '#fff', 
          border: '1px solid #EBEBEB',
          padding: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '100%', height: '100%',
            border: 'double 4px #E5E5E5',
            display: 'flex', flexDirection: 'column',
            paddingTop: '6px'
          }}>
            {/* Magazine Header */}
            <div style={{ 
              fontSize: '10px', fontWeight: 'bold', fontFamily: 'serif', 
              textAlign: 'center', letterSpacing: '2px', color: '#111',
              marginTop: '4px', marginBottom: '4px'
            }}>
              THE MAGAZINE
            </div>
            <div style={{ height: '1px', width: '80%', backgroundColor: '#E5E5E5', margin: '0 auto 6px' }} />
            {/* Large Hero Image */}
            <div style={{ 
              flex: 1, margin: '0 4px 4px 4px',
              background: 'linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 100%)',
              position: 'relative'
            }}>
               <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '70%', height: '4px', backgroundColor: '#fff', opacity: 0.9 }} />
               <div style={{ position: 'absolute', bottom: '14px', left: '6px', width: '40%', height: '5px', backgroundColor: '#D4AF37' }} />
            </div>
          </div>
        </div>
      )}
      {templateId === 'cinematic' && (
        <div style={{ width: '80%', height: '100%', backgroundColor: '#222', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ 
            height: '36px', width: '100%', 
            background: 'repeating-linear-gradient(-45deg, #fff, #fff 10px, #222 10px, #222 20px)',
            borderBottom: '3px solid #555',
            transformOrigin: 'left bottom',
            transform: 'rotate(-5deg)',
            marginTop: '-4px'
          }} />
          <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#222' }}>
            <div style={{ height: '3px', width: '80%', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '8px' }} />
            <div style={{ height: '3px', width: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      )}
      {templateId === 'bento' && (
        <div style={{ width: '65%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '45% 1fr', gap: '8px', padding: '4px' }}>
          <div style={{ 
            gridColumn: '1 / 3', background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)', 
            borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)',
            display: 'flex', flexDirection: 'column', padding: '10px', gap: '6px', justifyContent: 'center'
          }}>
            <div style={{ height: '6px', width: '40%', backgroundColor: '#D4AF37', borderRadius: '3px' }} />
            <div style={{ height: '4px', width: '70%', backgroundColor: '#E0E0E0', borderRadius: '2px' }} />
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '3px solid #D4AF37' }} />
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.8)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', padding: '6px'
          }}>
            <div style={{ backgroundColor: '#D4AF37', borderRadius: '3px', opacity: 0.8 }} />
            <div style={{ backgroundColor: '#E0E0E0', borderRadius: '3px' }} />
            <div style={{ backgroundColor: '#E0E0E0', borderRadius: '3px' }} />
            <div style={{ backgroundColor: '#D4AF37', borderRadius: '3px', opacity: 0.8 }} />
          </div>
        </div>
      )}
    </div>
  );
};

const TemplatesSection = () => {
  return (
    <section id="templates-section" style={{ padding: '80px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-kr-sans)', fontSize: '1.2rem', color: '#666', marginBottom: '8px', letterSpacing: '2px' }}>
        The Collection
      </h2>
      <h3 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.5rem', color: '#2C2C2C', marginBottom: '24px', fontWeight: '500' }}>
        당신의 웨딩에 어울리는 무드
      </h3>
      <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '60px' }}>
        데이와이즈가 준비한 다채로운 시그니처 템플릿들을 미리 경험해 보세요.<br/>
        단순한 텍스트와 사진도, 데이와이즈의 프레임을 만나면 한 편의 로맨틱한 영화 포스터가 됩니다.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {[
          { id: 'classic', name: 'The Classic', desc: '유행 타지 않는 가장 깔끔하고 단정한 스탠다드 무드' },
          { id: 'magazine', name: 'The Magazine', desc: '한편의 화보처럼 감각적이고 트렌디한 매거진 무드' },
          { id: 'cinematic', name: 'The Cinematic', desc: '로맨스 영화 속 주인공 같은 깊고 아련한 감성의 무드' },
          { id: 'bento', name: 'The Bento', desc: '트렌디하고 감각적인 그리드 레이아웃의 무드' }
        ].map((tpl, idx) => (
          <div key={idx} style={{ 
            display: 'flex', flexDirection: 'column', backgroundColor: '#FDFBF7', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', transition: 'transform 0.3s',
            paddingBottom: '24px'
          }} className="review-card">
            {/* 1. 상단 CSS 템플릿 아이콘 */}
            <TemplateIcon templateId={tpl.id} />
            
            {/* 2. 템플릿 설명 */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 'bold', color: '#2C2C2C', marginBottom: '8px' }}>{tpl.name}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>{tpl.desc}</p>
              <Link to={`/sample/${tpl.id}`} style={{ 
                display: 'block', textAlign: 'center', width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #D4AF37',
                color: '#D4AF37', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold',
                textDecoration: 'none', transition: 'all 0.2s', marginBottom: '24px'
              }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = '#fff'; }}
                 onMouseOut={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#D4AF37'; }}>
                샘플 미리보기
              </Link>
            </div>
            
            {/* 3. 하단 스마트폰 목업 애니메이션 */}
            <div style={{ padding: '0 24px', flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <div style={{ width: '80%', maxWidth: '240px' }}>
                <TemplateMockup templateId={tpl.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplatesSection;
