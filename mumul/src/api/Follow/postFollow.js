import axios from "axios";

export const postFollow = async (spaceId) => {
    const path = '/follow/' + spaceId;
    const token = localStorage.getItem('token');
    console.log("follow");

    try {
        const response = await axios.post(path, {}, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
          }
        });

        console.log("follow");

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

