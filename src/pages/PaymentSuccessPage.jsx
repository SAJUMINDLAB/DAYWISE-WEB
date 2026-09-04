import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updatePaymentStatus } from '../api/invitationApi';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [invId, setInvId] = useState('');

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (!paymentKey || !orderId || !amount) {
          throw new Error('유효하지 않은 결제 정보입니다.');
        }

        // orderId 에는 청첩장 ID가 포함되어 있음 (id_timestamp 형식)
        const id = orderId.split('_')[0];
        setInvId(id);

        // Vercel Serverless Function 에 승인 요청
        const response = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || '결제 승인에 실패했습니다.');
        }

        // 승인 성공 시 Supabase 및 구글 시트에 업데이트
        await updatePaymentStatus(id, 'paid');
        
        setStatus('success');
      } catch (err) {
        console.error('Payment confirmation error:', err);
        setStatus('error');
        setErrorMsg(err.message);
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'var(--font-kr-sans)' }}>
      {status === 'loading' && (
        <>
          <Loader2 size={48} color="#3182F6" style={{ animation: 'spin 1s linear infinite', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px' }}>결제 승인 중입니다...</h2>
          <p style={{ color: '#666' }}>창을 닫지 마시고 잠시만 기다려주세요.</p>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle2 size={64} color="#137333" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '16px' }}>결제가 완료되었습니다!</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>이제 프리미엄 모바일 청첩장을 하객들에게 공유해 보세요.</p>
          <button 
            onClick={() => navigate(`/v/${invId}`)}
            style={{ padding: '14px 32px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            내 청첩장 보러가기
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <AlertCircle size={64} color="#E53E3E" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '16px' }}>결제 승인 실패</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>{errorMsg}</p>
          <button 
            onClick={() => navigate('/')}
            style={{ padding: '14px 32px', backgroundColor: '#fff', color: '#333', border: '1px solid #CCC', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
          >
            메인으로 돌아가기
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
