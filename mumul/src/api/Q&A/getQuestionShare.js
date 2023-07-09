import axios from 'axios';

export const getQuestionShare = async (questionId) => {
    console.log("received questionId: ", questionId);

    const path = `/spaces/${questionId}/get`;

    try {
        const response = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
        console.log("get Comment to share : ", response.data);
        return response.data;
    } catch (e) {
        console.error('Error retrieving Comment to share :', e.message);
        return false;
    }
};
