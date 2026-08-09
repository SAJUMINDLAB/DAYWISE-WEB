import React from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';

const SaveCompleteModal = ({ shareUrl, onClose }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('청첩장 링크가 복사되었습니다!');
    } catch (err) {
      alert('복사에 실패했습니다. 직접 선택해서 복사해주세요.');
    }
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
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
          작성하신 내용이 안전하게 저장되었습니다.<br/>
          아래 링크를 하객들에게 전달해보세요.
        </p>

        <div style={{ 
          backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '24px', wordBreak: 'break-all', textAlign: 'left',
          border: '1px solid #ebebeb'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#333' }}>{shareUrl}</span>
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
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '신랑 ❤️ 신부 결혼합니다',
                  text: '저희 두 사람의 아름다운 출발을 축하해 주세요.',
                  url: shareUrl,
                }).catch(console.error);
              } else {
                alert('카카오톡 공유 기능은 실제 모바일 기기 또는 지원되는 브라우저에서 작동합니다.\n(현재는 링크 복사를 이용해주세요!)');
              }
            }}
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
              onClick={() => window.open(shareUrl, '_blank')}
              style={{ 
                flex: 1, padding: '14px', backgroundColor: '#fff', color: '#222', 
                border: '1px solid #222', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 'bold',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <ExternalLink size={18} /> 새 창 열기
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
      </div>
    </div>
  );
};

export default SaveCompleteModal;
