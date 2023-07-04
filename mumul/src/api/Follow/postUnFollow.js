import axios from "axios";

export const postUnFollow = async (spaceId, currentUserId) => {
    const path = '/spaces/' + spaceId + '/unFollow';

    try {
        const response = await axios.post(path, {spaceId, currentUserId});

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

