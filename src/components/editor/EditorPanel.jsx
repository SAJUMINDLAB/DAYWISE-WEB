import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import { useBuilderStore } from '../../store/useBuilderStore';
import StepItem from './StepItem';
import { Check, Zap } from 'lucide-react';
import QuickSetupModal from './QuickSetupModal';
import SaveCompleteModal from './SaveCompleteModal';
import PaymentSimulationModal from './PaymentSimulationModal';
import { saveInvitation, checkIdAvailable } from '../../api/supabaseApi';

const EditorPanel = () => {
  const steps = useBuilderStore(state => state.steps);
  const reorderSteps = useBuilderStore(state => state.reorderSteps);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  
  // Save States
  const [isSaving, setIsSaving] = useState(false);
  const [saveModalId, setSaveModalId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === 'droppable-steps') {
      reorderSteps(result.source.index, result.destination.index);
    } else if (result.source.droppableId === 'gallery-dnd') {
      useBuilderStore.getState().reorderGalleryImages(result.source.index, result.destination.index);
    }
  };

  const handleSaveAndComplete = async () => {
    setIsSaving(true);
    try {
      const fullState = useBuilderStore.getState();

      // 1. 회원가입/로그인 강제 (상용화 요건)
      const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';
      if (!fullState.user && !isMasterAdmin) {
        alert('청첩장을 저장하고 배포하려면 먼저 로그인(또는 회원가입)이 필요합니다.');
        setIsSaving(false);
        if(window.confirm('로그인 페이지로 이동하시겠습니까? (작업 중인 내용은 브라우저에 임시 유지됩니다)')) {
          window.location.href = '/dashboard';
        }
        return;
      }

      // 2. 필수 입력값 검증 (이름, 날짜, 장소)
      const { groomNameKo, brideNameKo, date, location } = fullState.mainInfo;
      if (!groomNameKo?.trim() || !brideNameKo?.trim()) {
        alert('신랑, 신부님의 이름을 입력해주세요.');
        setIsSaving(false);
        return;
      }
      if (!date?.trim()) {
        alert('예식일을 설정해주세요.');
        setIsSaving(false);
        return;
      }
      if (!location?.trim()) {
        alert('예식장(장소)을 입력해주세요.');
        setIsSaving(false);
        return;
      }

      // 3. 커스텀 URL 필수 및 중복 검사
      if (!fullState.customUrl || fullState.customUrl.trim() === '') {
        alert('청첩장 고유 주소(URL)를 설정해주세요.\nStep 3 (메인 정보) 하단에서 나만의 주소를 설정해야 배포할 수 있습니다.');
        setIsSaving(false);
        return;
      }

      if (!fullState.currentInvitationId || fullState.currentInvitationId !== fullState.customUrl) {
        if (fullState.customUrl.length < 4) {
          alert('청첩장 주소는 4글자 이상이어야 합니다.');
          setIsSaving(false);
          return;
        }
        
        // 예약어(Reserved Words) 차단
        const reservedWords = ['admin', 'api', 'dashboard', 'qna', 'privacy', 'terms', 'login', 'signup', 'auth', 'test', 'master', 'system'];
        if (reservedWords.includes(fullState.customUrl.toLowerCase())) {
          alert('입력하신 주소는 시스템 예약어로 사용할 수 없습니다. 다른 주소를 입력해주세요.');
          setIsSaving(false);
          return;
        }

        const isAvailable = await checkIdAvailable(fullState.customUrl);
        if (!isAvailable) {
          alert('입력하신 청첩장 주소는 이미 사용 중이거나 유효하지 않습니다. 다른 주소로 변경해 주세요.');
          setIsSaving(false);
          return;
        }

        // 기존 청첩장이 있는데 주소를 바꾸는 경우: 확인창 표시
        if (fullState.currentInvitationId) {
          const confirmed = window.confirm(
            `청첩장 주소가 변경됩니다.\n\n` +
            `기존: daywise.kr/${fullState.currentInvitationId}\n` +
            `변경: daywise.kr/${fullState.customUrl}\n\n` +
            `⚠️ 이미 공유한 기존 링크는 더 이상 작동하지 않습니다.\n` +
            `결제 정보, 방명록, 참석 의사는 자동으로 이전됩니다.\n\n` +
            `변경하시겠습니까?`
          );
          if (!confirmed) {
            setIsSaving(false);
            return;
          }
        }
      }

      const newId = await saveInvitation(fullState);
      
      // 스토어에 ID를 저장하여 다음 번 저장 시 덮어쓰기가 되도록 합니다.
      useBuilderStore.setState({ currentInvitationId: newId });
      
      // 제작 완료 시 띄울 모달에 ID를 전달합니다.
      setSaveModalId(newId);
    } catch (err) {
      alert(err.message || '저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const fullState = useBuilderStore.getState();

      const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';
      if (!fullState.user && !isMasterAdmin) {
        alert('중간 저장을 하려면 로그인(또는 회원가입)이 필요합니다.');
        setIsSaving(false);
        if(window.confirm('로그인 페이지로 이동하시겠습니까? (작업 중인 내용은 임시 보관됩니다)')) {
          window.location.href = '/dashboard';
        }
        return;
      }

      // 커스텀 URL 중복 검사 (새로 만들 때만)
      if (!fullState.currentInvitationId && fullState.customUrl) {
        if (fullState.customUrl.length < 4) {
          alert('청첩장 주소는 4글자 이상이어야 합니다.');
          setIsSaving(false);
          return;
        }
        
        const reservedWords = ['admin', 'api', 'dashboard', 'qna', 'privacy', 'terms', 'login', 'signup', 'auth', 'test', 'master', 'system'];
        if (reservedWords.includes(fullState.customUrl.toLowerCase())) {
          alert('입력하신 주소는 시스템 예약어로 사용할 수 없습니다. 다른 주소를 입력해주세요.');
          setIsSaving(false);
          return;
        }

        const isAvailable = await checkIdAvailable(fullState.customUrl);
        if (!isAvailable) {
          alert('입력하신 청첩장 주소는 이미 사용 중이거나 유효하지 않습니다. 다른 주소로 변경해 주세요.');
          setIsSaving(false);
          return;
        }
      }

      const newId = await saveInvitation(fullState);
      useBuilderStore.setState({ currentInvitationId: newId });
      
      alert('성공적으로 중간 저장되었습니다.\n마이페이지(나의 청첩장)에서 언제든 이어서 작성할 수 있습니다.');
    } catch (err) {
      alert(err.message || '저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="editor-section">
      <div className="editor-header" style={{ paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Wedding Invitation Editor</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>나만의 청첩장 꾸미기</p>
        </div>
        <Link 
          to="/dashboard" 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f1f3f5', 
            color: '#495057', 
            borderRadius: '8px', 
            fontSize: '0.9rem', 
            fontWeight: '600',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          나의 청첩장
        </Link>
      </div>

      <div style={{ padding: '16px 20px 24px 20px' }}>
        <button 
          onClick={() => setShowQuickSetup(true)}
          style={{ 
            width: '100%', padding: '18px 16px', 
            background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
            color: '#fff', 
            border: 'none', borderRadius: '16px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
            fontWeight: '600', fontSize: '1.05rem',
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.transform = 'translateY(-2px)'; 
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'; 
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.transform = 'translateY(0)'; 
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'; 
          }}
        >
          <Zap size={20} fill="#fff" /> 필수 정보 한 번에 입력하기
        </button>
      </div>
      
      <div className="editor-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-steps" type="steps">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {steps.map((step, index) => (
                  <StepItem key={step.id} step={step} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="editor-footer" style={{ 
        padding: '24px', 
        borderTop: '1px solid rgba(0,0,0,0.05)', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(10px)',
        position: 'sticky', bottom: 0, zIndex: 100 
      }}>
        <div style={{ display: 'flex', width: '100%', gap: '12px' }}>
          <button 
            onClick={handleSaveDraft} 
            disabled={isSaving} 
            style={{ 
              flex: 1, padding: '18px', 
              backgroundColor: '#f1f3f5',
              color: '#495057', 
              border: 'none', borderRadius: '16px', 
              fontSize: '1rem', fontWeight: '600',
              cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { if(!isSaving) e.currentTarget.style.backgroundColor = '#e9ecef'; }}
            onMouseLeave={(e) => { if(!isSaving) e.currentTarget.style.backgroundColor = '#f1f3f5'; }}
          >
            임시저장
          </button>
          <button 
            onClick={handleSaveAndComplete} 
            disabled={isSaving} 
            style={{ 
              flex: 1, padding: '18px', 
              background: 'linear-gradient(90deg, #000 0%, #222 100%)',
              color: '#fff', 
              border: 'none', borderRadius: '16px', 
              fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => { if(!isSaving) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.25)'; } }}
            onMouseLeave={(e) => { if(!isSaving) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; } }}
          >
            <Check size={20} strokeWidth={3} />
            {isSaving ? '생성 중...' : '완성하기'}
          </button>
        </div>
      </div>
      
      {showQuickSetup && <QuickSetupModal onClose={() => setShowQuickSetup(false)} />}
      {showPaymentModal && <PaymentSimulationModal onClose={() => setShowPaymentModal(false)} onPaymentComplete={handlePaymentComplete} />}
      {saveModalId && <SaveCompleteModal invitationId={saveModalId} onClose={() => setSaveModalId(null)} />}
    </div>
  );
};

export default EditorPanel;
