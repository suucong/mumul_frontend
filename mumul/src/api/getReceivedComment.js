import axios from 'axios';

export const getReceivedComment = async (spaceId) => {
    console.log("received spaceId: ", spaceId);

    const path = `/spaces/${spaceId}/received/get`;

    try {
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
        console.log("getReceivedComment response: ", response.data);
        return response.data;
    } catch (e) {
        console.error('Error retrieving received comments:', e.message);
        return false;
    }
};
