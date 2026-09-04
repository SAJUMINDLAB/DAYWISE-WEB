import React from 'react';
import { Users, Download, ExternalLink, CalendarPlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MasterTable = ({ 
  currentInvs, 
  processingId, 
  handleExportMasterCsv, 
  handleFreePass, 
  handleCancelFreePass, 
  handleExtendFreePass, 
  handleDeleteInvitation,
  totalPages,
  currentPage,
  setCurrentPage
}) => {
  const thStyle = { padding: '12px 10px', fontWeight: '500', color: '#666', borderBottom: '1px solid #000', fontSize: '0.9rem', whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px 10px', borderBottom: '1px solid #EAEAEA', color: '#111', fontSize: '0.95rem', verticalAlign: 'middle' };

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <div style={{ padding: '24px 30px', borderBottom: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAFA', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#000', margin: 0, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={20} /> 고객 리스트
        </h2>
        <button 
          onClick={handleExportMasterCsv}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #CCC', borderRadius: '4px', color: '#333', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F5F5'; e.currentTarget.style.borderColor = '#000'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#CCC'; }}
        >
          <Download size={16} /> 전체 엑셀 다운로드 (CSV)
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
          <thead>
            <tr>
              <th style={{...thStyle, backgroundColor: '#fff', padding: '12px 10px'}}>생성일 (최종수정일)</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>고객 정보 (이름/아이디)</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>결제 상태 (금액/결제일)</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>삭제 예정일</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>참석자(팀)</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>방명록</th>
              <th style={{...thStyle, backgroundColor: '#fff'}}>청첩장 주소</th>
              <th style={{...thStyle, backgroundColor: '#fff', textAlign: 'center'}}>관리 액션</th>
            </tr>
          </thead>
          <tbody>
            {currentInvs.length === 0 ? (
              <tr><td colSpan="8" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>생성된 청첩장이 없습니다.</td></tr>
            ) : (
              currentInvs.map((inv) => {
                const rsvpCount = (inv.rsvpList || []).length;
                const guestbookCount = (inv.guestbookInfo?.entries || []).length;
                const date = new Date(inv.createdAt).toLocaleDateString();
                const updatedAtDate = inv.updatedAt ? new Date(inv.updatedAt).toLocaleDateString() : '-';
                const weddingDate = inv.mainInfo?.date ? new Date(inv.mainInfo.date).toLocaleDateString() : '미정';
                
                const status = inv.payment_status;
                let statusText = '미결제';
                let statusBg = '#F5F5F5';
                let statusColor = '#666';
                let paymentDate = '-';
                let expiryDate = '-';
                let isExpiryNear = false;

                if (status === 'paid' || status === 'free_pass') {
                  if (status === 'paid') {
                    statusText = '결제완료';
                    statusBg = '#E6F4EA';
                    statusColor = '#137333';
                  } else {
                    statusText = '무료패스';
                    statusBg = '#E8F0FE';
                    statusColor = '#1A73E8';
                  }
                  
                  if (inv.expires_at) {
                    const expDate = new Date(inv.expires_at);
                    expiryDate = expDate.toLocaleDateString();
                    const diffTime = expDate - new Date();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    isExpiryNear = diffDays <= 30;

                    const payDate = new Date(expDate);
                    payDate.setFullYear(payDate.getFullYear() - 1);
                    paymentDate = payDate.toLocaleDateString();
                  }
                } else {
                  const expDate = new Date(inv.createdAt);
                  expDate.setDate(expDate.getDate() + 30);
                  expiryDate = expDate.toLocaleDateString();
                  const diffTime = expDate - new Date();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  isExpiryNear = diffDays <= 30;
                }
                
                return (
                  <tr key={inv.id} style={{ transition: 'background-color 0.2s', borderBottom: '1px solid #F0F0F0' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDFBF7'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ ...tdStyle, padding: '12px 10px', color: '#888', fontSize: '0.85rem' }}>
                      <div style={{ marginBottom: '4px' }}>{date}</div>
                      {updatedAtDate !== '-' && <div style={{ fontSize: '0.75rem', color: '#AAA' }}>수정: {updatedAtDate}</div>}
                    </td>
                    <td style={{ ...tdStyle }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333', marginBottom: '4px' }}>
                        {inv.mainInfo?.groomNameKo} & {inv.mainInfo?.brideNameKo}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>예식: {weddingDate}</div>
                        <div style={{ fontSize: '0.75rem', color: '#1A73E8', wordBreak: 'normal' }}>ID: {inv.user?.email || inv.user?.id || '비회원'}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '70px', padding: '4px 10px', backgroundColor: statusBg, color: statusColor, borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                          {statusText}
                        </span>
                        {paymentDate !== '-' && <span style={{ fontSize: '0.75rem', color: '#888' }}>결제일: {paymentDate}</span>}
                          {status === 'paid' && <span style={{ fontSize: '0.75rem', color: '#333', fontWeight: 'bold' }}>{Number(inv.payment_amount || 19900).toLocaleString()}원</span>}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: isExpiryNear ? '#E53E3E' : '#333', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {expiryDate}
                    </td>
                    <td style={{ ...tdStyle, color: rsvpCount > 0 ? '#111' : '#AAA' }}>{rsvpCount}건</td>
                    <td style={{ ...tdStyle, color: guestbookCount > 0 ? '#111' : '#AAA' }}>{guestbookCount}건</td>
                    <td style={{ ...tdStyle, maxWidth: 'none', whiteSpace: 'nowrap' }}>
                        <a href={`/v/${inv.id}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', border: '1px solid #EAEAEA', borderRadius: '4px', color: '#1A73E8', textDecoration: 'none', fontSize: '0.75rem', transition: 'all 0.2s', backgroundColor: '#F8FBFF', wordBreak: 'normal', lineHeight: '1.2' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8F0FE'; e.currentTarget.style.borderColor = '#1A73E8'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F8FBFF'; e.currentTarget.style.borderColor = '#EAEAEA'; }}>
                          {inv.id}
                          <ExternalLink size={12} style={{ flexShrink: 0 }} />
                        </a>
                      </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      {processingId === inv.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#666', fontSize: '0.85rem', fontStyle: 'italic' }}>
                          <style>{`@keyframes spin-small { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                          <div style={{ width: '12px', height: '12px', border: '2px solid #ccc', borderTop: '2px solid #666', borderRadius: '50%', animation: 'spin-small 1s linear infinite' }} />
                          처리중...
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          <Link to={`/admin/${inv.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}>
                            <Users size={14} /> 관리
                          </Link>
                          {(!status || status === 'unpaid') && (
                            <button onClick={() => handleFreePass(inv.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #000', color: '#000', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}>
                              무료패스
                            </button>
                          )}
                          {(status === 'free_pass' || status === 'paid') && (
                            <button onClick={() => handleExtendFreePass(inv.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #1A73E8', color: '#1A73E8', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1A73E8'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#1A73E8'; }}>
                              <CalendarPlus size={14} /> +1년 연장
                            </button>
                          )}
                          {status === 'free_pass' && (
                            <button onClick={() => handleCancelFreePass(inv.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #E53E3E', color: '#E53E3E', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E53E3E'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#E53E3E'; }}>
                              취소
                            </button>
                          )}
                          <button onClick={() => handleDeleteInvitation(inv.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #AAA', color: '#AAA', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E53E3E'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#E53E3E'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#AAA'; e.currentTarget.style.borderColor = '#AAA'; }}>
                            <Trash2 size={14} /> 삭제
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '4px', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAEAEA' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '6px 10px',
                minWidth: '36px',
                backgroundColor: currentPage === page ? '#000' : '#fff',
                color: currentPage === page ? '#fff' : '#666',
                border: '1px solid',
                borderColor: currentPage === page ? '#000' : '#DDD',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: currentPage === page ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MasterTable;
