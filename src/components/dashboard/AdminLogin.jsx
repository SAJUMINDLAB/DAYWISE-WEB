import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const AdminLogin = ({ adminPassword, setAdminPassword, passwordError, handleAdminLogin }) => {
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
};

export default AdminLogin;
