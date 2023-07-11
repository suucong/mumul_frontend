import axios from 'axios';

export const putStopSpace = async (currentUserId, stopSpace) => {
    const path = '/v1/oauth/user/spaceStop/' + currentUserId;
    const token = localStorage.getItem('token');

  try {
    const response = await axios.put(path, stopSpace, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });

    return response.data;
  } catch (e) {
    console.error('putStopSpace Error: ', e.message);
  }
};

