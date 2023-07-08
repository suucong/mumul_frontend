import axios from 'axios';

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/v1/oauth/user/update/' + currentUserId;
    const token = localStorage.getItem('token');

    try {
        console.log("프로필 업데이트");

        const response = await axios.put(path, formData);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 