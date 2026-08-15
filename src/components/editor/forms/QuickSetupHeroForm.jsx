import React from 'react';

const QuickSetupHeroForm = ({ form, setForm }) => {
  return (
    <div>
      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222', borderBottom: '2px solid #222', paddingBottom: '8px', marginBottom: '16px' }}>1. 주인공 정보 (필수)</div>
      
      <div style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #ebebeb' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#333', fontSize: '0.95rem' }}>👨 신랑 측</div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input value={form.groomFather} onChange={e => setForm({...form, groomFather: e.target.value})} placeholder="아버님 성함" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
          <input value={form.groomMother} onChange={e => setForm({...form, groomMother: e.target.value})} placeholder="어머님 성함" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#666', padding: '0 4px' }}>의</div>
          <input value={form.groomRelation} onChange={e => setForm({...form, groomRelation: e.target.value})} placeholder="예: 아들, 장남" style={{ width: '110px', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
          <input value={form.groomName} onChange={e => setForm({...form, groomName: e.target.value})} placeholder="이름만 (예: 철수)" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 'bold' }} />
          <input value={form.groomNameEn} onChange={e => setForm({...form, groomNameEn: e.target.value})} placeholder="영문 (예: Chulsoo)" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-en-serif)' }} />
        </div>
      </div>

      <div style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #ebebeb' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#333', fontSize: '0.95rem' }}>👰 신부 측</div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input value={form.brideFather} onChange={e => setForm({...form, brideFather: e.target.value})} placeholder="아버님 성함" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
          <input value={form.brideMother} onChange={e => setForm({...form, brideMother: e.target.value})} placeholder="어머님 성함" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#666', padding: '0 4px' }}>의</div>
          <input value={form.brideRelation} onChange={e => setForm({...form, brideRelation: e.target.value})} placeholder="예: 딸, 장녀" style={{ width: '110px', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
          <input value={form.brideName} onChange={e => setForm({...form, brideName: e.target.value})} placeholder="이름만 (예: 영희)" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 'bold' }} />
          <input value={form.brideNameEn} onChange={e => setForm({...form, brideNameEn: e.target.value})} placeholder="영문 (예: Younghee)" style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-en-serif)' }} />
        </div>
      </div>
    </div>
  );
};

export default QuickSetupHeroForm;
