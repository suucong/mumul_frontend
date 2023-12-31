import axios from 'axios';

export const getIsFollower = async (spaceId) => {
    const path = `/isFollower/${spaceId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(path, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        });

        return response.data;
    } catch (e) {
        console.error('getIsFollow Error: ', e.message);
        return false;
    }
};