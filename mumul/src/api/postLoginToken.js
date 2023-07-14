import axios from 'axios';
import { API_BASE_URL } from './api-config';

export const postLoginToken = async (idToken) => {
  const path = '/v1/oauth/login';

  try {
    const response = await axios.post(path, null, {
      params: {
        idToken: idToken
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      crossDomain: true,
    });

    if (response.status !== 200) {
      throw new Error('bad server condition');
    }

    const jwtToken = response.headers['authorization']; // 첫 번째 요소 선택
    console.log(jwtToken);

    // JWT 값을 스토리지에 저장합니다.
    localStorage.setItem('token', jwtToken);

    return true;
    // ... 나머지 코드 ...
  } catch (e) {
    console.error('postLoginToken Error: ', e.message);
    return false;
  }
};
