import React, { useRef, useState, useEffect } from "react";
import Close from "../../img/icon/close.png";
import { putUserProfileEdit } from "../../api/putUserProfileEdit";

function ProfileEdit({ onClose, currentUserInfo }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUserInfo.picture);
  const nicknameInput = useRef();
  const introduceInput = useRef();
  const snsInput = useRef();
  const linkInput = useRef();
  const imageInput = useRef();

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const onClickInput = () => {
    imageInput.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("imgFile", selectedFile);

    const data = {
      info: {
        id: currentUserInfo.userId,
        name: nicknameInput.current.value,
        introduce: introduceInput.current.value,
        instaId: snsInput.current.value,
        link: linkInput.current.value,
      },
    };

    formData.append(
      "requestDto",
      new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );

    const response = putUserProfileEdit(currentUserInfo.userId, formData);
    console.log(response.data);
    // window.location.reload();
  };

  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="profilePopup">
            <form onSubmit={handleSubmit}>
              <div className="profileArea">
                {previewUrl ? (
                  <img src={previewUrl} alt="myprofile" />
                ) : (
                  <img src={currentUserInfo.picture} alt="myprofile" />
                )}
                <span className="editTxt" onClick={onClickInput}>
                  Edit
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInput}
                  className="fileInput"
                  onChange={handleFileChange}
                />
              </div>
              <div className="inputWrap">
                <div>
                  <label htmlFor="Nickname">닉네임</label>
                  <input
                    type="text"
                    defaultValue={currentUserInfo.name}
                    id="Nickname"
                    ref={nicknameInput}
                  />
                  <label htmlFor="introduce">소개</label>
                  <input
                    type="text"
                    defaultValue={currentUserInfo.introduce}
                    id="introduce"
                    ref={introduceInput}
                  />
                  <label htmlFor="sns">SNS 링크</label>
                  <input
                    type="text"
                    defaultValue={currentUserInfo.instaId}
                    id="sns"
                    ref={snsInput}
                  />
                  <label htmlFor="link">링크</label>
                  <input
                    type="text"
                    id="link"
                    ref={linkInput}
                    defaultValue={currentUserInfo.link}
                  />
                </div>
                <div className="btn">
                  <button
                    className="editProfile active"
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                      window.location.reload();
                      setTimeout(() => window.location.reload(), 1000);
                    }}
                  >
                    수정하기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;