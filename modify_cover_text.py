import re

file_path = 'src/components/preview/sections/coverStyles/CoverText.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'import React' not in content:
    content = 'import React from \'react\';\n' + content

helper = '''
  const titleSize = mainInfo.coverTitleSize || 1.0;
  const getCustomTitleStyle = (extraStyle = {}) => ({
    ...commonTextProps.style,
    ...extraStyle,
    transform: `scale(${titleSize})`,
    transformOrigin: 'center'
  });

  const renderTitle = (defaultTitle) => {
    if (mainInfo.coverTitle) {
      return mainInfo.coverTitle.split('\\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return defaultTitle;
  };
'''

content = content.replace("  if (textStyle === 'style2') {", helper + "\n  if (textStyle === 'style2') {")

# Replace 1 & 2
content = content.replace(
    "<p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '40px' }}>\n            Wedding<br/>Invitation\n          </p>",
    "<p {...commonTextProps} style={getCustomTitleStyle({ marginBottom: '40px' })}>\n            {renderTitle(<>Wedding<br/>Invitation</>)}\n          </p>"
)

# Replace 3
content = content.replace(
    "<p {...commonTextProps} style={{ ...commonTextProps.style, fontFamily: 'var(--font-kr-serif)', fontStyle: 'normal', marginBottom: '30px' }}>\n            결혼합니다\n          </p>",
    "<p {...commonTextProps} style={getCustomTitleStyle({ fontFamily: 'var(--font-kr-serif)', fontStyle: 'normal', marginBottom: '30px' })}>\n            {renderTitle('결혼합니다')}\n          </p>"
)

# Replace 4
content = content.replace(
    "<p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '20px' }}>\n            Wedding Invitation\n          </p>",
    "<p {...commonTextProps} style={getCustomTitleStyle({ marginBottom: '20px' })}>\n            {renderTitle('Wedding Invitation')}\n          </p>"
)

# Replace 5
content = content.replace(
    "<p {...commonTextProps} style={{ ...commonTextProps.style, marginBottom: '30px' }}>\n            Wedding Invitation\n          </p>",
    "<p {...commonTextProps} style={getCustomTitleStyle({ marginBottom: '30px' })}>\n            {renderTitle('Wedding Invitation')}\n          </p>"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
