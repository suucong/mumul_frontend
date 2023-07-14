import axios from 'axios';
import { API_BASE_URL } from './api-config';

export const getUserInfo = async () => {
  // const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  // const path = `${PROXY}/v1/oauth/user/info`;
  const path = "/v1/oauth/user/info";

  try {
    const response = await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      cache: 'no-cache' // 캐시를 비우는 옵션 추가
    });

    if (response.status !== 200) {
      throw new Error('bad server condition');
    }
    console.log(response.data);
    return response.data; // response.data로 수정
  } catch (e) {
    console.error('getUserInfo Error: ', e.message);
    return false;
  }
};
