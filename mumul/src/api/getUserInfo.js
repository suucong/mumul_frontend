import axios from 'axios';

export const getUserInfo = async () => {
  const path = '/v1/oauth/user/info';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    });

    console.log("token: "+token);
    console.log("getUserInfo: "+response.data);

    if (response.status !== 200) {
      throw new Error('bad server condition');
    }

    return response.data; // response.data로 수정
  } catch (e) {
    console.error('getUserInfo Error: ', e.message);
    return false;
  }
};
