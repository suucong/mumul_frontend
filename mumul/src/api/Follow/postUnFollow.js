import axios from "axios";

export const postUnFollow = async (spaceId) => {
    const path = '/unFollow/' + spaceId;
    const token = localStorage.getItem('token');
    console.log("unfollow");

    try {
      const response = await axios.post(path, {}, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      console.log("unfollow");

        return response.data;
    } catch (e) {
        console.error('postFollow Error: ', e.message);
    }
}

