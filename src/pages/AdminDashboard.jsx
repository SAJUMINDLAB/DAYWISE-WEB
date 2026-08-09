import React, { useEffect, useState } from 'react';
import { getAllInvitations } from '../api/supabaseApi';
import { Users, BookOpen, Check, X, ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedInv, setSelectedInv] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      const data = await getAllInvitations();
      // 시간순(최신순) 정렬 보장
      const invArray = Object.values(data).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      if (invArray.length > 0) {
        setSelectedInv(invArray[0]);
      }
      setLoading(false);
    };
    fetchInvitations();
  }, []);

  const handleExportCsv = () => {
    if (!selectedInv || !selectedInv.rsvpList || selectedInv.rsvpList.length === 0) {
      alert('다운로드할 명단이 없습니다.');
      return;
    }

    const headers = ['접수일시', '구분', '성함', '참석여부', '동행인수', '식사여부', '연락처', '메시지'];
    const rsvpList = selectedInv.rsvpList;
    
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of rsvpList) {
      const date = new Date(row.submittedAt).toLocaleString();
      const side = row.side === 'groom' ? '신랑측' : '신부측';
      const name = `"${row.name || ''}"`;
      const attend = row.attend === 'yes' ? '참석' : '불참';
      const companions = row.attend === 'yes' ? row.companions : '0';
      const meal = row.meal === 'yes' ? '예' : row.meal === 'no' ? '아니오' : row.meal === 'unsure' ? '미정' : '';
      const contact = `"${row.contact || ''}"`;
      const message = `"${(row.message || '').replace(/"/g, '""')}"`; // 이스케이프 처리

      csvRows.push([date, side, name, attend, companions, meal, contact, message].join(','));
    }

    // 한글 깨짐 방지를 위해 BOM 추가
    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `참석의사명단_${selectedInv.mainInfo.groomNameKo}_${selectedInv.mainInfo.brideNameKo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', color: '#666', zIndex: 99999 }}>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulseText { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        `}</style>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e0e0e0', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
        <p style={{ fontFamily: 'var(--font-kr-sans, sans-serif)', fontSize: '0.9rem', animation: 'pulseText 1.5s ease-in-out infinite' }}>관리자 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (!selectedInv) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', color: '#666', fontFamily: 'var(--font-kr-sans)', zIndex: 99999 }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>생성된 청첩장이 없습니다.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>돌아가기</button>
      </div>
    );
  }

  const rsvpList = selectedInv.rsvpList || [];
  const guestbookEntries = selectedInv.guestbookInfo?.entries || [];
  
  const attendCount = rsvpList.filter(r => r.attend === 'yes').length;
  const totalCompanions = rsvpList.filter(r => r.attend === 'yes').reduce((acc, curr) => acc + (parseInt(curr.companions) || 0), 0);
  const totalPeople = attendCount + totalCompanions;
  const groomSideCount = rsvpList.filter(r => r.attend === 'yes' && r.side === 'groom').length;
  const brideSideCount = rsvpList.filter(r => r.attend === 'yes' && r.side === 'bride').length;
  const mealYesCount = rsvpList.filter(r => r.attend === 'yes' && r.meal === 'yes').length;

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '32px 24px',
    border: '1px solid #EAEAEA',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const thStyle = { padding: '16px 20px', fontWeight: '500', color: '#666', borderBottom: '1px solid #000', fontSize: '0.9rem' };
  const tdStyle = { padding: '16px 20px', borderBottom: '1px solid #EAEAEA', color: '#111', fontSize: '0.95rem', verticalAlign: 'middle' };

  return (
    <div style={{ backgroundColor: '#FAFAFA', height: '100dvh', overflowY: 'auto', padding: '60px 20px', fontFamily: 'var(--font-kr-sans)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', color: '#666', marginBottom: '32px', padding: 0 }}
        >
          <ArrowLeft size={18} /> 이전으로
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', paddingBottom: '24px', borderBottom: '2px solid #000' }}>
          <div>
            <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '0.05em' }}>ADMIN DASHBOARD</div>
            <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.2rem', color: '#000', margin: 0, fontWeight: '500' }}>
              {selectedInv.mainInfo.groomNameKo} & {selectedInv.mainInfo.brideNameKo} 명단 관리
            </h1>
          </div>
          <a 
            href={`/v/${selectedInv.id}`} 
            target="_blank" 
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#000', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}
          >
            <ExternalLink size={16} /> 청첩장 확인
          </a>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '60px' }}>
          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>총 참석 예정 인원</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalPeople}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>본인 {attendCount}명 + 동행인 {totalCompanions}명</div>
          </div>
          
          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>신랑측 / 신부측 (본인 기준)</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{groomSideCount}</span>
              <span style={{ color: '#CCC', fontSize: '2rem', fontWeight: '300' }}>/</span>
              <span>{brideSideCount}</span>
            </div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>접수된 인원 기준 비율</div>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>식사 예정 인원 (본인 기준)</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{mealYesCount}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>답례품 수량 체크 참고</div>
          </div>
        </div>

        {/* RSVP Table */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA', marginBottom: '60px' }}>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#000', margin: 0, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} /> 참석 의사 (RSVP) 명단
            </h2>
            <button 
              onClick={handleExportCsv}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #CCC', color: '#333', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#CCC'; }}
            >
              <Download size={16} /> 엑셀 다운로드 (CSV)
            </button>
          </div>
          <div style={{ padding: '12px 24px', backgroundColor: '#F8F9FA', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            👈 표를 좌우로 스와이프하여 모든 내용을 확인하세요 👉
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>접수일</th>
                  <th style={thStyle}>구분</th>
                  <th style={thStyle}>성함</th>
                  <th style={thStyle}>참석여부</th>
                  <th style={thStyle}>동행인</th>
                  <th style={thStyle}>식사</th>
                  <th style={thStyle}>연락처</th>
                  <th style={thStyle}>메시지</th>
                </tr>
              </thead>
              <tbody>
                {rsvpList.length === 0 ? (
                  <tr><td colSpan="8" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>접수된 참석 의사가 없습니다.</td></tr>
                ) : (
                  rsvpList.map((rsvp, idx) => (
                    <tr key={idx} style={{ transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F9F9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ ...tdStyle, color: '#888', fontSize: '0.85rem' }}>{new Date(rsvp.submittedAt).toLocaleDateString()} {new Date(rsvp.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td style={{ ...tdStyle, color: '#666', fontSize: '0.9rem' }}>{rsvp.side === 'groom' ? '신랑측' : '신부측'}</td>
                      <td style={{ ...tdStyle, fontWeight: 'bold' }}>{rsvp.name}</td>
                      <td style={tdStyle}>
                        {rsvp.attend === 'yes' ? '참석' : <span style={{ color: '#999' }}>불참</span>}
                      </td>
                      <td style={{ ...tdStyle, color: rsvp.attend === 'yes' && parseInt(rsvp.companions)>0 ? '#111' : '#CCC' }}>
                        {rsvp.attend === 'yes' ? `${rsvp.companions}명` : '-'}
                      </td>
                      <td style={{ ...tdStyle, color: '#666' }}>
                        {rsvp.meal === 'yes' ? '예' : rsvp.meal === 'no' ? '아니오' : rsvp.meal === 'unsure' ? '미정' : '-'}
                      </td>
                      <td style={tdStyle}>{rsvp.contact || '-'}</td>
                      <td style={{ ...tdStyle, maxWidth: '250px', lineHeight: '1.4' }}>
                        <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} title={rsvp.message}>{rsvp.message || '-'}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guestbook Table */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="#000" />
            <h2 style={{ fontSize: '1.2rem', color: '#000', margin: 0, fontWeight: '500' }}>방명록 현황 ({guestbookEntries.length})</h2>
          </div>
          <div style={{ padding: '12px 24px', backgroundColor: '#F8F9FA', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            👈 표를 좌우로 스와이프하여 모든 내용을 확인하세요 👉
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: '150px' }}>작성일</th>
                  <th style={{ ...thStyle, width: '120px' }}>성함</th>
                  <th style={thStyle}>내용</th>
                </tr>
              </thead>
              <tbody>
                {guestbookEntries.length === 0 ? (
                  <tr><td colSpan="3" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>작성된 방명록이 없습니다.</td></tr>
                ) : (
                  guestbookEntries.map((entry, idx) => (
                    <tr key={idx} style={{ transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F9F9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ ...tdStyle, color: '#888', fontSize: '0.85rem' }}>{entry.date}</td>
                      <td style={{ ...tdStyle, fontWeight: 'bold' }}>{entry.name}</td>
                      <td style={{ ...tdStyle, lineHeight: '1.6', whiteSpace: 'pre-wrap', color: '#333' }}>{entry.content}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
