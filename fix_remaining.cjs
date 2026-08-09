const fs = require('fs');
const path = 'src/components/preview/InvitationPreview.jsx';
let text = fs.readFileSync(path, 'utf8');

// Replace all remaining corrupted texts by targeting small known substrings
// 1. 계좌번호가 복사...
text = text.replace(/alert\('계좌번호가 복사.*?' \+ text\);/, "alert('계좌번호가 복사되었습니다.\\n' + text);");
// 2. 어느 측 하객이신가요?
text = text.replace(/\{\/\* .*?ϰ̽Ű\? \*\/\}/g, "{/* 어느 측 하객이신가요? */}");
text = text.replace(/<div style=\{labelStyle\}>.*?ϰ̽Ű\? <span/g, "<div style={labelStyle}>어느 측 하객이신가요? <span");
// 3. 참석하실 수 있나요?
text = text.replace(/\{\/\*.*?Ͻ.*?ֳ\? \*\/\}/g, "{/* 참석하실 수 있나요? */}");
text = text.replace(/<div style=\{labelStyle\}>.*?Ͻ.*?ֳ\? <span/g, "<div style={labelStyle}>참석하실 수 있나요? <span");
// 4. 참석 의사가 전달...
text = text.replace(/alert\('참석.*?사갢.*?달.*?었.*?\\n.*?미리보기.*?경.*?서.*?제.*?송.*?습.*?다\.\)'\);/, "alert('참석 의사가 전달되었습니다.\\n(미리보기 환경에서는 실제로 전송되지 않습니다.)');");
text = text.replace(/alert\('참석[^']*?미리보기[^']*?'\);/, "alert('참석 의사가 전달되었습니다.\\n(미리보기 환경에서는 실제로 전송되지 않습니다.)');");

fs.writeFileSync(path, text, 'utf8');
console.log('Fixed using robust Regex.');
