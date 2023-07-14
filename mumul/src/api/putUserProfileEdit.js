import axios from 'axios';

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/v1/oauth/user/update/' + currentUserId;

    try {
        const response = await axios.put(path, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            crossDomain: true,
          }, formData);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 