import React, { useEffect, useState } from 'react';
import { getAllInvitations, updatePaymentStatus, deleteInvitation, extendExpiration } from '../api/invitationApi';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/dashboard/AdminLogin';
import MasterStats from '../components/dashboard/MasterStats';
import MasterTable from '../components/dashboard/MasterTable';

const MasterDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allInvs, setAllInvs] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

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
    if (isAdminAuthenticated) fetchAll();
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
    const csvRows = [headers.join(',')];
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
      csvRows.push([date, customerName, paymentStatus, rsvpCount, guestbookCount, inv.id].join(','));
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
    if (window.confirm('이 청첩장에 무료 패스를 발급하시겠습니까?')) {
      setProcessingId(id);
      try {
        await updatePaymentStatus(id, 'free_pass');
        alert('무료 패스가 발급되었습니다.');
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + 365);
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: 'free_pass', expires_at: expDate.toISOString() } : inv));
      } catch (err) {
        alert('발급에 실패했습니다.');
      } finally { setProcessingId(null); }
    }
  };

  const handleCancelFreePass = async (id) => {
    if (window.confirm('무료 패스를 취소하시겠습니까?')) {
      setProcessingId(id);
      try {
        await updatePaymentStatus(id, 'unpaid');
        alert('무료 패스가 취소되었습니다.');
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: 'unpaid', expires_at: null } : inv));
      } catch (err) {
        alert('취소 오류');
      } finally { setProcessingId(null); }
    }
  };

  const handleExtendFreePass = async (id) => {
    if (window.confirm('만료일을 1년 연장하시겠습니까?')) {
      setProcessingId(id);
      try {
        const newExpiresAt = await extendExpiration(id);
        alert('성공적으로 1년 연장되었습니다.');
        setAllInvs(prev => prev.map(inv => inv.id === id ? { ...inv, expires_at: newExpiresAt } : inv));
      } catch (err) {
        alert('연장 오류');
      } finally { setProcessingId(null); }
    }
  };

  const handleDeleteInvitation = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까? (복구 불가)')) {
      setProcessingId(id);
      try {
        await deleteInvitation(id);
        alert('성공적으로 삭제되었습니다.');
        setAllInvs(prev => prev.filter(inv => inv.id !== id));
      } catch (err) {
        alert('삭제 오류');
      } finally { setProcessingId(null); }
    }
  };

  if (!isAdminAuthenticated) {
    return <AdminLogin adminPassword={adminPassword} setAdminPassword={setAdminPassword} passwordError={passwordError} handleAdminLogin={handleAdminLogin} />;
  }

  if (loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e0e0e0', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  let totalRsvps = 0, totalCompanions = 0, totalGuestbooks = 0;
  allInvs.forEach(inv => {
    const rsvpList = inv.rsvpList || [];
    const attendList = rsvpList.filter(r => r.attend === 'yes');
    totalRsvps += attendList.length;
    totalCompanions += attendList.reduce((acc, curr) => acc + (parseInt(curr.companions) || 0), 0);
    totalGuestbooks += (inv.guestbookInfo?.entries || []).length;
  });

  const totalPages = Math.ceil(allInvs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvs = allInvs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100dvh', padding: '60px 20px', fontFamily: 'var(--font-kr-sans)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', paddingBottom: '24px', borderBottom: '2px solid #000' }}>
          <div>
            <div style={{ color: '#B0946E', fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 'bold' }}>SUPER ADMIN</div>
            <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '2.4rem', color: '#000', margin: 0, fontWeight: '500' }}>통합 관리자 대시보드</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            <ArrowLeft size={16} /> 메인으로 돌아가기
          </button>
        </div>

        <MasterStats totalInvs={allInvs.length} totalExpectedGuests={totalRsvps + totalCompanions} totalGuestbooks={totalGuestbooks} />
        
        <MasterTable 
          currentInvs={currentInvs} 
          processingId={processingId}
          handleExportMasterCsv={handleExportMasterCsv}
          handleFreePass={handleFreePass}
          handleCancelFreePass={handleCancelFreePass}
          handleExtendFreePass={handleExtendFreePass}
          handleDeleteInvitation={handleDeleteInvitation}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MasterDashboard;
