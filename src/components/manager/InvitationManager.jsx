import React, { useState } from 'react';
import { deleteGuestbookEntry, deleteRsvpEntry } from '../../api/supabaseApi';
import { X, Trash2, Users, MessageSquare, Download } from 'lucide-react';

const InvitationManager = ({ invitation, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' or 'guestbook'
  const [isDeleting, setIsDeleting] = useState(false);

  const rsvpList = invitation.rsvpList || [];
  const guestbookList = (invitation.guestbookInfo && invitation.guestbookInfo.entries) ? invitation.guestbookInfo.entries : [];

  const handleDeleteRsvp = async (id) => {
    if (!window.confirm('정말 이 RSVP 항목을 삭제하시겠습니까?')) return;
    try {
      setIsDeleting(true);
      await deleteRsvpEntry(id);
      if (onUpdate) onUpdate();
    } catch (e) {
      alert(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteGuestbook = async (id) => {
    if (!window.confirm('정말 이 방명록을 삭제하시겠습니까?')) return;
    try {
      setIsDeleting(true);
      await deleteGuestbookEntry(id);
      if (onUpdate) onUpdate();
    } catch (e) {
      alert(e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const downloadCSV = () => {
    if (rsvpList.length === 0) return;
    
    const headers = ['구분', '이름', '참석여부', '동반인원', '식사여부', '연락처', '전달할말'];
    const csvRows = [headers.join(',')];
    
    rsvpList.forEach(rsvp => {
      const side = rsvp.side === 'groom' ? '신랑측' : (rsvp.side === 'bride' ? '신부측' : rsvp.side);
      const attend = rsvp.attend === 'yes' ? '참석' : '불참';
      const companions = rsvp.companions || '0';
      const meal = rsvp.meal === 'yes' ? '식사' : (rsvp.meal === 'no' ? '안함' : '-');
      const contact = rsvp.contact || '';
      const message = `"${(rsvp.message || '').replace(/"/g, '""')}"`;
      
      csvRows.push([side, rsvp.name, attend, companions, meal, contact, message].join(','));
    });
    
    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RSVP명단.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'var(--font-kr-sans)'
    }}>
      <div style={{
        backgroundColor: '#fff', width: '90%', maxWidth: '1100px', height: '90vh',
        borderRadius: '16px', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '24px 32px', borderBottom: '1px solid #EBEBEB', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#2C2C2C' }}>
            청첩장 관리
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px'
          }}>
            <X size={24} color="#666" />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #EBEBEB', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('rsvp')}
              style={{
                padding: '16px 24px', background: 'none', border: 'none',
                borderBottom: activeTab === 'rsvp' ? '3px solid #D4AF37' : '3px solid transparent',
                color: activeTab === 'rsvp' ? '#D4AF37' : '#888',
                fontWeight: activeTab === 'rsvp' ? 'bold' : 'normal',
                cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <Users size={18} /> RSVP 명단 ({rsvpList.length})
            </button>
            {activeTab === 'rsvp' && rsvpList.length > 0 && (
              <button onClick={downloadCSV} style={{
                marginLeft: '16px', display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', backgroundColor: '#f0f0f0', border: '1px solid #ddd',
                borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#555'
              }}>
                <Download size={14} /> 엑셀 다운로드
              </button>
            )}
          </div>
          <button 
            onClick={() => setActiveTab('guestbook')}
            style={{
              padding: '16px 24px', background: 'none', border: 'none',
              borderBottom: activeTab === 'guestbook' ? '3px solid #D4AF37' : '3px solid transparent',
              color: activeTab === 'guestbook' ? '#D4AF37' : '#888',
              fontWeight: activeTab === 'guestbook' ? 'bold' : 'normal',
              cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <MessageSquare size={18} /> 방명록 관리 ({guestbookList.length})
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: '#FDFBF7' }}>
          {activeTab === 'rsvp' && (
            <div>
              {rsvpList.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', padding: '60px 0' }}>아직 제출된 RSVP 내역이 없습니다.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <thead style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #EBEBEB' }}>
                    <tr>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>구분</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>이름</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>참석여부</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>동반인원</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>식사여부</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>연락처</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>전달할말</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvpList.map(rsvp => (
                      <tr key={rsvp.id} style={{ borderBottom: '1px solid #EBEBEB' }}>
                        <td style={{ padding: '16px' }}>{rsvp.side === 'groom' ? '신랑측' : (rsvp.side === 'bride' ? '신부측' : rsvp.side)}</td>
                        <td style={{ padding: '16px', fontWeight: '500' }}>{rsvp.name}</td>
                        <td style={{ padding: '16px', color: rsvp.attend === 'yes' ? 'green' : 'red' }}>
                          {rsvp.attend === 'yes' ? '참석' : '불참'}
                        </td>
                        <td style={{ padding: '16px' }}>{rsvp.companions === '0' || !rsvp.companions ? '-' : `${rsvp.companions}명`}</td>
                        <td style={{ padding: '16px' }}>{rsvp.meal === 'yes' ? '식사' : (rsvp.meal === 'no' ? '안함' : '-')}</td>
                        <td style={{ padding: '16px' }}>{rsvp.contact || '-'}</td>
                        <td style={{ padding: '16px', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={rsvp.message || ''}>
                          {rsvp.message || '-'}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button onClick={() => handleDeleteRsvp(rsvp.id)} disabled={isDeleting} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}>
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'guestbook' && (
            <div>
              {guestbookList.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', padding: '60px 0' }}>아직 등록된 방명록이 없습니다.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {guestbookList.map(gb => (
                    <div key={gb.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #EBEBEB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 'bold', color: '#2C2C2C', fontSize: '1.1rem' }}>{gb.name}</span>
                          <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{gb.date}</span>
                        </div>
                        <p style={{ color: '#555', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{gb.content}</p>
                      </div>
                      <button onClick={() => handleDeleteGuestbook(gb.id)} disabled={isDeleting} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f', padding: '8px' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitationManager;
