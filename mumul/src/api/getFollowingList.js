import axios from "axios";

export const getFollowingList = async (spaceId) => {
    const path = `/spaces/following/${spaceId}`;

    try {
        const response = await axios.get(path);

        return response.data.data;
    } catch (e) {
        console.error('getFollowingList Error: ', e.message);
    }
};