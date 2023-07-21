import axios from 'axios';

export const getPReceivedComment = async (spaceId, page, pageSize) => {
    const path = `/spaces/${spaceId}/received/get?page=${page}&size=${pageSize}`;

    try {
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error retrieving received comments:', e.message);
        return false;
    }
};
