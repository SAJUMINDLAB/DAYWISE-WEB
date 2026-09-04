import React from 'react';
import { LayoutDashboard, Users, BookOpen, CreditCard } from 'lucide-react';

const MasterStats = ({ totalInvs, totalExpectedGuests, totalGuestbooks }) => {
  const cardStyle = {
    backgroundColor: '#fff',
    padding: '32px 24px',
    border: '1px solid #EAEAEA',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
          <LayoutDashboard size={18} /> 누적 발행 청첩장
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalInvs}</div>
        <div style={{ color: '#888', fontSize: '0.85rem' }}>전체 생성된 서비스 수</div>
      </div>
      
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
          <Users size={18} /> 누적 참석 예정객
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalExpectedGuests}</div>
        <div style={{ color: '#888', fontSize: '0.85rem' }}>전체 하객 총합</div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
          <BookOpen size={18} /> 누적 방명록
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>{totalGuestbooks}</div>
        <div style={{ color: '#888', fontSize: '0.85rem' }}>접수된 축하 메시지 수</div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.95rem', marginBottom: '16px' }}>
          <CreditCard size={18} /> 누적 매출액
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: '300', color: '#000', fontFamily: 'var(--font-en-sans)', marginBottom: '8px' }}>-</div>
        <div style={{ color: '#888', fontSize: '0.85rem' }}>결제 시스템 준비 중</div>
      </div>
    </div>
  );
};

export default MasterStats;
