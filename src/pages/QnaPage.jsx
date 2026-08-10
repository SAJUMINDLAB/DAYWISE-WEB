import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const QnaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { q: '결제(승인) 후에도 내용을 수정할 수 있나요?', a: '네, 가능합니다. 결제 이후에도 텍스트, 사진, 옵션 등을 자유롭게 수정할 수 있으며 실시간으로 반영됩니다.' },
    { q: '신랑측용, 신부측용을 따로 만들 수 있나요?', a: '데이와이즈에서는 하나의 계정으로 여러 개의 청첩장을 무제한 생성하실 수 있습니다. 혼주 정보나 계좌번호를 다르게 설정하여 양가용을 따로 만들어 보세요.' },
    { q: '청첩장 제작 중인데 저장이 안 돼요.', a: '필수 입력 항목(신랑/신부 이름, 예식일, 메인 사진 등)이 비어있지 않은지 확인해 주세요. 또한, 로그인 세션이 만료되었을 수 있으니 새로고침 후 다시 로그인하여 시도해 보시기 바랍니다.' },
    { q: '사진을 저장했는데 일부가 빈칸으로 보여요.', a: '이미지 용량이 너무 크거나 네트워크 환경이 불안정할 때 발생할 수 있습니다. 이미지를 약간 압축하거나 잠시 후 다시 시도해 주세요.' },
    { q: '종이 청첩장에 넣을 QR코드는 어떻게 받나요?', a: '청첩장 제작 완료 후 [관리] 메뉴에서 고화질 QR코드를 무료로 다운로드 받으실 수 있습니다.' },
    { q: '제작한 청첩장은 언제 삭제되나요?', a: '회원 탈퇴 전까지 고객님의 청첩장은 영구적으로 안전하게 보관됩니다. (본인이 직접 삭제도 가능합니다)' },
    { q: '청첩장 주소(URL)는 어떻게 되나요?', a: '랜덤 발급되는 주소 대신, 신랑신부님의 이름을 넣어 직접 커스텀 주소를 생성할 수 있습니다. (예: daywise.com/view/jihoon-sua)' },
    { q: 'PC와 스마트폰 모두 잘 보이나요?', a: '네, 데이와이즈의 모든 템플릿은 기기 화면에 맞게 최적화되는 반응형으로 제작되었습니다.' }
  ];

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          maxWidth: '800px', width: '100%', backgroundColor: '#fff', borderRadius: '24px', 
          padding: '40px 48px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
          fontFamily: 'var(--font-kr-sans)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px' }}>
            <h1 style={{ fontSize: '2.2rem', margin: '0 0 16px 0', fontFamily: 'var(--font-kr-serif)', color: '#111' }}>자주 묻는 질문</h1>
            <p style={{ color: '#888', margin: 0, fontSize: '0.95rem' }}>데이와이즈 서비스에 대해 궁금하신 점을 확인해 보세요.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} style={{ 
                  border: '1px solid #eaeaea', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 10px 20px rgba(0,0,0,0.03)' : 'none',
                  borderColor: isOpen ? '#e0e0e0' : '#eaeaea'
                }}>
                  <div 
                    onClick={() => toggleAccordion(idx)}
                    style={{ 
                      padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      cursor: 'pointer', backgroundColor: isOpen ? '#fafafa' : '#fff', transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = '#fdfdfd'; }}
                    onMouseOut={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = '#fff'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: '#D4AF37', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'var(--font-en)' }}>Q.</span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#222', margin: 0, lineHeight: '1.4' }}>{faq.q}</h4>
                    </div>
                    <div style={{ flexShrink: 0, 
                                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                                  transition: 'transform 0.3s ease',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: isOpen ? '#f0f0f0' : 'transparent'
                                }}>
                      <ChevronDown size={20} color={isOpen ? "#555" : "#aaa"} />
                    </div>
                  </div>
                  
                  <div style={{ 
                    maxHeight: isOpen ? '500px' : '0', 
                    opacity: isOpen ? 1 : 0, 
                    overflow: 'hidden', 
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ padding: '0 24px 24px 24px', borderTop: '1px dashed #eee', marginTop: '4px', paddingTop: '20px', display: 'flex', gap: '12px' }}>
                      <span style={{ color: '#444', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'var(--font-en)' }}>A.</span>
                      <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: '4px 0 0 0' }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </PageLayout>
  );
};

export default QnaPage;
