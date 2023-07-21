import axios from 'axios';

export const deleteQuestion = async (spaceId, questionId, userId) => {
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
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
          }
     
          
        );

        return response.data;
    } catch (e) {
        console.error('Error deleting received comments:', e.message);
        return false;
    }
};
