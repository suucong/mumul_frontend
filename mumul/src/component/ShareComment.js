import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import AnonymousAnswer from "./AnonymousAnswer";
import UntilAnswering from "./UntilAnswering";


function ShareComment({ questionShareData, currentUserInfo  }) {
    console.log("questionShareDate,", questionShareData);
    console.log("currentUserInfo : ",currentUserInfo );
  return (
    <>
      {questionShareData.length === 0 && (
        <p>👻👻👻 복사된 질문이 사라졌습니다 👻👻👻 </p>
      )}

      <React.Fragment>
        <div className="commentWrap questionWrap">
          <div className="profileArea">
            <img
              src={questionShareData.sentUserPic}
              alt="profile1"
              className="questioner"
            />
          </div>
          <div className="cnt">
            <p className="Nicname">{questionShareData.userId}</p>
            <p className="min">
              {getTimeDifference(questionShareData.createdTime)}
            </p>
            <p className="commentCnt">{questionShareData.questionText}</p>
          </div>
        </div>

        <div className="commentWrap answerWrap">
          <div className="profileArea">
            <img
              src={questionShareData.answers.sentUserPic}
              alt="profile2"
              className="respondent"
            />
          </div>
          <div className="cnt">
            <p className="Nicname">{questionShareData.answers.userName}</p>

            {questionShareData.answers.length === 0 ? (
              <UntilAnswering></UntilAnswering>
            ) : (
              <>
                <p className="min">
                  {getTimeDifference(questionShareData.answers[0].createdTime)}
                </p>
                <AnonymousAnswer
                  question={questionShareData}
                  answers={questionShareData.answers}
                  currentUserInfo={currentUserInfo}
                />
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default ShareComment;

// 질문 등록 시간과 현재 시간 사이의 차이를 계산하는 함수
function getTimeDifference(createdTime) {
  return moment(createdTime).locale("ko").fromNow();
}
