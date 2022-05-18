import React, { useState } from "react";
import "./homepage.css";
import { db, storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Loader/Loader";

const Homepage = () => {
  const [banner1, setBanner1] = useState([]);
  const [banner2, setBanner2] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUploadBanner1 = (e) => {
    for (var i = 0; i < Object.keys(e.target.files).length; i++) {
      const newImage = e.target.files[i];
      setBanner1((prevState) => [...prevState, newImage]);
    }
  };

  const handleUploadBanner2 = (e) => {
    for (var i = 0; i < Object.keys(e.target.files).length; i++) {
      const newImage = e.target.files[i];
      setBanner2((prevState) => [...prevState, newImage]);
    }
  };

  const uploadBanner1 = async () => {
    setLoading(true);
    let imgLink = [];
    imgLink = await Promise.all(
      banner1.map(async (banner, key) => {
        const storageRef = ref(storage, `banner1/${key}`);
        await uploadBytes(storageRef, banner).then((snapshot) => {
          console.log("uploaded");
        });
        const downloadUrl = await getDownloadURL(
          ref(storage, `banner1/${key}`)
        );
        return downloadUrl;
      })
    );
    await setDoc(doc(db, "homepage", "banner1"), { imgLink });
    setLoading(false);
    window.location.reload();
  };

  const uploadBanner2 = async () => {
    setLoading(true);
    let imgLink = [];
    imgLink = await Promise.all(
      banner2.map(async (banner, key) => {
        const storageRef = ref(storage, `banner2/${key}`);
        await uploadBytes(storageRef, banner).then((snapshot) => {
          console.log("uploaded");
        });
        const downloadUrl = await getDownloadURL(
          ref(storage, `banner2/${key}`)
        );
        return downloadUrl;
      })
    );
    await setDoc(doc(db, "homepage", "banner2"), { imgLink });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="homepage">
      <div className="homepage-holder">
        <div className="homepage-left">
          <h3>Banner 1</h3>
          <input
            type="file"
            name="file-upload"
            onChange={handleUploadBanner1}
            className="file-input"
            multiple
          ></input>
          <button className="btn-create" onClick={uploadBanner1}>
            Upload
          </button>
        </div>
        <div className="homepage-right">
          <h3>Banner 2</h3>
          <input
            type="file"
            name="file-upload"
            onChange={handleUploadBanner2}
            className="file-input"
            multiple
          ></input>
          <button className="btn-create" onClick={uploadBanner2}>
            {loading ? <Loader small /> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
