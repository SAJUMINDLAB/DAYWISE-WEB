import React, { useState } from 'react';
import { ChevronLeft, X, Pencil, Check } from 'lucide-react';
import { useBuilderStore } from '../../store/useBuilderStore';

const GuestbookListModal = ({ theme, guestbookInfo, onClose, removeGuestbookEntry }) => {
  const editGuestbookEntry = useBuilderStore(state => state.editGuestbookEntry);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', content: '' });

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({ name: entry.name, content: entry.content });
  };

  const saveEdit = (id) => {
    if (!editForm.name.trim() || !editForm.content.trim()) {
      alert('이름과 내용을 모두 입력해주세요.');
      return;
    }
    const pwd = prompt('수정하시려면 비밀번호를 입력하세요.');
    if (pwd) {
      editGuestbookEntry(id, { name: editForm.name, content: editForm.content });
      setEditingId(null);
      alert('수정되었습니다.');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: theme.bg, zIndex: 9999, display: 'flex', flexDirection: 'column', overflowY: 'auto', animation: 'fadeIn 0.2s ease-out' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', position: 'sticky', top: 0, backgroundColor: theme.bg, zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, display: 'flex', alignItems: 'center', padding: 0 }}>
          <ChevronLeft size={28} />
        </button>
        <div style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.1rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text }}>방명록 전체보기</div>
        <div style={{ width: 28 }} />
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {guestbookInfo.entries.map((entry) => (
          <div key={entry.id} style={{ backgroundColor: 'transparent', border: '1px solid rgba(127,127,127,0.2)', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', position: 'relative' }}>
            {editingId === entry.id ? (
              // Edit Mode
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="이름"
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem', backgroundColor: '#fff', color: '#333' }}
                />
                <textarea 
                  value={editForm.content} 
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  placeholder="축하 메시지"
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical', backgroundColor: '#fff', color: '#333' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                  <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', border: '1px solid #ccc', background: '#f5f5f5', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', color: '#333' }}>취소</button>
                  <button onClick={() => saveEdit(entry.id)} style={{ padding: '6px 12px', border: 'none', background: theme.accent, color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Check size={14} /> 저장</button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingRight: '40px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text }}>{entry.name}</div>
                  <div style={{ fontSize: 'calc(0.75rem * var(--font-ratio))', color: '#999' }}>{entry.date}</div>
                </div>
                <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, lineHeight: '1.6', whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                  {entry.content}
                </div>
                
                {/* Actions: Edit & Delete */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => startEdit(entry)}
                    style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: 0 }}
                    title="수정"
                  >
                    <Pencil size={15} />
                  </button>
                  <button 
                    onClick={() => {
                      const pwd = prompt('삭제하시려면 비밀번호를 입력하세요.');
                      if (pwd) {
                        removeGuestbookEntry(entry.id);
                        alert('삭제되었습니다.');
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: 0 }}
                    title="삭제"
                  >
                    <X size={17} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestbookListModal;
