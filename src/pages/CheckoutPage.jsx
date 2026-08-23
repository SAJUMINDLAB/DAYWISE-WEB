import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvitation, updatePaymentStatus } from '../api/supabaseApi';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'; // 토스페이먼츠 테스트 클라이언트 키
const customerKey = 'daywise_customer_' + Math.random().toString(36).substring(2, 10); // 익명 고객키

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState(null);
  
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);

  useEffect(() => {
    const fetchInv = async () => {
      try {
        const data = await getInvitation(id);
        if (!data) throw new Error('청첩장을 찾을 수 없습니다.');
        setInvitation(data);
        
        if (data.payment_status === 'paid' || data.payment_status === 'free_pass') {
          alert('이미 결제가 완료된 청첩장입니다.');
          navigate(`/v/${id}`);
          return;
        }

        // Initialize TossPayments
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
        paymentWidgetRef.current = paymentWidget;

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          '#payment-widget',
          { value: 19900 },
          { variantKey: 'DEFAULT' }
        );
        
        paymentWidget.renderAgreement(
          '#agreement',
          { variantKey: 'AGREEMENT' }
        );

        paymentMethodsWidgetRef.current = paymentMethodsWidget;
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInv();
  }, [id, navigate]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;
    if (!paymentWidget) return;

    try {
      await paymentWidget.requestPayment({
        orderId: id + '_' + Date.now(), // 고유 주문번호 (청첩장 ID 포함)
        orderName: '프리미엄 모바일 청첩장',
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
        customerName: invitation.mainInfo?.groomNameKo + ' & ' + invitation.mainInfo?.brideNameKo
      });
    } catch (err) {
      console.error('결제 요청 중단/에러:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#FAFAFA' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #EAEAEA', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '16px', color: '#666' }}>결제 시스템을 준비 중입니다...</p>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#FAFAFA' }}>
        <AlertCircle size={48} color="#E53E3E" style={{ marginBottom: '16px' }} />
        <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>{error}</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}>돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7F9', fontFamily: 'var(--font-kr-sans)' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #EAEAEA', padding: '16px 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#333' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: '0 auto', fontSize: '1.2rem', fontWeight: 'bold', paddingRight: '24px' }}>청첩장 발행 및 결제</h1>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Order Summary */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 'bold' }}>주문 정보</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #EAEAEA' }}>
            <div style={{ width: '60px', height: '80px', backgroundColor: '#F0F0F0', borderRadius: '8px', overflow: 'hidden' }}>
              {invitation.mainInfo?.mainImage && (
                <img src={invitation.mainInfo.mainImage} alt="Main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>프리미엄 모바일 청첩장</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{invitation.mainInfo?.groomNameKo} & {invitation.mainInfo?.brideNameKo}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px' }}>결제일로부터 365일 호스팅 제공</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>총 결제 금액</span>
            <span style={{ color: '#3182F6' }}>19,900원</span>
          </div>
        </section>

        {/* Toss Payments Widgets */}
        <section style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div id="payment-widget" style={{ width: '100%' }}></div>
          <div id="agreement" style={{ width: '100%' }}></div>

          <button 
            onClick={handlePayment}
            style={{ 
              width: '100%', padding: '16px', backgroundColor: '#3182F6', color: '#fff', 
              border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold',
              cursor: 'pointer', marginTop: '16px', transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B64DA'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3182F6'}
          >
            19,900원 결제하기
          </button>
        </section>
      </main>
    </div>
  );
};

export default CheckoutPage;
