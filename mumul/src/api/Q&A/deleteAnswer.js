import axios from 'axios';

export const deleteAnswer = async (spaceId, answerId, userId) => {
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

        return response.data;
    } catch (e) {
        console.error('Error deleting answer:', e.message);
        return false;
    }
};
