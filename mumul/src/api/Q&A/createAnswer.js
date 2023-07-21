import axios from "axios";
import { LocalDateTime } from "js-joda";


export const createAnswer = async (id, currentUserInfo, answerText, btn, questionId) => {

  try {
    const response = await axios.post(
      `/spaces/${id}/${questionId}/answer/create`,
      {
        isPublic: btn,
        sentUserPic: currentUserInfo.picture,
        receivedUserId: "",
        userId: currentUserInfo.userId,
        userName: currentUserInfo.name,
        answerText: answerText,
        alternativeAnswerText:"",
        createdTime: LocalDateTime.now(),
        questionId: questionId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      }
    );

    return response.data;
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
