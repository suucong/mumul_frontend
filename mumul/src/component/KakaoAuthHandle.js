import axios from 'axios';
import { useEffect } from 'react';
import { getUserInfo } from '../api/getUserInfo';

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    const kakaoLogin = async () => {
      try {
        const res = await axios.get(`/v1/oauth/login/kakao?code=${code}`);
        localStorage.setItem('token', res.headers.authorization);
        const userInfo = await getUserInfo();
        window.location.href = `/${userInfo.userId}`;
      } catch (error) {
        // Handle error if needed
      }
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <>
    <p>로그인 중입니다...</p>
    </>
  );
};

export default KakaoAuthHandle;

