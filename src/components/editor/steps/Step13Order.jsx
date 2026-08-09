import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const Step13Order = () => {
  const sectionOrder = useBuilderStore(state => state.sectionOrder);
  const setSectionOrder = useBuilderStore(state => state.setSectionOrder);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const newOrder = Array.from(sectionOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    
    setSectionOrder(newOrder);
  };

  return (
    <div className="step-content">
      <div className="field-group">
        <label>화면 구역 배치 순서</label>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '16px' }}>
          오른쪽 핸들(≡)을 잡고 끌어서 청첩장에 보여질 구역의 순서를 변경하세요.<br/>
          (메인 사진과 공유하기 버튼은 항상 처음과 끝에 고정됩니다)
        </p>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="section-reorder">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {sectionOrder.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          backgroundColor: snapshot.isDragging ? '#f8f8f8' : '#fff',
                          border: `1px solid ${snapshot.isDragging ? '#ccc' : '#e0e0e0'}`,
                          borderRadius: '8px',
                          boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                          ...provided.draggableProps.style
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ color: '#aaa', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>
                            {index + 1}
                          </span>
                          <span style={{ fontWeight: '500', color: '#333' }}>
                            {section.label}
                          </span>
                        </div>
                        
                        <div 
                          {...provided.dragHandleProps} 
                          style={{ cursor: 'grab', color: '#999', padding: '4px', display: 'flex', alignItems: 'center' }}
                        >
                          <GripVertical size={18} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Step13Order;
