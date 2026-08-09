const fs = require('fs');
let text = fs.readFileSync('src/components/preview/InvitationPreview.jsx', 'utf8');

text = text.replace(/alert\('[^']*?계좌번호가[^']*?\\n' \+ text\);/, "alert('계좌번호가 복사되었습니다.\\n' + text);");
text = text.replace(/\{\/\*.*?ϰ̽Ű.*?\*\/\}/, "{/* 어느 측 하객이신가요? */}");
text = text.replace(/<div style=\{labelStyle\}>.*?ϰ̽Ű.*?<span/, "<div style={labelStyle}>어느 측 하객이신가요? <span");
text = text.replace(/\{\/\*.*?Ͻ.*?ֳ.*?\*\/\}/, "{/* 참석하실 수 있나요? */}");
text = text.replace(/<div style=\{labelStyle\}>.*?Ͻ.*?ֳ.*?<span/, "<div style={labelStyle}>참석하실 수 있나요? <span");
text = text.replace(/alert\('[^']*?참석[^']*?미리보기[^']*?'\);/, "alert('참석 의사가 전달되었습니다.\\n(미리보기 환경에서는 실제로 전송되지 않습니다.)');");
text = text.replace(/\/\/ BGM.*?[\?].*?어/, "// BGM 상태 및 오디오 제어");
text = text.replace(/\{\/\*.*?[\?]리미엄 메인.*?지 \(Parallax\) \*\/\}/, "{/* 프리미엄 메인 이미지 (Parallax) */}");
text = text.replace(/<a.*?>.*?이[\?]지.*?\s*<\/a>/, "<a href={`https://map.naver.com/v5/search/${encodeURIComponent(locationInfo.venueName)}`} target=\"_blank\" rel=\"noreferrer\" style={{ flex: 1, padding: '12px 0', textAlign: 'center', backgroundColor: '#03C75A', border: 'none', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: 'calc(0.8rem * var(--font-ratio))', fontWeight: 'bold', fontFamily: 'var(--font-kr-sans)', letterSpacing: 'calc(0.02rem * var(--font-ratio))' }}>\n                  네이버 지도\n                </a>");
text = text.replace(/<button.*?>\s*축하 메시지.*?[\?]기.*?\s*<\/button>/, "<button onClick={() => setShowGuestbookModal(true)} style={{ padding: '14px 40px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: '30px', fontSize: 'calc(0.95rem * var(--font-ratio))', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-kr-sans)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '20px' }}>\n                축하 메시지 남기기\n              </button>");
text = text.replace(/\{\/\* 방명[\?]리스.*?\*\/\}/, "{/* 방명록 리스트 (최대 3개까지만 노출) */}");
text = text.replace(/<div.*?>\s*.*?[\?]번째 축하 메시지.*?[\?]겨주세.*?\s*<\/div>/, "<div style={{ padding: '40px 20px', textAlign: 'center', color: '#999', fontSize: 'calc(0.9rem * var(--font-ratio))', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>\n                  첫 번째 축하 메시지를 남겨주세요!\n                </div>");
text = text.replace(/\{\/\* 12\. 공유[\?]기 \(Share\) Area \*\/\}/, "{/* 12. 공유하기 (Share) Area */}");
text = text.replace(/alert\(`\[카카[\?]톡 공유.*?`\)/s, "alert(`[카카오톡 공유 썸네일 확인]\\n\\n제목: ${shareInfo.title}\\n설명: ${shareInfo.description}\\n\\n(실제 환경에서는 카카오톡 앱이 열립니다.)`)");
text = text.replace(/카카[\?]톡[\?]로 공유[\?]기/, "카카오톡으로 공유하기");
text = text.replace(/alert\('[^']*?링크가 복사[^']*?'\);/, "alert('초대장 링크가 복사되었습니다.\\n원하시는 곳에 붙여넣기(Ctrl+V) 하세요.');");
text = text.replace(/.*?[\?]링크 복사[\?]기/, "초대장 링크 복사하기");
text = text.replace(/<div style=\{\{ fontFamily: 'var\(--font-kr-sans\)', fontSize: 'calc\(1\.1rem \* var\(--font-ratio\)\)', fontWeight: 'bold', color: theme\.text \}\}>.*?방명.*?[\?]성<\/div>/, "<div style={{ fontFamily: 'var(--font-kr-sans)', fontSize: 'calc(1.1rem * var(--font-ratio))', fontWeight: 'bold', color: theme.text }}>방명록 작성</div>");
text = text.replace(/return alert\('[^']*?모두[^']*?'\);/, "return alert('모든 항목을 입력해주세요.');");
text = text.replace(/return alert\('[^']*?자 4[^']*?'\);/, "return alert('비밀번호는 숫자 4자리로 입력해주세요.');");
text = text.replace(/alert\('방명록이[^']*?'\);/, "alert('방명록이 등록되었습니다.');");
text = text.replace(/<button([^>]*)>\s*.*?[\?]록[\?]기\s*<\/button>/g, "<button$1>\n              등록하기\n            </button>");
text = text.replace(/\{\/\* Guestbook List Modal.*?\*\/\}/, "{/* Guestbook List Modal (전체보기 팝업) */}");

fs.writeFileSync('src/components/preview/InvitationPreview.jsx', text, 'utf8');
console.log('Final fix done.');
