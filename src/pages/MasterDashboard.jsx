import React, { useEffect, useState } from 'react';
import { getAllInvitations, updatePaymentStatus, deleteInvitation, extendExpiration } from '../api/supabaseApi';
import { Users, BookOpen, ArrowLeft, ExternalLink, Download, LayoutDashboard, CreditCard, Trash2, CalendarPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const MasterDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allInvs, setAllInvs] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // 보안(로그인) 관련 상태
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const MASTER_PASSWORD = 'daywiseadmin!';

  useEffect(() => {
    if (localStorage.getItem('daywise_master_auth') === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllInvitations();
        const invArray = Object.values(data).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllInvs(invArray);
      } catch (err) {
        console.error('Failed to load master data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (isAdminAuthenticated) {
      fetchAll();
    }
  }, [isAdminAuthenticated]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === MASTER_PASSWORD) {
      localStorage.setItem('daywise_master_auth', 'true');
      setIsAdminAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleExportMasterCsv = () => {
    if (allInvs.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    const headers = ['생성일자', '고객명', '결제상태', '참석하객수', '방명록수', '청첩장ID'];
    
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const inv of allInvs) {
      const date = new Date(inv.createdAt).toLocaleString();
      const groom = inv.mainInfo?.groomNameKo || '';
      const bride = inv.mainInfo?.brideNameKo || '';
      const customerName = `"${groom} & ${bride}"`;
      let paymentStatus = '미결제';
      if (inv.payment_status === 'paid') paymentStatus = '결제완료';
      if (inv.payment_status === 'free_pass') paymentStatus = '무료패스';
      
      const rsvpCount = (inv.rsvpList || []).length;
      const guestbookCount = (inv.guestbookInfo?.entries || []).length;
      const invId = inv.id;

      csvRows.push([date, customerName, paymentStatus, rsvpCount, guestbookCount, invId].join(','));
    }

    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const linkEl = document.createElement('a');
    linkEl.href = url;
    linkEl.setAttribute('download', `데이와이즈_전체고객리스트_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
  };

  const handleFreePass = async (id) => {
    if (window.confirm('이 청첩장에 무료 패스를 발급하시겠습니까?\n(1년 무료 호스팅이 제공되며 자물쇠가 해제됩니다)')) {
      setProcessingId(id);
      try {
        await updatePaymentStatus(id, 'free_pass');
        alert('무료 패스가 성공적으로 발급되었습니다.');
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + 365);
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: 'free_pass', expires_at: expDate.toISOString() } : inv));
      } catch (err) {
        alert('무료 패스 발급에 실패했습니다.');
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleCancelFreePass = async (id) => {
    if (window.confirm('정말 무료 패스를 취소하시겠습니까?\n(해당 청첩장은 다시 자물쇠로 잠기게 됩니다)')) {
      setProcessingId(id);
      try {
        await updatePaymentStatus(id, 'unpaid');
        alert('무료 패스가 취소되었습니다.');
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: 'unpaid', expires_at: null } : inv));
      } catch (err) {
        alert('취소 처리 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleExtendFreePass = async (id) => {
    if (window.confirm('이 청첩장의 만료일을 1년(365일) 더 연장하시겠습니까?')) {
      setProcessingId(id);
      try {
        const newExpiresAt = await extendExpiration(id);
        alert('성공적으로 1년 연장되었습니다.');
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, expires_at: newExpiresAt } : inv));
      } catch (err) {
        alert('연장 처리 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleDeleteInvitation = async (id) => {
    if (window.confirm('정말 이 청첩장을 영구적으로 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며 복구가 불가능합니다.')) {
      setProcessingId(id);
      try {
        await deleteInvitation(id);
        alert('성공적으로 삭제되었습니다.');
        setAllInvs(prev => prev.filter(inv => inv.id !== id));
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setProcessingId(null);
      }
    }
  };


  const cardStyle = {
    backgroundColor: '#fff',
    padding: '32px 24px',
    border: '1px solid #EAEAEA',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
  };

  const thStyle = { padding: '12px 10px', fontWeight: '500', color: '#666', borderBottom: '1px solid #000', fontSize: '0.9rem', whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px 10px', borderBottom: '1px solid #EAEAEA', color: '#111', fontSize: '0.95rem', verticalAlign: 'middle' };

  if (!isAdminAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', backgroundColor: '#FAFAFA', fontFamily: 'var(--font-kr-sans)' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', textAlign: 'center', width: '90%', maxWidth: '400px', border: '1px solid #EAEAEA' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#FDFBF7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <LayoutDashboard size={28} color="#000" />
          </div>
          <h2 style={{ marginBottom: '8px', fontSize: '1.4rem', fontWeight: '600' }}>관리자 접속</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '30px' }}>사장님만 접근 가능한 구역입니다.</p>
          
          <form onSubmit={handleAdminLogin}>
            <input 
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{ width: '100%', padding: '14px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #CCC', fontSize: '1rem', textAlign: 'center', backgroundColor: '#FAFAFA' }}
              autoFocus
            />
            <div style={{ height: '24px', marginBottom: '16px' }}>
              {passwordError && <p style={{ color: '#E53E3E', fontSize: '0.85rem', margin: 0, fontWeight: '500' }}>비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}>
              접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', color: '#666', zIndex: 99999 }}>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulseText { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        `}</style>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e0e0e0', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
        <p style={{ fontFamily: 'var(--font-kr-sans, sans-serif)', fontSize: '0.9rem', animation: 'pulseText 1.5s ease-in-out infinite' }}>데이터를 불러오는 중...</p>
      </div>
    );
  }
  
  const totalInvs = allInvs.length;
  let totalRsvps = 0;
  let totalCompanions = 0;
  let totalGuestbooks = 0;

  allInvs.forEach(inv => {
    const rsvpList = inv.rsvpList || [];
    const attendList = rsvpList.filter(r => r.attend === 'yes');
    totalRsvps += attendList.length;
    totalCompanions += attendList.reduce((acc, curr) => acc + (parseInt(curr.companions) || 0), 0);
    
    const guestbookEntries = inv.guestbookInfo?.entries || [];
    totalGuestbooks += guestbookEntries.length;
  });

  const totalExpectedGuests = totalRsvps + totalCompanions;

  const totalPages = Math.ceil(allInvs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvs = allInvs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100dvh', padding: '60px 20px', fontFamily: 'var(--font-kr-sans)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', paddingBottom: '24px', borderBottom: '2px solid #000' }}>
          <div>
            <div style={{ color: '#B0946E', fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 'bold' }}>SUPER ADMIN</div>
            <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.4rem', color: '#000', margin: 0, fontWeight: '500' }}>
              통합 관리자 대시보드
            </h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            <ArrowLeft size={16} /> 메인으로 돌아가기
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
              <LayoutDashboard size={18} /> 누적 발행 청첩장
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalInvs}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>전체 생성된 서비스 수</div>
          </div>
          
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
              <Users size={18} /> 누적 참석 예정객
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalExpectedGuests}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>전체 하객 총합</div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
              <BookOpen size={18} /> 누적 방명록
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalGuestbooks}</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>접수된 축하 메시지 수</div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
              <CreditCard size={18} /> 누적 매출액
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>-</div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>결제 시스템 준비 중</div>
          </div>
        </div>

        {/* Master Table */}
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

                        // 결제일은 만료일 기준 1년 전으로 역산
                        const payDate = new Date(expDate);
                        payDate.setFullYear(payDate.getFullYear() - 1);
                        paymentDate = payDate.toLocaleDateString();
                      }
                    } else {
                      // 미결제(unpaid)인 경우, 삭제 예정일은 생성일로부터 30일 뒤
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
                              {status === 'paid' && <span style={{ fontSize: '0.75rem', color: '#333', fontWeight: 'bold' }}>{Number(inv.payment_amount || 9900).toLocaleString()}원</span>}
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
      </div>
    </div>
  );
};

export default MasterDashboard;
