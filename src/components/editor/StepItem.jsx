import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical, ChevronDown, LayoutTemplate, Palette, Info, Settings, Heart, Image as ImageIcon, MapPin, Gift, BookOpen, CheckSquare, MessageCircle, Music, Share2, ListOrdered } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';
import Step1Style from './steps/Step1Style';
import Step1bColor from './steps/Step1bColor';
import Step2Main from './steps/Step2Main';
import Step3Option from './steps/Step3Option';
import Step4Greeting from './steps/Step4Greeting';
import Step5Gallery from './steps/Step5Gallery';
import Step6Location from './steps/Step6Location';
import Step7Account from './steps/Step7Account';
import Step8Story from './steps/Step8Story';
import Step9Rsvp from './steps/Step9Rsvp';
import Step10Guestbook from './steps/Step10Guestbook';
import Step11Bgm from './steps/Step11Bgm';
import Step12Share from './steps/Step12Share';
import Step13Order from './steps/Step13Order';

const StepItem = ({ step, index }) => {
  const toggleStep = useBuilderStore(state => state.toggleStep);

  const renderStepContent = () => {
    switch(step.id) {
      case 'step-1': return <Step1Style />;
      case 'step-1-b': return <Step1bColor />;
      case 'step-2': return <Step2Main />;
      case 'step-3': return <Step3Option />;
      case 'step-4': return <Step4Greeting />;
      case 'step-5': return <Step5Gallery />;
      case 'step-6': return <Step6Location />;
      case 'step-7': return <Step7Account />;
      case 'step-8': return <Step8Story />;
      case 'step-9': return <Step9Rsvp />;
      case 'step-10': return <Step10Guestbook />;
      case 'step-11': return <Step11Bgm />;
      case 'step-12': return <Step12Share />;
      case 'step-13': return <Step13Order />;
      default: 
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            상세 설정 항목이 들어갈 자리입니다.
          </div>
        );
    }
  };

  const getStepIcon = (stepId) => {
    const iconProps = { size: 22, className: 'step-icon' };
    switch(stepId) {
      case 'step-1': return <LayoutTemplate {...iconProps} color="#4F46E5" />;
      case 'step-1-b': return <Palette {...iconProps} color="#EC4899" />;
      case 'step-2': return <Info {...iconProps} color="#10B981" />;
      case 'step-3': return <Settings {...iconProps} color="#6B7280" />;
      case 'step-4': return <Heart {...iconProps} color="#F43F5E" />;
      case 'step-5': return <ImageIcon {...iconProps} color="#0EA5E9" />;
      case 'step-6': return <MapPin {...iconProps} color="#8B5CF6" />;
      case 'step-7': return <Gift {...iconProps} color="#F59E0B" />;
      case 'step-8': return <BookOpen {...iconProps} color="#14B8A6" />;
      case 'step-9': return <CheckSquare {...iconProps} color="#84CC16" />;
      case 'step-10': return <MessageCircle {...iconProps} color="#3B82F6" />;
      case 'step-11': return <Music {...iconProps} color="#D946EF" />;
      case 'step-12': return <Share2 {...iconProps} color="#F97316" />;
      case 'step-13': return <ListOrdered {...iconProps} color="#64748B" />;
      default: return <LayoutTemplate {...iconProps} />;
    }
  };

  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`step-card ${step.isOpen ? 'is-open' : ''} ${snapshot.isDragging ? 'is-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="step-header" onClick={() => toggleStep(step.id)}>
            <div 
              className="drag-handle" 
              {...provided.dragHandleProps}
              onClick={(e) => e.stopPropagation()} // Prevent toggle when just gripping
            >
              <GripVertical size={20} />
            </div>
            
            <div className="step-icon-wrapper">
              {getStepIcon(step.id)}
            </div>
            
            <div className="step-title-group">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>

            <div className="step-toggle-icon">
              <ChevronDown size={24} />
            </div>
          </div>
          
          {step.isOpen && (
            <div className="step-body" onClick={(e) => e.stopPropagation()}>
              {renderStepContent()}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default StepItem;
