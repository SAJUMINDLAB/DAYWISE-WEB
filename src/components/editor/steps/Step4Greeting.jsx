import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';

const Step4Greeting = () => {
  const greetingInfo = useBuilderStore(state => state.greetingInfo);
  const setGreetingInfo = useBuilderStore(state => state.setGreetingInfo);

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1px solid #EBEBEB',
    borderRadius: '6px', fontSize: '0.95rem', marginBottom: '16px',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '150px',
    lineHeight: '1.6'
  };

  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#555', marginBottom: '6px' };

  return (
    <div style={{ padding: '10px 0' }}>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
        초대 인사말을 정성스럽게 작성해 주세요.<br/>
        엔터(Enter)를 치면 줄바꿈이 적용됩니다.
      </p>

      <div>
        <label style={labelStyle}>인사말 타이틀 (영문/국문)</label>
        <input 
          type="text" 
          style={inputStyle} 
          value={greetingInfo.title} 
          onChange={(e) => setGreetingInfo('title', e.target.value)} 
          placeholder="예: Invite You"
        />
      </div>

      <div>
        <label style={labelStyle}>인사말 내용</label>
        <textarea 
          style={textareaStyle} 
          value={greetingInfo.content} 
          onChange={(e) => setGreetingInfo('content', e.target.value)} 
          placeholder="초대 문구를 작성해 주세요."
        />
      </div>
    </div>
  );
};

export default Step4Greeting;
