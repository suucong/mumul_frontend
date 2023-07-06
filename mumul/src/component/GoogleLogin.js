import { useRef } from 'react';
import useScript from '../hooks/useScript';
import Goggle from "./../img/icon/icGoggle.png";

// Google Login 컴포넌트 정의
export function GoogleLogin({
  onGoogleSignIn = () => {
  }, // onGoogleSignIn 콜백 함수를 기본으로 설정
  text = 'signin_with', // 버튼에 표시될 텍스트를 기본값으로 설정
}) {
  const googleSignInButton = useRef(null); // Google 로그인 버튼 요소에 대한 참조를 생성

  // useScript 커스텀 훅 사용
  useScript('https://accounts.google.com/gsi/client', () => {
    // Google 계정 ID 서비스 초기화
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // 환경 변수에서 Google 클라이언트 ID 가져옴
      callback: onGoogleSignIn, // Google 로그인 성공 시 실행될 콜백 함수 설정
    });

    // Google 로그인 버튼 렌더링
    window.google.accounts.id.renderButton(
      googleSignInButton.current, // Google 로그인 버튼을 렌더링할 요소 참조
      { theme: 'outline', size: 'large', text, width: '300px' }, // 커스터마이즈 속성 설정
    );
  });

  return (
    <div 
    aria-hidden="true"
    style={{ display: 'none' }}
    ref={googleSignInButton}
    id="google-login-api" />
    ); // Google 로그인 버튼을 렌더링할 div 요소
};
