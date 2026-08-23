import re
with open('src/pages/MasterDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r'<div style=\{\{ fontSize: \'0\.8rem\', color: \'#888\' \}\}>예식: \{weddingDate\}</div>',
    '<div style={{ fontSize: \'0.8rem\', color: \'#888\', marginBottom: \'2px\' }}>예식: {weddingDate}</div>\n                            <div style={{ fontSize: \'0.75rem\', color: \'#1A73E8\', wordBreak: \'break-all\' }}>ID: {inv.user?.email || inv.user?.id || \'비회원\'}</div>',
    text
)

text = re.sub(
    r'\{paymentDate !== \'-\' && <span style=\{\{ fontSize: \'0\.75rem\', color: \'#888\' \}\}>결제: \{paymentDate\}</span>\}',
    '{paymentDate !== \'-\' && <span style={{ fontSize: \'0.75rem\', color: \'#888\' }}>결제일: {paymentDate}</span>}\n                              {status === \'paid\' && <span style={{ fontSize: \'0.75rem\', color: \'#333\', fontWeight: \'bold\' }}>{Number(inv.payment_amount || 9900).toLocaleString()}원</span>}',
    text
)

text = re.sub(
    r'<td style=\{\{ \.\.\.tdStyle, textAlign: \'center\' \}\}>\s*<a href=\{`/v/\$\{inv\.id\}`\} target=\"_blank\" rel=\"noreferrer\" style=\{\{ display: \'inline-flex\', alignItems: \'center\', gap: \'4px\', padding: \'6px 12px\', border: \'1px solid #EAEAEA\', borderRadius: \'4px\', color: \'#666\', textDecoration: \'none\', fontSize: \'0\.8rem\', transition: \'all 0\.2s\', backgroundColor: \'#fff\' \}\} onMouseEnter=\{\(e\) => \{ e\.currentTarget\.style\.backgroundColor = \'#000\'; e\.currentTarget\.style\.color = \'#fff\'; e\.currentTarget\.style\.borderColor = \'#000\'; \}\} onMouseLeave=\{\(e\) => \{ e\.currentTarget\.style\.backgroundColor = \'#fff\'; e\.currentTarget\.style\.color = \'#666\'; e\.currentTarget\.style\.borderColor = \'#EAEAEA\'; \}\}>\s*<ExternalLink size=\{14\} /> 보기\s*</a>\s*</td>',
    '<td style={{ ...tdStyle, maxWidth: \'150px\' }}>\n                            <a href={`/v/${inv.id}`} target=\"_blank\" rel=\"noreferrer\" style={{ display: \'flex\', alignItems: \'center\', gap: \'4px\', padding: \'6px 10px\', border: \'1px solid #EAEAEA\', borderRadius: \'4px\', color: \'#1A73E8\', textDecoration: \'none\', fontSize: \'0.75rem\', transition: \'all 0.2s\', backgroundColor: \'#F8FBFF\', wordBreak: \'break-all\', lineHeight: \'1.2\' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = \'#E8F0FE\'; e.currentTarget.style.borderColor = \'#1A73E8\'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = \'#F8FBFF\'; e.currentTarget.style.borderColor = \'#EAEAEA\'; }}>\n                              daywise.kr/v/{inv.id}\n                              <ExternalLink size={12} style={{ flexShrink: 0 }} />\n                            </a>\n                          </td>',
    text
)

with open('src/pages/MasterDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
