import axios from "axios";

export const postFollow = async (spaceId) => {
    const path = '/spaces/' + spaceId + '/follow';
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(path, {}, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        });

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

