import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuilderStore } from '../store/useBuilderStore';
import { getUserInvitations, getInvitation, deleteInvitation, signOut } from '../api/supabaseApi';
import InvitationManager from '../components/manager/InvitationManager';
import { Loader2, Trash2 } from 'lucide-react';
import AccountSettingsModal from '../components/dashboard/AccountSettingsModal';

const DashboardPage = () => {
  const user = useBuilderStore(state => state.user);
  const setUser = useBuilderStore(state => state.setUser);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [managingInvitation, setManagingInvitation] = useState(null);
  const [loadingManagerId, setLoadingManagerId] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();

  const fetchInvitations = useCallback(async () => {
    if (!user) return;
    const data = await getUserInvitations(user.id);
    setInvitations(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchInvitations();
  }, [user, navigate, fetchInvitations]);

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 청첩장을 삭제하시겠습니까? (방명록과 참석 여부 데이터도 모두 삭제되며 복구할 수 없습니다)')) return;
    try {
      await deleteInvitation(id);
      fetchInvitations();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null; // Or a loading spinner

  return (
    <div style={{ flex: 1, width: '100%', height: '100vh', overflowY: 'auto', backgroundColor: '#FDFBF7', fontFamily: 'var(--font-kr-sans)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
          background: 'linear-gradient(to right, #D4AF37, #8A6308)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: '1'
        }} onClick={() => navigate('/')}>
          <svg width="36" height="22" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '2px' }}>
            <circle cx="14" cy="12" r="10.5" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <circle cx="26" cy="12" r="10.5" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D4AF37" />
                <stop offset="1" stopColor="#8A6308" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1px' }}>DAYWISE</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.95rem', color: '#555' }}>{user.email ? `${user.email}님` : '카카오 회원님'}</span>
          <button onClick={() => setShowSettingsModal(true)} style={{ 
            background: 'none', border: 'none', color: '#555', 
            cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' 
          }}>
            계정 설정
          </button>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>로그아웃</button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#222', marginBottom: '8px' }}>나의 청첩장</h1>
          <Link to="/editor" style={{ 
            padding: '12px 24px', backgroundColor: '#2C2C2C', color: '#fff', 
            textDecoration: 'none', borderRadius: '30px', fontSize: '0.95rem', fontWeight: '500'
          }}>
            새 청첩장 만들기
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>데이터를 불러오는 중입니다...</div>
        ) : invitations.length === 0 ? (
          <div style={{ 
            textAlign: 'center', padding: '100px 0', backgroundColor: '#fff', 
            borderRadius: '16px', border: '1px dashed #ccc', color: '#888'
          }}>
            <p style={{ marginBottom: '20px' }}>아직 만들어진 청첩장이 없습니다.</p>
            <Link to="/editor" style={{ color: '#2C2C2C', fontWeight: 'bold', textDecoration: 'underline' }}>첫 번째 청첩장 만들러 가기</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {invitations.map((inv) => {
              const mainInfo = inv.data.mainInfo || {};
              const title = mainInfo.groomNameKo && mainInfo.brideNameKo 
                ? `${mainInfo.groomNameKo} & ${mainInfo.brideNameKo}의 결혼식` 
                : '제목 없는 청첩장';
              const date = new Date(inv.created_at).toLocaleDateString();
              
              // 결제 상태 및 남은 일수 계산
              const isPaid = inv.payment_status === 'paid';
              let daysLeft = 0;
              if (!isPaid && inv.expires_at) {
                daysLeft = Math.ceil((new Date(inv.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
              }

              return (
                <div key={inv.id} style={{ 
                  backgroundColor: '#fff', borderRadius: '16px', padding: '24px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ color: '#aaa', fontSize: '0.85rem' }}>ID: {inv.id}</div>
                      {isPaid ? (
                        <span style={{ padding: '4px 8px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>결제 완료</span>
                      ) : (
                        <span style={{ padding: '4px 8px', backgroundColor: '#fff3e0', color: '#e65100', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          결제 대기 (D-{daysLeft > 0 ? daysLeft : 0} 삭제)
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', color: '#2C2C2C' }}>{title}</h3>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>생성일: {date}</div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                    <Link to={`/editor/${inv.id}`} style={{ 
                      flex: 1, textAlign: 'center', padding: '10px 0', backgroundColor: '#f5f5f5', 
                      color: '#2C2C2C', textDecoration: 'none', borderRadius: '8px', fontSize: '0.85rem'
                    }}>수정/결제</Link>
                    <button 
                      disabled={loadingManagerId === inv.id}
                      onClick={async () => {
                        setLoadingManagerId(inv.id);
                        try {
                          const fullInv = await getInvitation(inv.id);
                          if (fullInv) {
                            setManagingInvitation(fullInv);
                          }
                        } finally {
                          setLoadingManagerId(null);
                        }
                      }} style={{ 
                        flex: 1, textAlign: 'center', padding: '10px 0', backgroundColor: '#f5f5f5', 
                        color: loadingManagerId === inv.id ? '#888' : '#2C2C2C', 
                        border: 'none', cursor: loadingManagerId === inv.id ? 'wait' : 'pointer', 
                        borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      {loadingManagerId === inv.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Loader2 size={14} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                          불러오는 중...
                        </div>
                      ) : (
                        '통계/관리'
                      )}
                    </button>
                    <a href={`/view/${inv.id}`} target="_blank" rel="noreferrer" style={{ 
                      flex: 1, textAlign: 'center', padding: '10px 0', backgroundColor: '#FDFBF7', 
                      color: '#D4AF37', border: '1px solid #D4AF37', textDecoration: 'none', borderRadius: '8px', fontSize: '0.85rem'
                    }}>미리보기</a>
                    <button onClick={() => handleDelete(inv.id)} style={{
                      padding: '0 12px', backgroundColor: '#fff', color: '#ff4d4f', border: '1px solid #ffe5e5',
                      cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }} title="삭제">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {managingInvitation && (
        <InvitationManager 
          invitation={managingInvitation} 
          onClose={() => setManagingInvitation(null)} 
          onUpdate={async () => {
            fetchInvitations();
            const fullInv = await getInvitation(managingInvitation.id);
            if (fullInv) {
              setManagingInvitation(fullInv);
            }
          }} 
        />
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {showSettingsModal && (
        <AccountSettingsModal 
          user={user} 
          onClose={() => setShowSettingsModal(false)} 
          onLogout={() => setUser(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
