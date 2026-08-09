import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useBuilderStore } from '../../store/useBuilderStore';
import StepItem from './StepItem';
import { Check, Zap } from 'lucide-react';
import QuickSetupModal from './QuickSetupModal';
import SaveCompleteModal from './SaveCompleteModal';
import { saveInvitation, checkIdAvailable } from '../../api/supabaseApi';

const EditorPanel = () => {
  const steps = useBuilderStore(state => state.steps);
  const reorderSteps = useBuilderStore(state => state.reorderSteps);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  
  // Save States
  const [isSaving, setIsSaving] = useState(false);
  const [saveModalUrl, setSaveModalUrl] = useState(null);

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
      
      // 커스텀 URL 중복 및 유효성 강제 검사 (새로 만들 때만)
      if (!fullState.currentInvitationId && fullState.customUrl) {
        if (fullState.customUrl.length < 4) {
          alert('청첩장 주소는 4글자 이상이어야 합니다.');
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
      
      // 스토어에 ID를 저장하여 다음 번 저장 시 덮어쓰기가 되도록 합니다.
      useBuilderStore.setState({ currentInvitationId: newId });
      
      const url = `${window.location.origin}/v/${newId}`;
      setSaveModalUrl(url);
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
        <button 
          onClick={handleSaveAndComplete} 
          disabled={isSaving} 
          style={{ 
            width: '100%', padding: '18px', 
            background: 'linear-gradient(90deg, #000 0%, #222 100%)',
            color: '#fff', 
            border: 'none', borderRadius: '20px', 
            fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.5px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => { if(!isSaving) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.25)'; } }}
          onMouseLeave={(e) => { if(!isSaving) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; } }}
        >
          <Check size={22} strokeWidth={3} />
          {isSaving ? '청첩장을 생성하는 중입니다...' : '청첩장 완성 및 배포하기'}
        </button>
      </div>
      
      {showQuickSetup && <QuickSetupModal onClose={() => setShowQuickSetup(false)} />}
      {saveModalUrl && <SaveCompleteModal shareUrl={saveModalUrl} onClose={() => setSaveModalUrl(null)} />}
    </div>
  );
};

export default EditorPanel;
