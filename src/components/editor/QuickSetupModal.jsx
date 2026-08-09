import React, { useState, useEffect } from 'react';
import { X, Zap, Check } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';

const QuickSetupModal = ({ onClose }) => {
  const mainInfo = useBuilderStore(state => state.mainInfo);
  const introInfo = useBuilderStore(state => state.greetingInfo);
  const locationInfo = useBuilderStore(state => state.locationInfo);
  const galleryInfo = useBuilderStore(state => state.galleryInfo);
  const accountInfo = useBuilderStore(state => state.accountInfo);
  const storyInfo = useBuilderStore(state => state.storyInfo);
  const rsvpInfo = useBuilderStore(state => state.rsvpInfo);
  const guestbookInfo = useBuilderStore(state => state.guestbookInfo);
  const bgmInfo = useBuilderStore(state => state.bgmInfo);

  const setMainInfo = useBuilderStore(state => state.setMainInfo);
  const setGreetingInfo = useBuilderStore(state => state.setGreetingInfo);
  const setLocationInfo = useBuilderStore(state => state.setLocationInfo);
  const updateTransportation = useBuilderStore(state => state.updateTransportation);
  const setGalleryInfo = useBuilderStore(state => state.setGalleryInfo);
  const updateAccountInfo = useBuilderStore(state => state.updateAccountInfo);
  const updateStoryInfo = useBuilderStore(state => state.updateStoryInfo);
  const updateRsvpInfo = useBuilderStore(state => state.updateRsvpInfo);
  const updateGuestbookInfo = useBuilderStore(state => state.updateGuestbookInfo);
  const updateBgmInfo = useBuilderStore(state => state.updateBgmInfo);

  // Local state for the form
  const [form, setForm] = useState({
    groomName: '', groomNameEn: '', groomFather: '', groomMother: '', groomRelation: '',
    brideName: '', brideNameEn: '', brideFather: '', brideMother: '', brideRelation: '',
    date: '', timeAmPm: 'PM', timeHour: '1', timeMinute: '00',
    venueName: '', address: '',
    // Optional toggles
    useGreeting: true,
    useTransportation: true,
    useGallery: true,
    useAccount: true,
    useStory: true,
    useRsvp: true,
    useGuestbook: true,
    useBgm: true
  });

  useEffect(() => {
    const tSubway = locationInfo.transportation.find(t => t.id === 't1')?.content || '';
    const tBus = locationInfo.transportation.find(t => t.id === 't2')?.content || '';
    const tParking = locationInfo.transportation.find(t => t.id === 't3')?.content || '';

    setForm({
      groomName: mainInfo.groomNameKo || '', groomNameEn: mainInfo.groomNameEn || '', groomFather: mainInfo.groomFather || '', groomMother: mainInfo.groomMother || '', groomRelation: mainInfo.groomRelation || '',
      brideName: mainInfo.brideNameKo || '', brideNameEn: mainInfo.brideNameEn || '', brideFather: mainInfo.brideFather || '', brideMother: mainInfo.brideMother || '', brideRelation: mainInfo.brideRelation || '',
      date: mainInfo.date || '', timeAmPm: mainInfo.timeAmPm || 'PM', timeHour: mainInfo.timeHour || '1', timeMinute: mainInfo.timeMinute || '00',
      venueName: mainInfo.location || '', address: locationInfo.address || '',
      useGreeting: introInfo.useGreeting ?? true,
      useTransportation: locationInfo.useTransportation ?? true,
      useGallery: galleryInfo.useGallery ?? true,
      useAccount: accountInfo.useAccount ?? true,
      useStory: storyInfo.useStory ?? true,
      useRsvp: rsvpInfo.useRsvp ?? true,
      useGuestbook: guestbookInfo.useGuestbook ?? true,
      useBgm: bgmInfo.useBgm ?? true
    });
  }, []);

  const handleSave = () => {
    // 1. 주인공 정보 & 예식 일시
    setMainInfo('groomNameKo', form.groomName);
    setMainInfo('groomNameEn', form.groomNameEn);
    setMainInfo('groomFather', form.groomFather);
    setMainInfo('groomMother', form.groomMother);
    setMainInfo('groomRelation', form.groomRelation);
    
    setMainInfo('brideNameKo', form.brideName);
    setMainInfo('brideNameEn', form.brideNameEn);
    setMainInfo('brideFather', form.brideFather);
    setMainInfo('brideMother', form.brideMother);
    setMainInfo('brideRelation', form.brideRelation);
    
    setMainInfo('date', form.date);
    setMainInfo('timeAmPm', form.timeAmPm);
    setMainInfo('timeHour', form.timeHour);
    setMainInfo('timeMinute', form.timeMinute);
    setMainInfo('location', form.venueName); // Used for cover

    // 2. 예식 장소 및 교통
    setLocationInfo('venueName', form.venueName);
    setLocationInfo('address', form.address);

    // 4. 선택 옵션 ON/OFF
    setGreetingInfo('useGreeting', form.useGreeting);
    setLocationInfo('useTransportation', form.useTransportation);
    setGalleryInfo('useGallery', form.useGallery);
    updateAccountInfo('useAccount', form.useAccount);
    updateStoryInfo('useStory', form.useStory);
    updateRsvpInfo('useRsvp', form.useRsvp);
    updateGuestbookInfo('useGuestbook', form.useGuestbook);
    updateBgmInfo('useBgm', form.useBgm);

    alert('모든 설정이 성공적으로 적용되었습니다! 🎉');
    onClose();
  };

  // Switch Toggle UI Component
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

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }}>
      <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '600px', borderRadius: '16px', display: 'flex', flexDirection: 'column', maxHeight: '90vh', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, backgroundColor: '#fff', borderRadius: '16px 16px 0 0', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '50%', color: '#222', display: 'flex' }}>
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#222' }}>초기 설정 가이드</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>필수 정보 입력 및 선택 기능을 설정하세요.</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '30px' }} className="hide-scrollbar">
          
          {/* 1. 주인공 정보 */}
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

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          {/* 2. 예식 일시 */}
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222', borderBottom: '2px solid #222', paddingBottom: '8px', marginBottom: '16px' }}>2. 예식 일시 (필수)</div>
            <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{ width: '100%', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', marginBottom: '8px', fontSize: '0.95rem' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={form.timeAmPm} onChange={e => setForm({...form, timeAmPm: e.target.value})} style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                <option value="AM">오전</option><option value="PM">오후</option>
              </select>
              <select value={form.timeHour} onChange={e => setForm({...form, timeHour: e.target.value})} style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => <option key={h} value={h}>{h}시</option>)}
              </select>
              <select value={form.timeMinute} onChange={e => setForm({...form, timeMinute: e.target.value})} style={{ flex: 1, padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem', backgroundColor: '#fff' }}>
                {['00', '10', '20', '30', '40', '50'].map(m => <option key={m} value={m}>{m}분</option>)}
              </select>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          {/* 3. 예식 장소 */}
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222', borderBottom: '2px solid #222', paddingBottom: '8px', marginBottom: '16px' }}>3. 예식 장소 (필수)</div>
            <input value={form.venueName} onChange={e => setForm({...form, venueName: e.target.value})} placeholder="웨딩홀 이름 (예: OO 웨딩홀 1층, 층/홀 이름 정확히 입력해주세요)" style={{ width: '100%', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', marginBottom: '8px', fontSize: '0.95rem' }} />
            <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="상세 주소 (예: 서울 강남구 테헤란로 123)" style={{ width: '100%', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' }} />
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          {/* 4. 선택 옵션 */}
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
          
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #ebebeb', backgroundColor: '#fff', borderRadius: '0 0 16px 16px' }}>
          <button 
            onClick={handleSave}
            style={{ width: '100%', padding: '16px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
          >
            <Check size={20} />
            한 번에 적용하고 세부 꾸미기 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSetupModal;
