import React, { useEffect, useState } from "react";
import "./destinations.css";
import { db, storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Loader/Loader";

const Destinations = () => {
  const [details, setDetails] = useState({
    destinations: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState([]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const randomId = uuidv4();
    const storageRef = ref(storage, `destinations/${randomId}`);
    await uploadBytes(storageRef, image).then((snapshot) => {
      console.log("uploaded");
    });
    const downloadUrl = await getDownloadURL(
      ref(storage, `destinations/${randomId}`)
    );

    await addDoc(collection(db, "destinations"), { ...details, downloadUrl });
    setLoading(false);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "destinations", id));
    window.location.reload();
  };

  useEffect(() => {
    const getDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setDestinations(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getDestinations();
  }, []);

  return (
    <div className="destinations">
      <div className="destinations-top">
        <h1>Manage Destinations</h1>
        <div className="destinations-action-bar">
          {/* <button
              className="btn btn-add_items"
              onClick={() => {
                //   setAdd(true);
              }}
            >
              New +
            </button> */}
        </div>
      </div>
      <div className="create-destinations-container">
        <p>Create new destination</p>
        <div>
          <input
            type="text"
            class="form__input add-input"
            id="destinations"
            name="destinations"
            onChange={handleChange}
            placeholder="Destination"
            required
          ></input>
          <input
            type="file"
            name="file-upload"
            onChange={handleUpload}
            className="file-input"
          ></input>
          <button className="btn-create" onClick={handleSubmit}>
            {loading ? <Loader small /> : "Create"}
          </button>
        </div>
      </div>
      <div className="destinations-cont">
        {destinations
          ? destinations.map((destination) => {
              return (
                <div className="destinations-card">
                  <img
                    className="img-holder"
                    src={destination.data.downloadUrl}
                    alt=""
                  ></img>
                  <h3>{destination.data.destinations}</h3>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      handleDelete(destination.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Destinations;
