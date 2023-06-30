import React, { useRef, useState, useEffect } from "react";
import Close from "../../img/icon/close.png";
import MyprofileImg from "../../img/Ellipse 104.png";
import { putUserProfileEdit } from "../../api/putUserProfileEdit";

function ProfileEdit({ onClose, userId, name, picture, introduce, instaId, link }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(picture);
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
        id: userId,
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

    const response = putUserProfileEdit(userId, formData);
    console.log(response.data);
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
                  <img src={picture} alt="myprofile" />
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
                    defaultValue={name}
                    id="Nickname"
                    ref={nicknameInput}
                  />
                  <label htmlFor="introduce">소개</label>
                  <input
                    type="text"
                    defaultValue={introduce}
                    id="introduce"
                    ref={introduceInput}
                  />
                  <label htmlFor="sns">SNS 링크</label>
                  <input
                    type="text"
                    defaultValue={instaId}
                    id="sns"
                    ref={snsInput}
                  />
                  <label htmlFor="link">링크</label>
                  <input type="text" id="link" ref={linkInput} defaultValue={link}/>
                </div>
                <div className="btn">
                  <button className="editProfile active" type="submit" onClick={() => window.location.reload()}>
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
