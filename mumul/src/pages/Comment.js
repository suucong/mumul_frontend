import Profile1 from "./../img/Ellipse 103.png";
import Profile2 from "./../img/Ellipse 104.png";
import AnswerButton from "./../component/AnswerButton";

function ReceiveComment() {
  return (
    <>
      <div className="commentWrap questionWrap">
        <div className="profileArea">
          <img src={Profile1} alt="profile1" className="questioner" />
        </div>
        <div className="cnt">
          <p className="Nicname">익명의 토끼</p>
          <p className="min">20분 전🔒</p>
          <p className="commentCnt">
            중요한 결정을 내려야 할 때 찾는 장소가 있나요? 마음 속의 장소도
            좋아요. <br></br>그곳은 어떤 곳인가요?
          </p>
        </div>
      </div>
      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile2" className="respondent" />
        </div>
        <div className="cnt">
          <AnswerButton></AnswerButton>
        </div>
      </div>
    </>
  );
}

export default ReceiveComment;
