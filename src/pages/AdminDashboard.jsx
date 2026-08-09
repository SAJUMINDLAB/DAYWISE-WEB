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
      // ?œê°„??ìµœì‹ ?? ?•ë ¬ ë³´ì¥
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
      alert('?¤ìš´ë¡œë“œ??ëª…ë‹¨???†ìŠµ?ˆë‹¤.');
      return;
    }

    const headers = ['?‘ìˆ˜?¼ì‹œ', 'êµ¬ë¶„', '?±í•¨', 'ì°¸ì„?¬ë?', '?™í–‰?¸ìˆ˜', '?ì‚¬?¬ë?', '?°ë½ì²?, 'ë©”ì‹œì§€'];
    const rsvpList = selectedInv.rsvpList;
    
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of rsvpList) {
      const date = new Date(row.submittedAt).toLocaleString();
      const side = row.side === 'groom' ? '? ë‘ì¸? : '? ë?ì¸?;
      const name = `"${row.name || ''}"`;
      const attend = row.attend === 'yes' ? 'ì°¸ì„' : 'ë¶ˆì°¸';
      const companions = row.attend === 'yes' ? row.companions : '0';
      const meal = row.meal === 'yes' ? '?? : row.meal === 'no' ? '?„ë‹ˆ?? : row.meal === 'unsure' ? 'ë¯¸ì •' : '';
      const contact = `"${row.contact || ''}"`;
      const message = `"${(row.message || '').replace(/"/g, '""')}"`; // ?´ìŠ¤ì¼€?´í”„ ì²˜ë¦¬

      csvRows.push([date, side, name, attend, companions, meal, contact, message].join(','));
    }

    // ?œê? ê¹¨ì§ ë°©ì?ë¥??„í•´ BOM ì¶”ê?
    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ì°¸ì„?˜ì‚¬ëª…ë‹¨_${selectedInv.mainInfo.groomNameKo}_${selectedInv.mainInfo.brideNameKo}.csv`);
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
        <p style={{ fontFamily: 'var(--font-kr-sans, sans-serif)', fontSize: '0.9rem', animation: 'pulseText 1.5s ease-in-out infinite' }}>ê´€ë¦¬ì ?°ì´?°ë? ë¶ˆëŸ¬?¤ëŠ” ì¤?..</p>
      </div>
    );
  }

  if (!selectedInv) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', color: '#666', fontFamily: 'var(--font-kr-sans)', zIndex: 99999 }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>?ì„±??ì²?²©?¥ì´ ?†ìŠµ?ˆë‹¤.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>?Œì•„ê°€ê¸?/button>
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
          <ArrowLeft size={18} /> ?´ì „?¼ë¡œ
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', paddingBottom: '24px', borderBottom: '2px solid #000' }}>
          <div>
            <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '8px', letterSpacing: '0.05em' }}>ADMIN DASHBOARD</div>
            <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.2rem', color: '#000', margin: 0, fontWeight: '500' }}>
              {selectedInv.mainInfo.groomNameKo} & {selectedInv.mainInfo.brideNameKo} ëª…ë‹¨ ê´€ë¦?            </h1>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <a 
                href={`/view/${selectedInv.id}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#000', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}
              >
                <ExternalLink size={16} /> ì²?²©???•ì¸
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '60px' }}>
          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>ì´?ì°¸ì„ ?ˆì • ?¸ì›</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalPeople}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>ë³¸ì¸ {attendCount}ëª?+ ?™í–‰??{totalCompanions}ëª?/div>
          </div>
          
          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>? ë‘ì¸?/ ? ë?ì¸?(ë³¸ì¸ ê¸°ì?)</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{groomSideCount}</span>
              <span style={{ color: '#CCC', fontSize: '2rem', fontWeight: '300' }}>/</span>
              <span>{brideSideCount}</span>
            </div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>?‘ìˆ˜???¸ì› ê¸°ì? ë¹„ìœ¨</div>
          </div>

          <div style={cardStyle}>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>?ì‚¬ ?ˆì • ?¸ì› (ë³¸ì¸ ê¸°ì?)</div>
            <div style={{ fontSize: '3rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{mealYesCount}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>?µë????˜ëŸ‰ ì²´í¬ ì°¸ê³ </div>
          </div>
        </div>

        {/* RSVP Table */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA', marginBottom: '60px' }}>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EAEAEA', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#000', margin: 0, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} /> ì°¸ì„ ?˜ì‚¬ (RSVP) ëª…ë‹¨
            </h2>
            <button 
              onClick={handleExportCsv}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #CCC', color: '#333', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#CCC'; }}
            >
              <Download size={16} /> ?‘ì? ?¤ìš´ë¡œë“œ (CSV)
            </button>
          </div>
          <div style={{ padding: '12px 24px', backgroundColor: '#F8F9FA', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ?‘ˆ ?œë? ì¢Œìš°ë¡??¤ì??´í”„?˜ì—¬ ëª¨ë“  ?´ìš©???•ì¸?˜ì„¸???‘‰
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>?‘ìˆ˜??/th>
                  <th style={thStyle}>êµ¬ë¶„</th>
                  <th style={thStyle}>?±í•¨</th>
                  <th style={thStyle}>ì°¸ì„?¬ë?</th>
                  <th style={thStyle}>?™í–‰??/th>
                  <th style={thStyle}>?ì‚¬</th>
                  <th style={thStyle}>?°ë½ì²?/th>
                  <th style={thStyle}>ë©”ì‹œì§€</th>
                </tr>
              </thead>
              <tbody>
                {rsvpList.length === 0 ? (
                  <tr><td colSpan="8" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>?‘ìˆ˜??ì°¸ì„ ?˜ì‚¬ê°€ ?†ìŠµ?ˆë‹¤.</td></tr>
                ) : (
                  rsvpList.map((rsvp, idx) => (
                    <tr key={idx} style={{ transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F9F9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ ...tdStyle, color: '#888', fontSize: '0.85rem' }}>{new Date(rsvp.submittedAt).toLocaleDateString()} {new Date(rsvp.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td style={{ ...tdStyle, color: '#666', fontSize: '0.9rem' }}>{rsvp.side === 'groom' ? '? ë‘ì¸? : '? ë?ì¸?}</td>
                      <td style={{ ...tdStyle, fontWeight: 'bold' }}>{rsvp.name}</td>
                      <td style={tdStyle}>
                        {rsvp.attend === 'yes' ? 'ì°¸ì„' : <span style={{ color: '#999' }}>ë¶ˆì°¸</span>}
                      </td>
                      <td style={{ ...tdStyle, color: rsvp.attend === 'yes' && parseInt(rsvp.companions)>0 ? '#111' : '#CCC' }}>
                        {rsvp.attend === 'yes' ? `${rsvp.companions}ëª? : '-'}
                      </td>
                      <td style={{ ...tdStyle, color: '#666' }}>
                        {rsvp.meal === 'yes' ? '?? : rsvp.meal === 'no' ? '?„ë‹ˆ?? : rsvp.meal === 'unsure' ? 'ë¯¸ì •' : '-'}
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
            <h2 style={{ fontSize: '1.2rem', color: '#000', margin: 0, fontWeight: '500' }}>ë°©ëª…ë¡??„í™© ({guestbookEntries.length})</h2>
          </div>
          <div style={{ padding: '12px 24px', backgroundColor: '#F8F9FA', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ?‘ˆ ?œë? ì¢Œìš°ë¡??¤ì??´í”„?˜ì—¬ ëª¨ë“  ?´ìš©???•ì¸?˜ì„¸???‘‰
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: '150px' }}>?‘ì„±??/th>
                  <th style={{ ...thStyle, width: '120px' }}>?±í•¨</th>
                  <th style={thStyle}>?´ìš©</th>
                </tr>
              </thead>
              <tbody>
                {guestbookEntries.length === 0 ? (
                  <tr><td colSpan="3" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>?‘ì„±??ë°©ëª…ë¡ì´ ?†ìŠµ?ˆë‹¤.</td></tr>
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
