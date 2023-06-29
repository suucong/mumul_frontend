import axios from 'axios';

export const putUserProfileEdit = async (currentUserId, formData) => {
    const path = '/spaces/user/update/' + currentUserId;

    try {
        console.log("프로필 업데이트");

        const response = await axios.put(path, formData);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}; 