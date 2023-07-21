import axios from "axios";
import { LocalDateTime } from "js-joda";


export const createQuestion = async (info, id, currentUserInfo, questionText, btn, randomImage) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `/spaces/${id}/question/create`,
      {
        sentUserPic: randomImage,
        sendingUserId: currentUserInfo.userId,
        receivingUserId: info.userId,
        receivedUserPic: info.picture,
        receivedUserName: info.name,
        questionText: questionText,
        createdTime: LocalDateTime.now(),
        answers: null,
        userId: currentUserInfo.name,
        isAnonymous: btn 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        },
      }
    );

    // 추가적인 로직을 처리하거나 성공 후 작업을 수행합니다.
   // Call the Comment function with the necessary props
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("로그인이 필요합니다.");
      // 로그인이 필요한 경우에 대한 처리를 추가합니다.
    } else {
      console.error("질문 등록에 실패함:", error);
      // 필요한 에러 처리 로직을 추가합니다.
    }
  }
};