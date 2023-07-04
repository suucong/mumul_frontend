import axios from "axios";
import {Comment} from "../component/Comment"


export const createAnswer = async (id, currentUserInfo, answerText, btn, questionId) => {
  console.log("익명여부: "+btn)
  try {
    const response = await axios.post(
      `/spaces/${id}/answer/create`,
      {
        isPublic: btn,
        sentUserPic: currentUserInfo.picture,
        userId: currentUserInfo.userId,
        userName: currentUserInfo.name,
        answerText: answerText,
        createdTime: new Date(),
        questionId: questionId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        
        },
      }
    );

    console.log("질문 등록 성공:", response.data);
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
