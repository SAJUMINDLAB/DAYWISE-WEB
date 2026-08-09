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
      <div style={{ fontFamily: 'var(--font-kr-sans)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '3rem', color: '#2C2C2C', fontWeight: '500', marginBottom: '16px' }}>
            자주 묻는 질문
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>데이와이즈 서비스에 대해 궁금하신 점을 확인해 보세요.</p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', borderTop: '1px solid #EBEBEB' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} style={{ borderBottom: '1px solid #EBEBEB' }}>
                <div 
                  onClick={() => toggleAccordion(idx)}
                  style={{ 
                    padding: '28px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    cursor: 'pointer', transition: 'background-color 0.2s', backgroundColor: 'transparent'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#2C2C2C', margin: 0, paddingRight: '20px', lineHeight: '1.4' }}>{faq.q}</h4>
                  <div style={{ flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={22} color="#888" /> : <ChevronDown size={22} color="#888" />}
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 12px 32px 12px' }}>
                    <p style={{ color: '#777', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default QnaPage;
