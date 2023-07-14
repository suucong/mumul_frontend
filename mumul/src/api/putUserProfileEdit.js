import axios from 'axios';

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/v1/oauth/user/update/' + currentUserId;

    try {
        const response = await axios.put(path, formData, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            withCredentials: true,
            crossDomain: true,
          });
        
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 