import axios from 'axios';

export const getIsFollow = async (spaceId, currentUserId) => {
    const path = '/spaces/' + spaceId + '/isFollow';

    try {
        const response = await axios.get(path, {spaceId, currentUserId});

        return response.data;
    } catch (e) {
        console.error('getIsFollow Error: ', e.message);
        return false;
    }
};