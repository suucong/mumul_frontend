import axios from 'axios';

export const getQuestionShare = async (questionId) => {
    const path = `/spaces/${questionId}/get`;

    try {
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return response.data;
    } catch (e) {
        console.error('Error retrieving Comment to share :', e.message);
        return false;
    }
};
