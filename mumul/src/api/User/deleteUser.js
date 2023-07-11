import axios from "axios";

export const deleteUser = async (userId) => {
    const path = `/v1/oauth/user/secession/${userId}`;
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');

    try {
        const response = await axios.delete(path, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          });
        return response.data;
    } catch (e) {
        console.error('deletUser Error: ', e.message);
    }
}