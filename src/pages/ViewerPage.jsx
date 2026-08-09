import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvitation } from '../api/supabaseApi';
import { useBuilderStore } from '../store/useBuilderStore';
import InvitationPreview from '../components/preview/InvitationPreview';
import ErrorBoundary from '../components/ErrorBoundary';
import InvitationManager from '../components/manager/InvitationManager';
import { Settings } from 'lucide-react';

const ViewerPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitationData, setInvitationData] = useState(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const currentUser = useBuilderStore(state => state.user);

  const fetchInvitationData = async () => {
    try {
      const data = await getInvitation(id);
      if (data) {
        useBuilderStore.setState({ ...data, currentInvitationId: id });
        setInvitationData(data);
        setLoading(false);
      } else {
        setError('해당 청첩장을 찾을 수 없습니다.');
        setLoading(false);
      }
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitationData();
  }, [id]);

  useEffect(() => {
    // ViewerPage 에서는 body 스크롤을 허용하여 IntersectionObserver 모바일 버그 방지
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999', fontSize: '14px' }}>
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', color: '#d32f2f', zIndex: 99999 }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#e5e5e5', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', backgroundColor: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.1)', minHeight: '100vh', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <InvitationPreview isPublicView={true} />
          </div>
        </ErrorBoundary>

        {/* Host Admin Floating Button */}
        {currentUser && invitationData && currentUser.id === invitationData.user_id && (
          <button 
            onClick={() => setIsManagerOpen(true)}
            style={{
              position: 'absolute', bottom: '30px', right: '30px', zIndex: 1000,
              backgroundColor: '#2C2C2C', color: '#fff', border: 'none',
              borderRadius: '30px', padding: '12px 20px', fontSize: '1rem',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)', cursor: 'pointer',
              fontFamily: 'var(--font-kr-sans)'
            }}
          >
            <Settings size={18} /> 호스트 관리
          </button>
        )}
        
        {/* Host Admin Modal */}
        {isManagerOpen && invitationData && (
          <InvitationManager 
            invitation={invitationData} 
            onClose={() => setIsManagerOpen(false)} 
            onUpdate={() => {
              // Refresh data directly when something is deleted
              fetchInvitationData();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewerPage;
