import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoginModal = ({ theme, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 심플한 비밀번호 확인 (실제로는 서버 연동 필요)
    if (password === '1234') {
      onClose();
      // 현재 탭에서 '/admin' 경로로 이동
      navigate('/admin');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 99999,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: theme.bg || '#fff',
        padding: '30px',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '320px',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        color: theme.text || '#333'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: theme.text || '#333' }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontFamily: 'var(--font-kr-sans)', fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          관리자 접속
        </h3>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <input 
              type="password" 
              placeholder="비밀번호를 입력하세요 (기본: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '12px', borderRadius: '8px',
                border: '1px solid #ddd', fontSize: '1rem',
                outline: 'none', boxSizing: 'border-box'
              }}
              autoFocus
            />
            {error && (
              <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
                {error}
              </div>
            )}
          </div>
          <button 
            type="submit"
            style={{
              width: '100%', padding: '14px',
              backgroundColor: theme.accent || '#333',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
