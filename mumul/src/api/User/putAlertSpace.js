import axios from 'axios';

export const putAlertSpace = async (currentUserId, alertSpace) => {
    const path = '/v1/oauth/user/alertSpace/' + currentUserId;
    const token = localStorage.getItem('token');

  try {
    const response = await axios.put(path, alertSpace, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
    console.log(response.data);
  } catch (e) {
    console.error('putStopSpace Error: ', e.message);
  }
};

