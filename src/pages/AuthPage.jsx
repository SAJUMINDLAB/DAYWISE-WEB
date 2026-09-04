import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import { signIn, signUp, signInWithKakao } from '../api/authApi';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false); // 가입을 기본으로
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const turnstileRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        if (!captchaToken) {
          setError('로봇 방지 인증(Captcha)을 완료해주세요.');
          setLoading(false);
          return;
        }
        await signIn(email, password, captchaToken);
        alert('로그인되었습니다. 데이와이즈에 오신 것을 환영합니다!');
      } else {
        if (password !== passwordConfirm) {
          setError('비밀번호가 일치하지 않습니다.');
          setLoading(false);
          return;
        }
        if (!captchaToken) {
          setError('로봇 방지 인증(Captcha)을 완료해주세요.');
          setLoading(false);
          return;
        }
        await signUp(email, password, captchaToken);
        alert('회원가입이 완료되었습니다. 데이와이즈에 오신 것을 환영합니다!');
      }
      navigate('/dashboard');
    } catch (err) {
      if (err.message && err.message.includes('captcha')) {
        setError('보안 인증(캡챠)이 만료되었습니다. 다시 시도해주세요.');
      } else {
        setError(err.message || '인증에 실패했습니다.');
      }
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      await signInWithKakao();
      // OAuth redirects the page, so no need to navigate here
    } catch (err) {
      setError('카카오 로그인에 실패했습니다.');
    }
  };

  return (
    <div style={{ 
      flex: 1, width: '100%', height: '100vh', overflowY: 'auto', display: 'flex', fontFamily: 'var(--font-kr-sans)',
      backgroundColor: '#FDFBF7', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: '#fff', 
        padding: '50px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        position: 'relative'
      }}>
        <Link to="/" style={{ position: 'absolute', top: '24px', right: '24px', textDecoration: 'none', color: '#888', fontSize: '1.2rem' }}>
          &times;
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            background: 'linear-gradient(to right, #D4AF37, #8A6308)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '16px', lineHeight: '1'
          }}>
            <svg width="48" height="30" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px', transform: 'translateY(1px)' }}>
              <circle cx="14.5" cy="12.5" r="9.5" stroke="url(#metallicGoldAuth)" strokeWidth="1.5" />
              <circle cx="25.5" cy="12.5" r="9.5" stroke="url(#metallicGoldAuth)" strokeWidth="1.5" />
              <path d="M20 2 L20.5 4.5 L23 5 L20.5 5.5 L20 8 L19.5 5.5 L17 5 L19.5 4.5 Z" fill="url(#metallicGoldAuth)" />
              <defs>
                <linearGradient id="metallicGoldAuth" x1="0" y1="0" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C59B3C" />
                  <stop offset="35%" stopColor="#E2C87A" />
                  <stop offset="50%" stopColor="#FFF7C0" />
                  <stop offset="65%" stopColor="#C59B3C" />
                  <stop offset="100%" stopColor="#8A6308" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: 'var(--font-en-serif)', fontStyle: 'italic', fontSize: '2.8rem', fontWeight: '600', letterSpacing: '2px' }}>DAYWISE</span>
          </div>
          <p style={{ color: '#888', fontSize: '0.95rem' }}>
            {isLogin ? '다시 오신 것을 환영합니다.' : '나만의 특별한 청첩장을 만들어보세요.'}
          </p>
        </div>

        <button 
          onClick={handleKakaoLogin}
          style={{
            width: '100%', padding: '16px', backgroundColor: '#FEE500', color: '#000000',
            border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '600',
            cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          카카오로 3초 만에 시작하기
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', color: '#ccc' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
          <span style={{ padding: '0 10px', fontSize: '0.8rem' }}>또는 이메일로 계속하기</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
        </div>

        {/* Tab UI for Login/Signup */}
        <div style={{ display: 'flex', backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          <button 
            type="button"
            onClick={() => { 
              setIsLogin(false); 
              setError(''); 
              setCaptchaToken(null);
              turnstileRef.current?.reset();
            }}
            style={{
              flex: 1, padding: '10px 0', fontSize: '0.95rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
              backgroundColor: !isLogin ? '#fff' : 'transparent',
              color: !isLogin ? '#2C2C2C' : '#888',
              boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            새로 가입하기
          </button>
          <button 
            type="button"
            onClick={() => { 
              setIsLogin(true); 
              setError(''); 
              setCaptchaToken(null);
              turnstileRef.current?.reset();
            }}
            style={{
              flex: 1, padding: '10px 0', fontSize: '0.95rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
              backgroundColor: isLogin ? '#fff' : 'transparent',
              color: isLogin ? '#2C2C2C' : '#888',
              boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            기존 계정 로그인
          </button>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="email" 
            placeholder="이메일 주소" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #ddd',
              fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#fafafa'
            }}
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #ddd',
              fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#fafafa'
            }}
          />

          {!isLogin && (
            <input 
              type="password" 
              placeholder="비밀번호 확인" 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              style={{
                width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #ddd',
                fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#fafafa'
              }}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Turnstile 
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => {
                setCaptchaToken(null);
                turnstileRef.current?.reset();
              }}
              onError={() => {
                setError('로봇 방지 인증 서버와 통신할 수 없습니다. 키 설정과 도메인을 확인해주세요.');
              }}
            />
          </div>

          {error && <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '4px', textAlign: 'center' }}>{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', padding: '16px', backgroundColor: '#2C2C2C', color: '#fff',
              border: 'none', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '16px',
              opacity: loading ? 0.7 : 1, transition: 'background-color 0.2s',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C2C2C'}
          >
            {loading ? '처리 중...' : (isLogin ? '이메일로 로그인' : '이메일로 가입하기')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
