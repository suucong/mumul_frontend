import axios from 'axios';

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/v1/oauth/user/update/' + currentUserId;

    try {
        const response = await axios.put(path, FormData);
        
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 