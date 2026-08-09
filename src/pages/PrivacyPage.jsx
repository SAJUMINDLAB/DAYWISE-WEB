import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <div style={{ fontFamily: 'var(--font-kr-sans)', lineHeight: '1.8', color: '#333' }}>
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' }}>&larr; 홈으로 돌아가기</Link>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', fontFamily: 'var(--font-kr-serif)' }}>개인정보처리방침</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#000' }}>1. 개인정보의 수집 및 이용 목적</h2>
        <p>데이와이즈(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>회원 가입 및 관리: 서비스 이용에 따른 본인 식별, 가입 의사 확인, 부정이용 방지 등</li>
          <li>서비스 제공: 모바일 청첩장 제작, 호스팅, 고객 지원, 참석자 정보(방명록, 참석 여부) 수집 등</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#000' }}>2. 수집하는 개인정보의 항목</h2>
        <p>회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>필수 항목: 이메일 주소, 비밀번호 (카카오 로그인 시 제공되는 식별 정보)</li>
          <li>선택 항목: 신랑/신부 이름, 연락처, 예식장 위치, 계좌번호 등 (사용자가 자발적으로 입력하는 청첩장 기재 정보)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#000' }}>3. 개인정보의 보유 및 이용 기간</h2>
        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
          <li>청첩장 및 부가 데이터: 사용자가 삭제를 요청하기 전까지 평생 보관</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#000' }}>4. 개인정보의 파기절차 및 방법</h2>
        <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
        <p>② 회원이 회원탈퇴를 요청하는 경우, 회원이 생성한 모든 청첩장 데이터 및 개인정보는 복구 불가능한 방법으로 즉시 영구 삭제됩니다.</p>
        <p>③ 단, 관계 법령에 따라 일정 기간 보존해야 하는 정보는 해당 기간 동안 안전하게 분리 보관 후 파기합니다.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#000' }}>5. 정보주체의 권리·의무 및 행사에 관한 사항 (면책 포함)</h2>
        <p>① 정보주체는 언제든지 자신의 개인정보를 조회, 수정, 삭제(회원탈퇴)할 수 있습니다.</p>
        <p>② 회원이 자신의 개인정보(이메일, 비밀번호 등)를 소홀히 관리하거나 타인에게 양도·대여하여 발생한 데이터 유출 및 손해에 대해서 회사는 일절 책임을 지지 않습니다.</p>
        <p>③ 회원이 청첩장 내에 기재하는 개인정보(계좌번호, 전화번호, 예식 정보 등)는 누구나 접근 가능한 웹페이지(URL)의 특성상 불특정 다수에게 노출될 수 있음을 회원은 인지하고 동의한 것으로 간주하며, 이로 인한 문제 발생 시 회사는 법적 책임을 지지 않습니다.</p>
      </section>

        <p style={{ marginTop: '60px', color: '#888', fontSize: '0.9rem' }}>부칙: 본 방침은 2026년 8월 8일부터 적용됩니다.</p>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
