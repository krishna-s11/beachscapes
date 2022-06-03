import React, { useEffect, useState } from "react";
import "./newBlogs.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { collection, updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../../Loader/Loader";

const NewBlogs = ({ close, id }) => {
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
  const [blog, setBlog] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultBtn = () => {
    const defaultBtn = document.querySelector("#choose-input");
    defaultBtn.click();
  };
  const handleUpload = (e) => {
    for (var i = 0; i < Object.keys(e.target.files).length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    let imgLink = [];
    const randomId = uuidv4();
    imgLink = await Promise.all(
      images.map(async (image, key) => {
        const storageRef = ref(storage, `blogs/${randomId}/${key}`);
        await uploadBytes(storageRef, image).then((snapshot) => {
          console.log("uploaded");
        });
        const downloadUrl = await getDownloadURL(
          ref(storage, `blogs/${randomId}/${key}`)
        );
        return downloadUrl;
      })
    );
    if (!id) {
      await setDoc(doc(db, "blogs", randomId), { ...details, imgLink });
    } else {
      if (imgLink.length > 0) {
        await updateDoc(doc(db, "blogs", id), { ...details, imgLink });
      } else {
        await updateDoc(doc(db, "blogs", id), { ...details });
      }
    }
    setLoading(false);
    close();
    window.location.reload();
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      const getBlog = async () => {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
          setDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      getBlog();
    }
  }, [id]);

  console.log(blog);
  console.log(details);

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
                defaultValue={details ? details.heading : null}
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
                defaultValue={details ? details.title : null}
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
                defaultValue={details ? details.para1 : null}
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
                defaultValue={details ? details.para2 : null}
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
                defaultValue={details ? details.para3 : null}
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
                defaultValue={details ? details.para4 : null}
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
                defaultValue={details ? details.para5 : null}
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
                defaultValue={details ? details.para6 : null}
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
                defaultValue={details ? details.para7 : null}
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
                defaultValue={details ? details.para8 : null}
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
                defaultValue={details ? details.para9 : null}
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
                defaultValue={details ? details.para10 : null}
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
                {loading ? <Loader small /> : "Create Blog"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlogs;