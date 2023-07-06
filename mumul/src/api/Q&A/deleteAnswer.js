import axios from 'axios';

export const deleteAnswer = async (spaceId, answerId, userId) => {
    console.log("delete spaceId: ", spaceId, ", delete answerId: ", answerId, ", userId: ", userId);

    const path = `/spaces/${spaceId}/${answerId}/${userId}/answer/delete`;

    try {
        const response = await axios.delete(
          path,{         
            data:{
                userId: userId,
                spaceId: spaceId,
                answerId: answerId
              },
              
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
          }
     
          
        );
        console.log("delete response: ", response.data);
        return response.data;
    } catch (e) {
        console.error('Error deleting answer:', e.message);
        return false;
    }
};
