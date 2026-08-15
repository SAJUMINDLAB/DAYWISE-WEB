import React from 'react';

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
    <div style={{ fontSize: '0.9rem', color: '#333' }}>{label}</div>
    <div 
      onClick={() => onChange(!checked)}
      style={{ width: '44px', height: '24px', backgroundColor: checked ? '#222' : '#e5e5e5', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s' }}
    >
      <div style={{ position: 'absolute', top: '2px', left: checked ? '22px' : '2px', width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
    </div>
  </div>
);

const QuickSetupFeatureToggles = ({ form, setForm }) => {
  return (
    <div>
      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222', borderBottom: '2px solid #222', paddingBottom: '8px', marginBottom: '16px' }}>4. 선택 기능 설정 (선택)</div>
      <div style={{ backgroundColor: '#fafafa', padding: '0 16px', borderRadius: '8px', border: '1px solid #ebebeb' }}>
        <ToggleSwitch label="초대 인사말 사용" checked={form.useGreeting} onChange={v => setForm({...form, useGreeting: v})} />
        <ToggleSwitch label="교통편 안내 (지하철, 버스, 주차장) 사용" checked={form.useTransportation} onChange={v => setForm({...form, useTransportation: v})} />
        <ToggleSwitch label="마음 전하실 곳 (계좌번호 안내) 사용" checked={form.useAccount} onChange={v => setForm({...form, useAccount: v})} />
        <ToggleSwitch label="웨딩 갤러리 (사진첩) 사용" checked={form.useGallery} onChange={v => setForm({...form, useGallery: v})} />
        <ToggleSwitch label="우리만의 이야기 (스토리) 사용" checked={form.useStory} onChange={v => setForm({...form, useStory: v})} />
        <ToggleSwitch label="참석 의사 전달 (RSVP) 사용" checked={form.useRsvp} onChange={v => setForm({...form, useRsvp: v})} />
        <ToggleSwitch label="방명록 사용" checked={form.useGuestbook} onChange={v => setForm({...form, useGuestbook: v})} />
        <ToggleSwitch label="배경음악 (BGM) 사용" checked={form.useBgm} onChange={v => setForm({...form, useBgm: v})} />
      </div>
      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '12px', textAlign: 'center' }}>스위치를 켠 기능의 세부 설정(사진 등록, 계좌 등록 등)은 닫기 후 각 스텝에서 진행하세요.</p>
    </div>
  );
};

export default QuickSetupFeatureToggles;
