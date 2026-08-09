import React from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Mail, MessageCircleQuestion, Plus, Trash2 } from 'lucide-react';

const Step8Story = () => {
  const storyInfo = useBuilderStore(state => state.storyInfo);
  const setStoryMode = useBuilderStore(state => state.setStoryMode);
  const updateStoryLetter = useBuilderStore(state => state.updateStoryLetter);
  const updateStoryQna = useBuilderStore(state => state.updateStoryQna);
  const addStoryQna = useBuilderStore(state => state.addStoryQna);
  const removeStoryQna = useBuilderStore(state => state.removeStoryQna);
  const updateStoryInfo = useBuilderStore(state => state.updateStoryInfo);

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: storyInfo.useStory ? '#22222208' : '#fff', border: `1px solid ${storyInfo.useStory ? '#222' : '#ddd'}`, borderRadius: '8px' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: storyInfo.useStory ? '#222' : '#555', marginBottom: '4px' }}>우리만의 이야기 사용하기</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>인사말과 갤러리 사이에 스토리 영역을 표시합니다.</div>
        </div>
        <button 
          onClick={() => updateStoryInfo('useStory', !storyInfo.useStory)}
          style={{ width: '50px', height: '28px', backgroundColor: storyInfo.useStory ? '#222' : '#ccc', borderRadius: '14px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          <div style={{ position: 'absolute', top: '2px', left: storyInfo.useStory ? '24px' : '2px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        두 사람의 스토리를 담아보세요.<br/>
        감성적인 편지글이나, 재미있는 Q&A 인터뷰 중 원하는 방식을 선택할 수 있습니다.
      </div>

      {storyInfo.useStory && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>제목</div>
            <input 
              value={storyInfo.title}
              onChange={(e) => updateStoryInfo('title', e.target.value)}
              placeholder="예: 우리만의 이야기, 러브 스토리 등"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button 
          onClick={() => setStoryMode('letter')}
          style={{ 
            flex: 1, padding: '16px 0', border: storyInfo.mode === 'letter' ? '2px solid #8C9B90' : '1px solid #ddd', 
            backgroundColor: storyInfo.mode === 'letter' ? '#8C9B9015' : '#fff', borderRadius: '8px', cursor: 'pointer', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: storyInfo.mode === 'letter' ? '#8C9B90' : '#888'
          }}
        >
          <Mail size={24} />
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>편지글</span>
        </button>
        <button 
          onClick={() => setStoryMode('qna')}
          style={{ 
            flex: 1, padding: '16px 0', border: storyInfo.mode === 'qna' ? '2px solid #8C9B90' : '1px solid #ddd', 
            backgroundColor: storyInfo.mode === 'qna' ? '#8C9B9015' : '#fff', borderRadius: '8px', cursor: 'pointer', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: storyInfo.mode === 'qna' ? '#8C9B90' : '#888'
          }}
        >
          <MessageCircleQuestion size={24} />
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Q&A 인터뷰</span>
        </button>
      </div>

      {storyInfo.mode === 'letter' && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>편지글 작성</div>
          <textarea 
            value={storyInfo.letterContent}
            onChange={(e) => updateStoryLetter(e.target.value)}
            placeholder="두 사람의 다짐이나 감사 인사를 적어주세요."
            style={{ width: '100%', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '200px', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-kr-serif)', lineHeight: '1.8' }}
          />
        </div>
      )}

      {storyInfo.mode === 'qna' && (
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '16px' }}>Q&A 리스트</div>
          {storyInfo.qnaList.map((qna, index) => (
            <div key={qna.id} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff', position: 'relative' }}>
              <button onClick={() => removeStoryQna(qna.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
              
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: 'bold' }}>Q{index + 1}</div>
              
              <input 
                placeholder="질문을 입력하세요 (예: 첫 만남은?)" 
                value={qna.question} 
                onChange={(e) => updateStoryQna(qna.id, 'question', e.target.value)}
                style={{ width: '85%', padding: '8px 0', border: 'none', borderBottom: '2px solid #eee', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 'bold', outline: 'none', fontFamily: 'inherit' }}
              />
              
              <textarea 
                placeholder="답변을 입력하세요." 
                value={qna.answer} 
                onChange={(e) => updateStoryQna(qna.id, 'answer', e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '6px', minHeight: '60px', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
              />
            </div>
          ))}
          
          <button 
            onClick={addStoryQna}
            style={{ width: '100%', padding: '14px', backgroundColor: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#666', fontWeight: 'bold', fontSize: '0.85rem' }}
          >
            <Plus size={18} /> 질문 추가하기
          </button>
        </div>
      )}
        </div>
      )}

    </div>
  );
};

export default Step8Story;
