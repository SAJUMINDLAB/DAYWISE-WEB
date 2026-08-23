import re
with open('src/utils/imageUtils.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    "canvas.toDataURL('image/jpeg', 0.95)",
    "canvas.toDataURL('image/webp', 0.90)"
)
with open('src/utils/imageUtils.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/hooks/useImageUpload.js', 'r', encoding='utf-8') as f:
    text2 = f.read()

text2 = text2.replace("const fileExt = 'jpg';", "const fileExt = 'webp';")
text2 = text2.replace("contentType: 'image/jpeg',", "contentType: 'image/webp',")
with open('src/hooks/useImageUpload.js', 'w', encoding='utf-8') as f:
    f.write(text2)
