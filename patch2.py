import re
with open('src/pages/MasterDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("minWidth: '1000px'", "minWidth: '1400px'")
text = text.replace("maxWidth: '150px'", "maxWidth: 'none', whiteSpace: 'nowrap'")
text = text.replace("daywise.kr/v/{inv.id}", "{inv.id}")
text = text.replace("<Users size={14} /> 명단 관리", "<Users size={14} /> 관리")
text = text.replace("wordBreak: 'break-all'", "wordBreak: 'normal'")

with open('src/pages/MasterDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
