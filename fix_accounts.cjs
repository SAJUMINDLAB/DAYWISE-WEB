const fs = require('fs');
const path = 'src/components/preview/InvitationPreview.jsx';
let text = fs.readFileSync(path, 'utf8');

text = text.replace(/신랑측怨꾩쥖踰덊샇/g, "신랑측 계좌번호");
text = text.replace(/신부측怨꾩쥖踰덊샇/g, "신부측 계좌번호");
text = text.replace(/횞/g, "<X size={16} />");

fs.writeFileSync(path, text, 'utf8');
console.log('Fixed Groom/Bride Account Titles and X icon.');
