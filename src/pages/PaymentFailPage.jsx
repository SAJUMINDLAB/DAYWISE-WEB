import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const message = searchParams.get('message') || '알 수 없는 이유로 결제가 실패했습니다.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'var(--font-kr-sans)' }}>
      <AlertCircle size={64} color="#E53E3E" style={{ marginBottom: '24px' }} />
      <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '16px' }}>결제 실패</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>{message}</p>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ padding: '14px 32px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          이전 페이지로
        </button>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '14px 32px', backgroundColor: '#fff', color: '#333', border: '1px solid #CCC', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
        >
          메인으로
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;
