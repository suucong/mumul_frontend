import axios from 'axios';

export const deleteQuestion = async (spaceId, questionId, userId) => {
    console.log("delete spaceId: ", spaceId, ", delete questionId: ", questionId, ", userId: ", userId);

    const path = `/spaces/${spaceId}/${questionId}/${userId}/question/delete`;

    try {
        const response = await axios.delete(
          path,{         
            data:{
                userId: userId,
                spaceId: spaceId,
                questionId: questionId
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
        console.error('Error deleting received comments:', e.message);
        return false;
    }
};
