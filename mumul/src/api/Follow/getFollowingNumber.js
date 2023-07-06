import axios from 'axios';

export const getFollowingNumber = async (spaceId) => {
    const path = `/getFollow/followingNumber/${spaceId}`;
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
        console.error('getFollowingNumber Error: ', e.message);
        return false;
    }
};