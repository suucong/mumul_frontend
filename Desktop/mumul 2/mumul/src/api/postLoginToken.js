import axios from 'axios';

export const postLoginToken = async (idToken) => {
  const path = '/v1/oauth/login';

  try {
    console.log("API 요청");
    console.log(idToken);

    const response = await axios.post(process.env.REACT_APP_API_URL+`${path}`, idToken, {
      headers: {
        'Access-Control-Allow-Origin': '*',
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
  } catch (e) {
    console.error('postLoginToken Error: ', e.message);
    return false;
  }
};
