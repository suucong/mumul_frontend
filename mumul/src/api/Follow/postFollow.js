import axios from "axios";

export const postFollow = async (spaceId, currentUserId) => {
    const path = '/spaces/' + spaceId + '/follow';
    console.log(currentUserId);
    console.log(spaceId);

    try {
        const response = await axios.post(path, {spaceId, currentUserId});

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

