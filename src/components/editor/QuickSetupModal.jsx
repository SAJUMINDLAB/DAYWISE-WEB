import React, { useState, useEffect } from 'react';
import { X, Zap, Check, MapPin } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import DaumPostcode from 'react-daum-postcode';
import QuickSetupHeroForm from './forms/QuickSetupHeroForm';
import QuickSetupVenueForm from './forms/QuickSetupVenueForm';
import QuickSetupFeatureToggles from './forms/QuickSetupFeatureToggles';

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
  const setGalleryInfo = useBuilderStore(state => state.setGalleryInfo);
  const updateAccountInfo = useBuilderStore(state => state.updateAccountInfo);
  const updateStoryInfo = useBuilderStore(state => state.updateStoryInfo);
  const updateRsvpInfo = useBuilderStore(state => state.updateRsvpInfo);
  const updateGuestbookInfo = useBuilderStore(state => state.updateGuestbookInfo);
  const updateBgmInfo = useBuilderStore(state => state.updateBgmInfo);

  const [showPostcode, setShowPostcode] = useState(false);

  // Local state for the form
  const [form, setForm] = useState({
    groomName: '', groomNameEn: '', groomFather: '', groomMother: '', groomRelation: '',
    brideName: '', brideNameEn: '', brideFather: '', brideMother: '', brideRelation: '',
    date: '', timeAmPm: 'PM', timeHour: '1', timeMinute: '00',
    venueName: '', venueDetail: '', address: '',
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

  const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' };

  const handleCompletePostcode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setForm({ ...form, address: fullAddress });
    setShowPostcode(false);
  };

  useEffect(() => {
    setForm({
      groomName: mainInfo.groomNameKo || '', groomNameEn: mainInfo.groomNameEn || '', groomFather: mainInfo.groomFather || '', groomMother: mainInfo.groomMother || '', groomRelation: mainInfo.groomRelation || '',
      brideName: mainInfo.brideNameKo || '', brideNameEn: mainInfo.brideNameEn || '', brideFather: mainInfo.brideFather || '', brideMother: mainInfo.brideMother || '', brideRelation: mainInfo.brideRelation || '',
      date: mainInfo.date || '', timeAmPm: mainInfo.timeAmPm || 'PM', timeHour: mainInfo.timeHour || '1', timeMinute: mainInfo.timeMinute || '00',
      venueName: mainInfo.location || '', venueDetail: mainInfo.locationDetail || '', address: locationInfo.address || '',
      useGreeting: introInfo.useGreeting ?? true,
      useTransportation: locationInfo.useTransportation ?? true,
      useGallery: galleryInfo.useGallery ?? true,
      useAccount: accountInfo.useAccount ?? true,
      useStory: storyInfo.useStory ?? true,
      useRsvp: rsvpInfo.useRsvp ?? true,
      useGuestbook: guestbookInfo.useGuestbook ?? true,
      useBgm: bgmInfo.useBgm ?? true
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setMainInfo('location', form.venueName);
    setMainInfo('locationDetail', form.venueDetail);

    // 2. 예식 장소 및 교통
    setLocationInfo('venueName', form.venueName);
    setLocationInfo('venueDetail', form.venueDetail);
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


  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }}>
      <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '600px', borderRadius: '16px', display: 'flex', flexDirection: 'column', maxHeight: '90vh', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        
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

        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '30px' }} className="hide-scrollbar">
          
          <QuickSetupHeroForm form={form} setForm={setForm} />

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          <QuickSetupVenueForm form={form} setForm={setForm} setShowPostcode={setShowPostcode} />

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          <QuickSetupFeatureToggles form={form} setForm={setForm} />
          
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid #ebebeb', backgroundColor: '#fff', borderRadius: '0 0 16px 16px' }}>
          <button 
            onClick={handleSave}
            style={{ width: '100%', padding: '16px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
          >
            <Check size={20} />
            한 번에 적용하고 세부 꾸미기 시작
          </button>
        </div>

        {showPostcode && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10001, borderRadius: '16px' }}>
            <div style={{ width: '90%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>주소 검색</div>
                <button onClick={() => setShowPostcode(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  <X size={20} />
                </button>
              </div>
              <DaumPostcode onComplete={handleCompletePostcode} style={{ width: '100%', height: '400px' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickSetupModal;
