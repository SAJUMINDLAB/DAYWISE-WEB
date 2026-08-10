import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download } from 'lucide-react';

const QrCodeModal = ({ isOpen, onClose, url, title }) => {
  const qrRef = useRef(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Set padding and size for download
    const size = 300;
    const padding = 20;
    canvas.width = size + (padding * 2);
    canvas.height = size + (padding * 2);
    
    img.onload = () => {
      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw QR code with padding
      ctx.drawImage(img, padding, padding, size, size);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${title || 'wedding'}_QRcode.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 99999, padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', padding: '32px', width: '100%',
        maxWidth: '400px', position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'none',
          border: 'none', cursor: 'pointer', color: '#888'
        }}>
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#222', marginBottom: '8px' }}>청첩장 QR 코드</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
          카메라 앱으로 스캔하면 청첩장으로 이동합니다.
        </p>

        <div 
          ref={qrRef}
          style={{ 
            padding: '16px', backgroundColor: '#fff', borderRadius: '12px', 
            border: '1px solid #eee', marginBottom: '24px' 
          }}
        >
          <QRCodeSVG 
            value={url} 
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#2C2C2C"
          />
        </div>

        <button 
          onClick={handleDownload}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
            backgroundColor: '#D4AF37', color: '#fff', border: 'none', borderRadius: '8px',
            fontSize: '1rem', fontWeight: '500', cursor: 'pointer', width: '100%', justifyContent: 'center'
          }}
        >
          <Download size={18} />
          이미지 저장하기
        </button>
      </div>
    </div>
  );
};

export default QrCodeModal;
