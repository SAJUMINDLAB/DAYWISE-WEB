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
    { q: '결제(?�인) ?�에???�용???�정?????�나??', a: '?? 가?�합?�다. 결제 ?�후?�도 ?�스?? ?�진, ?�션 ?�을 ?�유�?�� ?�정?????�으�??�시간으�?반영?�니??' },
    { q: '?�랑측용, ?��?측용???�로 만들 ???�나??', a: '?�이?�?�즈?�서???�나??계정?�로 ?�러 개의 �?��?�을 무제???�성?�실 ???�습?�다. ?�주 ?�보??계좌번호�??�르�??�정?�여 ?��??�을 ?�로 만들??보세??' },
    { q: '�?��???�작 중인???�?�이 ???�요.', a: '?�수 ?�력 ??��(?�랑/?��? ?�름, ?�식?? 메인 ?�진 ????비어?��? ?��?지 ?�인??주세?? ?�한, 로그???�션??만료?�었?????�으???�로고침 ???�시 로그?�하???�도??보시�?바랍?�다.' },
    { q: '?�진???�?�했?�데 ?��?가 빈칸?�로 보여??', a: '?��?지 ?�량???�무 ?�거???�트?�크 ?�경??불안?�할 ??발생?????�습?�다. ?��?지�??�간 ?�축?�거???�시 ???�시 ?�도??주세??' },
    { q: '종이 �?��?�에 ?�을 QR코드???�떻�?받나??', a: '�?��???�작 ?�료 ??[관�? 메뉴?�서 고화�?QR코드�?무료�??�운로드 받으?????�습?�다.' },
    { q: '?�작??�?��?��? ?�제 ??��?�나??', a: '?�원 ?�퇴 ?�까지 고객?�의 �?��?��? ?�구?�으�??�전?�게 보�??�니?? (본인??직접 ??��??가?�합?�다)' },
    { q: '�?��??주소(URL)???�떻�??�나??', a: '?�덤 발급?�는 주소 ?�?? ?�랑?��??�의 ?�름???�어 직접 커스?� 주소�??�성?????�습?�다. (?? daywise.com/view/jihoon-sua)' },
    { q: 'PC?� ?�마?�폰 모두 ??보이?�요?', a: '?? ?�이?�?�즈??모든 ?�플릿�? 기기 ?�면??맞게 최적?�되??반응?�으�??�작?�었?�니??' }
  ];

  return (
    <PageLayout>
      <div style={{ fontFamily: 'var(--font-kr-sans)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-kr-serif)', fontSize: '3rem', color: '#2C2C2C', fontWeight: '500', marginBottom: '16px' }}>
            ?�주 묻는 질문
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>?�이?�?�즈 ?�비?�에 ?�??궁금?�신 ?�을 ?�인??보세??</p>
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
