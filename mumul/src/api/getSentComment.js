import axios from 'axios';

export const getReceivedComment = async (spaceId) => {
    const path = '/spaces/' + spaceId+'/sent/get';

    try {
        const response = await axios.get(path,{
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
        });
        console.log("getReceivedComment: "+response.data);
        return response.data;
    } catch(e) {
        console.error('getReceivedComment Error: ', e.message);
        return false;
    }
};