import axios from "axios";

export const deleteUser = async (userId) => {
    const path = `/v1/oauth/user/secession/${userId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.delete(path, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          });
          console.log(response.data);
          localStorage.removeItem('token');
    } catch (e) {
        console.error('deletUser Error: ', e.message);
    }
}