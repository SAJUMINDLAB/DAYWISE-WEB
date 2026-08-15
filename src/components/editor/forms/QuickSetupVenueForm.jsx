import React from 'react';
import { MapPin } from 'lucide-react';

const QuickSetupVenueForm = ({ form, setForm, setShowPostcode }) => {
  const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid #ebebeb', borderRadius: '6px', fontSize: '0.95rem' };

  return (
    <>
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

      <div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#222', borderBottom: '2px solid #222', paddingBottom: '8px', marginBottom: '16px' }}>3. 예식 장소 (필수)</div>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>예식장 이름</label>
            <input type="text" style={inputStyle} value={form.venueName} onChange={e => setForm({...form, venueName: e.target.value})} placeholder="예: 하우스 오브 더 라움" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>상세 홀 정보 (선택)</label>
            <input type="text" style={inputStyle} value={form.venueDetail} onChange={e => setForm({...form, venueDetail: e.target.value})} placeholder="예: 그라스 가든" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>도로명 주소</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" style={{...inputStyle, flex: 1}} value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="우편번호 검색을 이용해주세요" />
              <button onClick={() => setShowPostcode(true)} style={{ padding: '0 16px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <MapPin size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}/> 검색
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0066cc', marginTop: '4px', lineHeight: '1.4' }}>
              ※ 정확한 네비게이션 연동(티맵, 카카오내비, 네이버지도)을 위해 반드시 주소 검색을 통해 확인된 주소로 등록해주세요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickSetupVenueForm;
