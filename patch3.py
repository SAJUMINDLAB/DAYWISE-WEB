import re
with open('src/pages/MasterDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Reduce Table minWidth
text = text.replace("minWidth: '1400px'", "minWidth: '950px'")

# 2. Reduce TH and TD Paddings
text = text.replace("padding: '16px 30px'", "padding: '12px 10px'")
text = text.replace("const thStyle = { padding: '16px 20px'", "const thStyle = { padding: '12px 10px'")
text = text.replace("const tdStyle = { padding: '16px 20px'", "const tdStyle = { padding: '12px 10px'")

# 3. Compact Action Buttons (padding: 8px 12px -> 6px 8px, gap: 8px -> 4px)
text = text.replace("padding: '8px 16px'", "padding: '6px 10px'")
text = text.replace("padding: '8px 12px'", "padding: '6px 10px'")
text = text.replace("gap: '8px'", "gap: '4px'")

with open('src/pages/MasterDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
