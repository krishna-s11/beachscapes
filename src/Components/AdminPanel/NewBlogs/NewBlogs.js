import React, { useState } from "react";
import "./newBlogs.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const NewBlogs = ({ close }) => {
  const [details, setDetails] = useState({
    heading: "",
    title: "",
    para1: "",
    para2: "",
    para3: "",
    para4: "",
    para5: "",
    para6: "",
    para7: "",
    para8: "",
    para9: "",
    para10: "",
  });
  const defaultBtn = () => {
    const defaultBtn = document.querySelector("#choose-input");
    defaultBtn.click();
  };
  const handleUpload = (e) => {
    // for (var i = 0; i < e.target.files.length; i++) {
    //   const newImage = e.target.files[i];
    //   setImages((prevState) => [...prevState, newImage]);
    // }
    // console.log(images);
  };
  const handleSubmit = async () => {
    await addDoc(collection(db, "blogs"), details);
    close();
    window.location.reload();
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="new-blogs">
      <div className="add-new-blogs">
        <div className="add-card-top">
          <h2>Add New Blog</h2>
          <AiOutlineClose
            id="btn-close"
            onClick={() => {
              close();
            }}
          />
        </div>
        <div className="add-card-content">
          <div className="add-photo">
            <div className="choose-photo" onClick={defaultBtn}>
              <RiImageAddFill id="photo-img" />
              <p>+ Choose Product's Photo</p>
            </div>
            <input
              id="choose-input"
              onChange={handleUpload}
              type="file"
              multiple
              hidden
            ></input>
            <div
              style={{
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <p style={{ fontWeight: "600" }}>Upload Photo</p>
              <p style={{ fontSize: "14px", color: "#777" }}>
                You can choose upto 3 images.
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                marginTop: "20px",
                color: "#4fc3a1",
                display: "none",
              }}
              id="cnf-text"
            >
              Uploaded successfully
            </p>
          </div>
          <div className="add-content">
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Heading:</p>
              <input
                type="text"
                class="form__input add-input"
                id="tourTitle"
                name="heading"
                onChange={handleChange}
                placeholder="Blog heading"
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Blog Title:</p>
              <input
                type="text"
                class="form__input add-input"
                id="tourTitle"
                name="title"
                onChange={handleChange}
                placeholder="Blog title"
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 1:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para1"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 2:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para2"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 3:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para3"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 4:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para4"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 5:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para5"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 6:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para6"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 7:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para7"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 8:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para8"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 9:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para9"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Paragraph 10:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="para10"
                onChange={handleChange}
                placeholder=""
                required
              ></textarea>
            </div>
            <div
              style={{
                width: "350px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-add-tour" onClick={handleSubmit}>
                Create Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlogs;
