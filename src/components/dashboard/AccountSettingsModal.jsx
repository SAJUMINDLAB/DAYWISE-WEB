import React, { useState } from 'react';
import { X, Lock, Trash2, AlertCircle } from 'lucide-react';
import { updatePassword, deleteUserAccount } from '../../api/authApi';

const AccountSettingsModal = ({ user, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('password');
  
  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Withdrawal state
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  // Check if user is Kakao
  const isKakaoUser = user?.app_metadata?.provider === 'kakao' || !user?.email;

  // Initialize active tab based on user type
  React.useEffect(() => {
    if (isKakaoUser) {
      setActiveTab('withdrawal');
    }
  }, [isKakaoUser]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setPasswordLoading(true);
    try {
      await updatePassword(newPassword);
      setPasswordSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || '비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!window.confirm('정말 회원 탈퇴를 진행하시겠습니까?\\n모든 청첩장 데이터가 즉시 영구 삭제됩니다.')) return;
    
    setWithdrawLoading(true);
    setWithdrawError('');
    try {
      await deleteUserAccount(user.id);
      alert('회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
      if (onLogout) onLogout();
      onClose();
    } catch (err) {
      setWithdrawError(err.message || '회원 탈퇴 중 오류가 발생했습니다.');
      setWithdrawLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-kr-sans)'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', width: '90%', maxWidth: '480px',
        overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#222' }}>계정 설정</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
          {!isKakaoUser && (
            <button 
              onClick={() => setActiveTab('password')}
              style={{
                flex: 1, padding: '16px', background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: activeTab === 'password' ? 'bold' : 'normal',
                color: activeTab === 'password' ? '#2C2C2C' : '#888',
                borderBottom: activeTab === 'password' ? '2px solid #2C2C2C' : '2px solid transparent',
                fontSize: '1rem'
              }}
            >
              비밀번호 변경
            </button>
          )}
          <button 
            onClick={() => setActiveTab('withdrawal')}
            style={{
              flex: 1, padding: '16px', background: 'none', border: 'none', cursor: 'pointer',
              fontWeight: activeTab === 'withdrawal' ? 'bold' : 'normal',
              color: activeTab === 'withdrawal' ? '#e53935' : '#888',
              borderBottom: activeTab === 'withdrawal' ? '2px solid #e53935' : '2px solid transparent',
              fontSize: '1rem'
            }}
          >
            회원 탈퇴
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'password' && !isKakaoUser && (
            <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', marginBottom: '8px' }}>
                <Lock size={18} />
                <span style={{ fontSize: '0.95rem' }}>새로운 비밀번호를 입력해 주세요.</span>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#555' }}>새 비밀번호</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="6자리 이상 입력"
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '8px', 
                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#555' }}>새 비밀번호 확인</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호 다시 입력"
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '8px', 
                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                  }}
                  required
                />
              </div>

              {passwordError && (
                <div style={{ color: '#e53935', fontSize: '0.9rem', marginTop: '4px' }}>{passwordError}</div>
              )}
              {passwordSuccess && (
                <div style={{ color: '#2e7d32', fontSize: '0.9rem', marginTop: '4px' }}>비밀번호가 성공적으로 변경되었습니다.</div>
              )}

              <button 
                type="submit" 
                disabled={passwordLoading}
                style={{
                  marginTop: '8px', width: '100%', padding: '14px', borderRadius: '8px',
                  backgroundColor: '#2C2C2C', color: '#fff', border: 'none',
                  fontSize: '1rem', fontWeight: 'bold', cursor: passwordLoading ? 'not-allowed' : 'pointer',
                  opacity: passwordLoading ? 0.7 : 1
                }}
              >
                {passwordLoading ? '변경 중...' : '비밀번호 변경'}
              </button>
            </form>
          )}

          {activeTab === 'withdrawal' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '12px', border: '1px solid #ffcdd2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c62828', marginBottom: '12px', fontWeight: 'bold' }}>
                  <AlertCircle size={20} />
                  <span>탈퇴 전 꼭 확인해 주세요!</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#b71c1c', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>탈퇴 시 만들어둔 모든 <strong>청첩장과 방명록 데이터가 즉시 영구 삭제</strong>됩니다.</li>
                  <li>삭제된 데이터는 어떠한 경우에도 복구할 수 없습니다.</li>
                  <li>결제된 서비스의 환불은 약관에 따라 불가할 수 있습니다.</li>
                </ul>
              </div>

              {withdrawError && (
                <div style={{ color: '#e53935', fontSize: '0.9rem' }}>{withdrawError}</div>
              )}

              <button 
                onClick={handleWithdrawal}
                disabled={withdrawLoading}
                style={{
                  width: '100%', padding: '14px', borderRadius: '8px',
                  backgroundColor: '#fff', color: '#e53935', border: '1px solid #e53935',
                  fontSize: '1rem', fontWeight: 'bold', cursor: withdrawLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                  opacity: withdrawLoading ? 0.7 : 1, transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => { if (!withdrawLoading) e.currentTarget.style.backgroundColor = '#ffebee'; }}
                onMouseOut={(e) => { if (!withdrawLoading) e.currentTarget.style.backgroundColor = '#fff'; }}
              >
                <Trash2 size={18} />
                {withdrawLoading ? '탈퇴 처리 중...' : '회원 탈퇴 동의 및 진행'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsModal;
