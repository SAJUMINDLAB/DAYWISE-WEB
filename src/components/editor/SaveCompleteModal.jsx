import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, X, CreditCard, Loader2 } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import { useKakaoShare } from '../../hooks/useKakaoShare';
import { getInvitation } from '../../api/supabaseApi';

const SaveCompleteModal = ({ invitationId, onClose }) => {
  const shareInfo = useBuilderStore(state => state.shareInfo);
  const mainInfo = useBuilderStore(state => state.mainInfo);
  
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const inv = await getInvitation(invitationId);
        const paymentStatus = inv?.data?.payment_status || 'unpaid';
        setIsPaid(paymentStatus === 'paid' || paymentStatus === 'free_pass');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkPaymentStatus();
  }, [invitationId]);

  const { share } = useKakaoShare();

  const previewUrl = `${window.location.origin}/preview/${invitationId}`;
  const liveUrl = `${window.location.origin}/v/${invitationId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      alert('청첩장 링크가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
    }
  };

  const handleKakaoShare = () => {
    const title = shareInfo.title || `${mainInfo.groomNameKo} ♥ ${mainInfo.brideNameKo} 결혼합니다`;
    const description = shareInfo.description || `두 사람이 하나 되는 날`;
    const imageUrl = shareInfo.thumbnailUrl || mainInfo.mainImage;
    share({ url: liveUrl, title, description, imageUrl });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        backgroundColor: '#fff', width: '90%', maxWidth: '400px',
        borderRadius: '16px', padding: '32px', textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
        >
          <X size={24} />
        </button>

        <div style={{ 
          width: '64px', height: '64px', backgroundColor: '#e8f5e9', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          color: '#4caf50'
        }}>
          <Check size={32} />
        </div>

        <h2 style={{ fontSize: '1.4rem', color: '#222', marginBottom: '8px' }}>청첩장 완성! 🎉</h2>
        
        {loading ? (
          <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
            <Loader2 size={24} color="#666" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isPaid ? (
          <>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
              결제가 완료된 청첩장입니다.<br/>
              아래 링크를 하객분들에게 전달해보세요.
            </p>

            <div style={{ 
              backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '24px', wordBreak: 'break-all', textAlign: 'left',
              border: '1px solid #ebebeb'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#333' }}>{liveUrl}</span>
              <button 
                onClick={handleCopy}
                style={{ 
                  background: 'none', border: 'none', color: '#222', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'
                }}
                title="링크 복사"
              >
                <Copy size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleKakaoShare}
                style={{ 
                  width: '100%', padding: '14px', backgroundColor: '#FEE500', color: '#191919', 
                  border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                카카오톡 공유하기
              </button>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => window.open(previewUrl, '_blank')}
                  style={{ 
                    flex: 1, padding: '14px', backgroundColor: '#fff', color: '#222', 
                    border: '1px solid #222', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <ExternalLink size={18} /> 미리보기
                </button>
                <button 
                  onClick={onClose}
                  style={{ 
                    flex: 1, padding: '14px', backgroundColor: '#222', color: '#fff', 
                    border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
              작성하신 내용이 안전하게 저장되었습니다.<br/>
              <b>결제를 완료해야 하객들에게 공유할 수 있습니다.</b>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => window.location.href = `/checkout/${invitationId}`}
                style={{ 
                  width: '100%', padding: '14px', backgroundColor: '#2e7d32', color: '#fff', 
                  border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                <CreditCard size={20} /> 결제하러 가기
              </button>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => window.open(previewUrl, '_blank')}
                  style={{ 
                    flex: 1, padding: '14px', backgroundColor: '#fff', color: '#222', 
                    border: '1px solid #222', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <ExternalLink size={18} /> 나만 미리보기
                </button>
                <button 
                  onClick={onClose}
                  style={{ 
                    flex: 1, padding: '14px', backgroundColor: '#f5f5f5', color: '#666', 
                    border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SaveCompleteModal;
