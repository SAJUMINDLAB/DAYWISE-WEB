import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MobileMockup from '../components/preview/MobileMockup';
import EditorPanel from '../components/editor/EditorPanel';
import { useBuilderStore } from '../store/useBuilderStore';
import { getInvitation } from '../api/invitationApi';

const EditorPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id); // ID가 있을 때만 로딩 상태 시작

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);

  // URL에 ID가 있으면 해당 청첩장 데이터를 DB에서 불러와 스토어에 복원
  useEffect(() => {
    if (!id) {
      useBuilderStore.getState().resetStore();
      setLoading(false);
      return;
    }

    const loadInvitation = async () => {
      try {
        const data = await getInvitation(id);
        if (data) {
          // DB에서 가져온 데이터를 Zustand 스토어에 복원
          // 함수(actions)를 제외한 데이터만 덮어씌워야 하므로, 
          // 각 필드를 개별적으로 setState합니다.
          const store = useBuilderStore.getState();
          const keysToRestore = [
            'mainInfo', 'optionInfo', 'galleryInfo', 'greetingInfo',
            'storyInfo', 'locationInfo', 'accountInfo', 'rsvpInfo',
            'guestbookInfo', 'bgmInfo', 'shareInfo', 'sectionOrder',
            'selectedTemplate', 'selectedTheme', 'selectedFont',
            'selectedFontEn', 'selectedFontSubtitle', 'customUrl',
            'customColors'
          ];

          const stateUpdate = { currentInvitationId: id };
          keysToRestore.forEach(key => {
            if (data[key] !== undefined) {
              stateUpdate[key] = data[key];
            }
          });

          useBuilderStore.setState(stateUpdate);
        } else {
          console.warn('청첩장 데이터를 찾을 수 없습니다:', id);
        }
      } catch (err) {
        console.error('청첩장 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInvitation();
  }, [id]);

  // 데이터를 불러오는 중이면 로딩 화면 표시
  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', backgroundColor: '#f9f9f9',
        flexDirection: 'column', gap: '16px'
      }}>
        <div style={{
          width: '40px', height: '40px', border: '3px solid #ddd',
          borderTopColor: '#333', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: '#888', fontSize: '0.95rem', fontFamily: 'var(--font-kr-sans)' }}>
          저장된 청첩장을 불러오는 중...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <MobileMockup />
      <EditorPanel />
    </div>
  );
};

export default EditorPage;
