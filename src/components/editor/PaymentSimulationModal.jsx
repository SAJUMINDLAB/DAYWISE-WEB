import React, { useState } from 'react';
import { CreditCard, X, Loader2, CheckCircle2 } from 'lucide-react';

const PaymentSimulationModal = ({ onClose, onPaymentComplete }) => {
  const [status, setStatus] = useState('idle'); // idle, processing, success

  const handleSimulatePayment = () => {
    setStatus('processing');
    // Simulate PG processing time
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onPaymentComplete();
      }, 1500);
    }, 2000);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
        {status === 'idle' && (
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
            <X size={24} />
          </button>
        )}
        
        {status === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
              <CreditCard size={32} color="#333" />
            </div>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '1.4rem', color: '#111', fontFamily: 'var(--font-kr-sans)' }}>결제 시스템 연동 대기중</h2>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', wordBreak: 'keep-all' }}>
              현재는 베타 테스트 기간입니다.<br/>
              하단의 버튼을 누르시면 실제 결제 없이<br/><b>결제 완료(배포) 상태로 전환</b>됩니다.
            </p>
            <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555' }}>상품명</span>
                <span style={{ fontWeight: 'bold' }}>프리미엄 모바일 청첩장</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#555' }}>결제금액</span>
                <span style={{ fontWeight: 'bold', color: '#e53935' }}>0원 <s style={{ color: '#aaa', fontSize: '0.85rem' }}>9,900원</s></span>
              </div>
            </div>
            <button
              onClick={handleSimulatePayment}
              style={{ width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              무료로 결제 시뮬레이션 진행하기
            </button>
          </div>
        )}

        {status === 'processing' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Loader2 size={48} color="#333" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
            <h3 style={{ margin: '0 0 12px 0', color: '#111' }}>결제를 진행하고 있습니다...</h3>
            <p style={{ color: '#666' }}>잠시만 기다려주세요.</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle2 size={56} color="#2e7d32" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ margin: '0 0 12px 0', color: '#111' }}>결제가 완료되었습니다!</h3>
            <p style={{ color: '#666' }}>잠시 후 발행 완료 화면으로 이동합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSimulationModal;
