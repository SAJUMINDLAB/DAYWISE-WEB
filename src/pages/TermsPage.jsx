import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          maxWidth: '800px', width: '100%', backgroundColor: '#fff', borderRadius: '24px', 
          padding: '40px 48px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
          fontFamily: 'var(--font-kr-sans)', lineHeight: '1.8', color: '#333'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px' }}>
            <h1 style={{ fontSize: '2.2rem', margin: '0 0 16px 0', fontFamily: 'var(--font-kr-serif)', color: '#111' }}>이용약관</h1>
            <p style={{ color: '#888', margin: 0, fontSize: '0.95rem' }}>데이와이즈 서비스 이용을 위한 기본 약관입니다.</p>
          </div>
        
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 1 조 (목적)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555' }}>
              본 약관은 데이와이즈(이하 "회사")가 제공하는 모바일 청첩장 제작 서비스 및 관련 제반 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 2 조 (회원의 의무)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555' }}>
              <p style={{ margin: '0 0 12px 0' }}>① 회원은 서비스를 이용할 때 다음 각 호의 행위를 하여서는 아니 됩니다.</p>
              <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>이용 신청 또는 변경 시 허위 사실을 기재하거나, 다른 회원의 계정을 도용, 부정하게 사용하는 행위</li>
                <li>회사의 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로 이용하는 행위</li>
                <li>타인의 명예를 손상시키거나 불이익을 주는 행위, 게시판 등에 음란물을 게재하거나 음란사이트를 연결(링크)하는 행위</li>
                <li>회사 또는 제3자의 저작권 등 기타 권리를 침해하는 행위</li>
                <li>기타 불법적이거나 부당한 행위</li>
              </ol>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 3 조 (서비스의 제공 및 변경)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555' }}>
              회사는 안정적인 서비스 제공을 위해 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </div>
          </section>
          
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 4 조 (게시물 및 데이터 관리)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}>① 회원이 작성하거나 업로드한 콘텐츠(사진, 텍스트, 주소 등)에 대한 모든 책임은 전적으로 회원 본인에게 있으며, 회사는 이에 대해 어떠한 보증이나 책임도 지지 않습니다.</p>
              <p style={{ margin: 0 }}>② 회원의 콘텐츠가 제3자의 저작권, 초상권 등 기타 권리를 침해하는 경우, 이로 인해 발생하는 모든 민·형사상 법적 책임은 회원이 전적으로 부담하며 회사는 면책됩니다.</p>
              <p style={{ margin: 0 }}>③ 회사는 서비스 운영상 필요하다고 판단되는 경우, 회원의 사전 동의 없이 업로드된 콘텐츠를 삭제하거나 서비스 이용을 제한할 수 있으며, 이로 인한 데이터 손실에 대해 어떠한 보상이나 책임도 지지 않습니다.</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 5 조 (면책조항 및 손해배상)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}>① 회사는 서비스를 "있는 그대로(AS-IS)" 제공하며, 서비스의 무결성, 신뢰성, 특정 목적에의 적합성 등을 묵시적으로도 보증하지 않습니다.</p>
              <p style={{ margin: 0 }}>② 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지, 서버 장애, 해킹 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없거나 데이터가 유실된 경우 서비스 제공에 대한 책임이 완전히 면제됩니다.</p>
              <p style={{ margin: 0 }}>③ 회사는 회원의 귀책사유나 네트워크 환경 문제로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</p>
              <p style={{ margin: 0 }}>④ 서비스 이용과 관련하여 회원에게 발생한 어떠한 직·간접적, 징벌적, 파생적 손해에 대해서도 회사는 법적 책임을 지지 않으며, 회원이 감수해야 합니다.</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 6 조 (서비스의 종료 및 제한)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555' }}>
              회사는 회사의 사정으로 인해 언제든지 서비스의 전부 또는 일부를 수정, 중단, 또는 종료할 수 있으며, 무료로 제공되는 서비스에 대해서는 회원에게 사전 통지할 의무나 별도의 보상 책임을 지지 않습니다.
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#e53935', borderRadius: '2px' }}></span>
              제 7 조 (결제 및 환불 규정)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '12px', fontSize: '0.95rem', color: '#c62828', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #ffcdd2' }}>
              <p style={{ margin: 0 }}>① 회사가 제공하는 모바일 청첩장 서비스는 결제 완료 즉시 디지털 콘텐츠(청첩장 URL 및 템플릿)가 회원의 계정으로 발급 및 제공되는 서비스입니다.</p>
              <p style={{ margin: 0 }}>② 관련 법령(전자상거래 등에서의 소비자보호에 관한 법률 제17조 제2항 제5호)에 따라, 결제가 완료되고 청첩장 주소(URL)가 생성된 이후에는 디지털 콘텐츠의 특성상 상품의 가치가 소모된 것으로 간주되어 <strong>단순 변심에 의한 결제 취소 및 환불이 절대 불가</strong>합니다.</p>
              <p style={{ margin: 0 }}>③ 단, 회사의 서버 오류 등 명백한 귀책사유로 인하여 서비스를 전혀 이용하지 못한 경우에는 전액 환불 조치합니다.</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '16px', color: '#111', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: '#D4AF37', borderRadius: '2px' }}></span>
              제 8 조 (저작권의 귀속 및 이용제한)
            </h2>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', fontSize: '0.95rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}>① 회사가 제공하는 모든 서비스(템플릿 디자인, UI/UX, 로고, 소스코드 등)에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.</p>
              <p style={{ margin: 0 }}>② 회원은 서비스를 이용함으로써 얻은 정보나 디자인을 회사의 사전 승낙 없이 영리 목적으로 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</p>
              <p style={{ margin: 0 }}>③ 회원은 결제를 통해 템플릿의 '사용권'을 부여받는 것이며, 소유권을 취득하는 것이 아닙니다.</p>
            </div>
          </section>

          <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #f0f0f0', color: '#aaa', fontSize: '0.85rem', textAlign: 'right' }}>
            부칙: 본 약관은 2026년 8월 10일부터 적용됩니다.
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
