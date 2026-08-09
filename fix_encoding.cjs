const fs = require('fs');

const path = 'src/components/preview/InvitationPreview.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  ['계좌번호가 복사?었?니??', '계좌번호가 복사되었습니다.'],
  ['  ϰ̽Ű?', '어느 측 하객이신가요?'],
  ['Ͻ  ֳ?', '참석하실 수 있나요?'],
  ['참석 ?사갢 ?달?었?\\n(미리보기 ?경?서???제??송?? ?습?다.)', '참석 의사가 전달되었습니다.\\n(미리보기 환경에서는 실제로 전송되지 않습니다.)'],
  ['// BGM ?태 ??디???어', '// BGM 상태 및 오디오 제어'],
  ['{/* ?리미엄 메인 ??지 (Parallax) */}', '{/* 프리미엄 메인 이미지 (Parallax) */}'],
  ['?이?지??', '네이버 지도'],
  ['축하 메시지 ?기?', '축하 메시지 남기기'],
  ['{/* 방명?리스??(최? 3개까지??출) */}', '{/* 방명록 리스트 (최대 3개까지만 노출) */}'],
  ['?번째 축하 메시지??겨주세??', '첫 번째 축하 메시지를 남겨주세요!'],
  ['{/* 12. 공유?기 (Share) Area */}', '{/* 12. 공유하기 (Share) Area */}'],
  ['[카카?톡 공유 ???이??\\n\\n?목: ${shareInfo.title}\\n?명: ${shareInfo.description}\\n\\n(?제 ?경?서??카카?톡 ?이 ?립?다.)]', '[카카오톡 공유 썸네일 확인]\\n\\n제목: ${shareInfo.title}\\n설명: ${shareInfo.description}\\n\\n(실제 환경에서는 카카오톡 앱이 열립니다.)'],
  ['카카?톡?로 공유?기', '카카오톡으로 공유하기'],
  ['???링크가 복사?었?니??\\n?하??에 붙여?기(Ctrl+V) ?세??', '초대장 링크가 복사되었습니다.\\n원하시는 곳에 붙여넣기(Ctrl+V) 하세요.'],
  ['???링크 복사?기', '초대장 링크 복사하기'],
  ['방명??성', '방명록 작성'],
  ['????모두 ?력?주?요.', '모든 항목을 입력해주세요.'],
  ['비?번  ?자 4?리??력?주?요.', '비밀번호는 숫자 4자리로 입력해주세요.'],
  ['방명록이 ?록?었?니??', '방명록이 등록되었습니다.'],
  ['?록?기', '등록하기'],
  ['{/* Guestbook List Modal (?체보기 ? */}', '{/* Guestbook List Modal (전체보기 팝업) */}'],
];

for (const [bad, good] of replacements) {
  content = content.replace(bad, good);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Fix complete');
