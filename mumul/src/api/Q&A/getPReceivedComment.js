import axios from 'axios';

export const getPReceivedComment = async (spaceId, page, pageSize) => {
    const path = `/spaces/${spaceId}/received/get?page=${page}&size=5`;

    try {
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error retrieving received comments:', e.message);
        return false;
    }
};
