const fs = require('fs');

const pristineSnippet = `
      {/* 10. 방명록 (Guestbook) Area */}
      {guestbookInfo.useGuestbook && (
        <FadeUp active={optionInfo.motionEffect}>
          <div style={{ padding: '60px 20px', backgroundColor: 'transparent' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', textAlign: 'center', marginBottom: '30px', color: theme.accent, letterSpacing: 'calc(0.1rem * var(--font-ratio))'
            }}>
              GUESTBOOK
            </h3>
            
            {guestbookInfo.description && (
              <div style={{ textAlign: 'center', fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '40px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {guestbookInfo.description}
              </div>
            )}

            {/* 방명록 작성하기 버튼 */}
            <div style={{ marginBottom: '40px' }}>
              <button 
                className={optionInfo.shineEffect ? 'btn-shine' : ''}
                onClick={() => setShowGuestbookModal(true)}
                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: theme.text, border: \`1px solid \${theme.accent}\`, borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1rem * var(--font-ratio))', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
              >
                축하 메시지 남기기
              </button>
            </div>

            {/* 방명록 리스트 (최대 3개까지만 노출) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {guestbookInfo.entries.slice(0, 3).map((entry) => (
                <div key={entry.id} style={{ backgroundColor: 'transparent', border: '1px solid rgba(127,127,127,0.2)', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: 'calc(0.95rem * var(--font-ratio))', color: theme.text }}>{entry.name}</div>
                    <div style={{ fontSize: 'calc(0.75rem * var(--font-ratio))', color: '#999' }}>{entry.date}</div>
                  </div>
                  <div style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, lineHeight: '1.6', whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                    {entry.content}
                  </div>
                  <button 
                    onClick={() => {
                      const pwd = prompt('삭제하시려면 비밀번호를 입력하세요.');
                      if (pwd) {
                        removeGuestbookEntry(entry.id);
                        alert('삭제되었습니다.');
                      }
                    }}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 'calc(1rem * var(--font-ratio))' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {guestbookInfo.entries.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999', fontSize: 'calc(0.9rem * var(--font-ratio))' }}>
                  첫 번째 축하 메시지를 남겨주세요!
                </div>
              )}
            </div>

            {/* 방명록 전체보기 버튼 (3개 초과일 때만 노출) */}
            {guestbookInfo.entries.length > 3 && (
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button 
                  onClick={() => setShowGuestbookListModal(true)}
                  style={{ background: 'none', border: 'none', borderBottom: \`1px solid \${theme.text}\`, color: theme.text, fontSize: 'calc(0.9rem * var(--font-ratio))', padding: '4px 8px', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)' }}
                >
                  방명록 전체보기 ({guestbookInfo.entries.length})
                </button>
              </div>
            )}
          </div>
        </FadeUp>
      )}

      {/* 9. RSVP Area */}
      {rsvpInfo.useRsvp && (
        <FadeUp active={optionInfo.motionEffect}>
          <div style={{ padding: '60px 20px', backgroundColor: 'transparent', textAlign: 'center' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-en-serif)', fontSize: 'calc(1.4rem * var(--font-ratio))', marginBottom: '20px', color: theme.accent, letterSpacing: 'calc(0.1rem * var(--font-ratio))'
            }}>
              RSVP
            </h3>
            <p style={{ fontSize: 'calc(0.9rem * var(--font-ratio))', color: theme.text, marginBottom: '30px', lineHeight: '1.6' }}>
              참석 여부를 전달해 주시면<br/>행사 준비에 큰 도움이 됩니다.
            </p>
            <button 
              className={optionInfo.shineEffect ? 'btn-shine' : ''}
              onClick={() => setShowRsvpModal(true)}
              style={{ padding: '16px 40px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '30px', fontSize: 'calc(1rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              RSVP 작성하기
            </button>
          </div>
        </FadeUp>
      )}
`;

let lines = fs.readFileSync('src/components/preview/InvitationPreview.jsx', 'utf8').split('\n');

// Find the Lightbox Modal end
const lbEndIndex = lines.findIndex((l, i) => i > 700 && l.trim() === '}');
let startDelete = -1;
for (let i = 700; i < lines.length; i++) {
  if (lines[i].includes('{/* Lightbox Modal */}')) {
    // The Lightbox Modal div ends a few lines later
    startDelete = i + 16; 
    break;
  }
}

let endDelete = -1;
for (let i = startDelete; i < lines.length; i++) {
  if (lines[i].includes('{/* 12. 공유하기 (Share) Area */}')) {
    endDelete = i;
    break;
  }
}

if (startDelete !== -1 && endDelete !== -1) {
  lines.splice(startDelete, endDelete - startDelete, pristineSnippet.trim());
  fs.writeFileSync('src/components/preview/InvitationPreview.jsx', lines.join('\n'), 'utf8');
  console.log('Restored heavily mangled file structure.');
} else {
  console.log('Could not find indices!', startDelete, endDelete);
}
