import axios from "axios";

export const getFollowerList = async (spaceId) => {
    const path = `/spaces/follower/${spaceId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(path, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          });

        return response.data.data;
    } catch (e) {
        console.error('getFollowerList Error: ', e.message);
    }
};