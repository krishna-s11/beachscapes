import React, { useState } from "react";
import "./newTour.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const NewTour = ({ close }) => {
  const [display2, setDisplay2] = useState(0);
  const [display3, setDisplay3] = useState(0);
  const [display4, setDisplay4] = useState(0);
  const [display5, setDisplay5] = useState(0);
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    title: "",
    destination: "",
    dayTemp: "",
    nightTemp: "",
    highlightTitle: "",
    pt1: "",
    pt2: "",
    pt3: "",
    pt4: "",
    pt5: "",
    overviewTitle: "",
    overviewLocation: "",
    checkIn: "",
    checkOut: "",
    overviewDesc: "",
    itineraryTitle1: "",
    itinerarySub1: "",
    itineraryLocation1: "",
    itineraryDetails1: "",
    itineraryTitle2: "",
    itinerarySub2: "",
    itineraryLocation2: "",
    itineraryDetails2: "",
    itineraryTitle3: "",
    itinerarySub3: "",
    itineraryLocation3: "",
    itineraryDetails3: "",
    itineraryTitle4: "",
    itinerarySub4: "",
    itineraryLocation4: "",
    itineraryDetails4: "",
    itineraryTitle5: "",
    itinerarySub5: "",
    itineraryLocation5: "",
    itineraryDetails5: "",
    discountPrice: "",
    actualPrice: "",
    offPercentage: "",
    testimonies: "",
  });

  const defaultBtn = () => {
    const defaultBtn = document.querySelector("#choose-input");
    defaultBtn.click();
  };
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
    console.log(images);
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    const formData = {
      title: details.title,
      destination: details.destination.toLowerCase(),
      testimonies: details.testimonies,
      dayTemp: details.dayTemp,
      nightTemp: details.nightTemp,
      hightlights: {
        title: details.highlightTitle,
        data: [details.pt1, details.pt2, details.pt3, details.pt4, details.pt5],
      },
      overview: {
        checkIn: details.checkIn,
        checkOut: details.checkOut,
        desc: details.overviewDesc,
        title: details.overviewTitle,
        location: details.overviewLocation,
      },
      price: {
        discountPrice: details.discountPrice,
        actualPrice: details.actualPrice,
        offPercentage: details.offPercentage,
      },
      itinerary: [
        {
          title: details.itineraryTitle1,
          subtitle: details.itinerarySub1,
          location: details.itineraryLocation1,
          details: details.itineraryDetails1,
        },
        {
          title: details.itineraryTitle2,
          subtitle: details.itinerarySub2,
          location: details.itineraryLocation2,
          details: details.itineraryDetails2,
        },
        {
          title: details.itineraryTitle3,
          subtitle: details.itinerarySub3,
          location: details.itineraryLocation3,
          details: details.itineraryDetails3,
        },
        {
          title: details.itineraryTitle4,
          subtitle: details.itinerarySub4,
          location: details.itineraryLocation4,
          details: details.itineraryDetails4,
        },
        {
          title: details.itineraryTitle5,
          subtitle: details.itinerarySub5,
          location: details.itineraryLocation5,
          details: details.itineraryDetails5,
        },
      ],
    };
    await addDoc(collection(db, "tours"), formData);
    close();
    window.location.reload();
  };

  return (
    <div className="new-tour">
      <div className="add-tour-card">
        <div className="add-card-top">
          <h2>Add New Tour</h2>
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
              <p style={{ fontWeight: "600" }}>Title:</p>
              <input
                type="text"
                class="form__input add-input"
                id="tourTitle"
                name="title"
                onChange={handleChange}
                placeholder="Tour's title"
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Destination:</p>
              <input
                type="text"
                class="form__input add-input"
                id="destination"
                name="destination"
                onChange={handleChange}
                placeholder="Tour's destination"
                required
              ></input>
            </div>
            <div className="add-group sub-category">
              <div>
                <p style={{ fontWeight: "600" }}>Day Temperature:</p>
                <input
                  type="text"
                  name="dayTemp"
                  class="form__input add-input"
                  id="category"
                  onChange={handleChange}
                  placeholder="4°"
                  required
                ></input>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Night Temperature:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  name="nightTemp"
                  id="subCategory"
                  onChange={handleChange}
                  placeholder="5°"
                  required
                ></input>
              </div>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Highlights:</p>
              <input
                type="text"
                class="form__input add-input"
                id="highlightTitle"
                name="highlightTitle"
                onChange={handleChange}
                placeholder="Highlights title"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="pt1"
                name="pt1"
                onChange={handleChange}
                placeholder="Point 1"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="pt2"
                name="pt2"
                onChange={handleChange}
                placeholder="Point 2"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="pt3"
                name="pt3"
                onChange={handleChange}
                placeholder="Point 3"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="pt4"
                name="pt4"
                onChange={handleChange}
                placeholder="Point 4"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="pt5"
                name="pt5"
                onChange={handleChange}
                placeholder="Point 5"
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Overview:</p>
              <input
                type="text"
                class="form__input add-input"
                id="overviewTitle"
                name="overviewTitle"
                onChange={handleChange}
                placeholder="Overview Title"
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="overviewLocation"
                name="overviewLocation"
                onChange={handleChange}
                placeholder="Overview Location"
                required
              ></input>
            </div>
            <div className="add-group sub-category">
              <div>
                <p style={{ fontWeight: "600" }}>Check-In:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="checkIn"
                  name="checkIn"
                  onChange={handleChange}
                  placeholder="02:00 PM"
                  required
                ></input>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Check-out:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="checkOut"
                  name="checkOut"
                  onChange={handleChange}
                  placeholder="02:00 PM"
                  required
                ></input>
              </div>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Overview Description:</p>
              <textarea
                type="text"
                class="form__input add-input"
                id="overviewDesc"
                name="overviewDesc"
                onChange={handleChange}
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="add-itinerary-container">
              <div className="add-group">
                <p style={{ fontWeight: "600" }}>Itinerary 1:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="itineraryTitle1"
                  name="itineraryTitle1"
                  onChange={handleChange}
                  placeholder="Title"
                  required
                ></input>
              </div>
              <div className="add-group">
                <input
                  type="text"
                  class="form__input add-input"
                  id="sub1"
                  name="itinerarySub1"
                  onChange={handleChange}
                  placeholder="Sub-title"
                  required
                ></input>
              </div>
              <div className="add-group">
                <input
                  type="text"
                  class="form__input add-input"
                  id="itiLocation"
                  name="itineraryLocation1"
                  onChange={handleChange}
                  placeholder="Location"
                  required
                ></input>
              </div>
              <div className="add-group">
                <input
                  type="text"
                  class="form__input add-input"
                  id="itiDetails"
                  name="itineraryDetails1"
                  onChange={handleChange}
                  placeholder="Details"
                  required
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "350px",
                  justifyContent: "center",
                  marginTop: "8px",
                }}
              >
                {step === 1 ? (
                  <AiOutlinePlusCircle
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => {
                      setStep(2);
                      setDisplay2(1);
                    }}
                    id="add-reveal"
                  />
                ) : null}
              </div>
            </div>
            {display2 ? (
              <div className="add-itinerary-container">
                <div className="add-group">
                  <p style={{ fontWeight: "600" }}>Itinerary 2:</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle2"
                    name="itineraryTitle2"
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle2"
                    name="itinerarySub2"
                    onChange={handleChange}
                    placeholder="Sub-title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryLocation2"
                    name="itineraryLocation2"
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryDetails2"
                    name="itineraryDetails2"
                    onChange={handleChange}
                    placeholder="Details"
                    required
                  ></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "350px",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  {step === 2 ? (
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => {
                        setStep(3);
                        setDisplay3(1);
                      }}
                      id="add-reveal"
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            {display3 ? (
              <div className="add-itinerary-container">
                <div className="add-group">
                  <p style={{ fontWeight: "600" }}>Itinerary 3:</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle3"
                    name="itineraryTitle3"
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itinerarySub3"
                    name="itinerarySub3"
                    onChange={handleChange}
                    placeholder="Sub-title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryLocation3"
                    name="itineraryLocation3"
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryDetails3"
                    name="itineraryDetails3"
                    onChange={handleChange}
                    placeholder="Details"
                    required
                  ></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "350px",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  {step === 3 ? (
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => {
                        setStep(4);
                        setDisplay4(1);
                      }}
                      id="add-reveal"
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            {display4 ? (
              <div className="add-itinerary-container">
                <div className="add-group">
                  <p style={{ fontWeight: "600" }}>Itinerary 4:</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle4"
                    name="itineraryTitle4"
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itinerarySub4"
                    name="itinerarySub4"
                    onChange={handleChange}
                    placeholder="Sub-title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryLocation4"
                    name="itineraryLocation4"
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryDetails4"
                    name="itineraryDetails4"
                    onChange={handleChange}
                    placeholder="Details"
                    required
                  ></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "350px",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  {step === 4 ? (
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => {
                        setStep(5);
                        setDisplay5(1);
                      }}
                      id="add-reveal"
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            {display5 ? (
              <div className="add-itinerary-container">
                <div className="add-group">
                  <p style={{ fontWeight: "600" }}>Itinerary 5:</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle5"
                    name="itineraryTitle5"
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itinerarySub5"
                    name="itinerarySub5"
                    onChange={handleChange}
                    placeholder="Sub-title"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryLocation5"
                    name="itineraryLocation5"
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryDetails5"
                    name="itineraryDetails5"
                    onChange={handleChange}
                    placeholder="Details"
                    required
                  ></input>
                </div>
              </div>
            ) : null}
            <div className="add-group sub-category">
              <div>
                <p style={{ fontWeight: "600" }}>Discount Price:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="discountPrice"
                  name="discountPrice"
                  onChange={handleChange}
                  placeholder="5,000"
                  required
                ></input>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Actual Price:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="actualPrice"
                  name="actualPrice"
                  onChange={handleChange}
                  placeholder="8,000"
                  required
                ></input>
              </div>
            </div>
            <div className="add-group sub-category">
              <div>
                <p style={{ fontWeight: "600" }}>Off Percentage:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="offPercentage"
                  name="offPercentage"
                  onChange={handleChange}
                  placeholder="32%"
                  required
                ></input>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Testimonies:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="testimonies"
                  name="testimonies"
                  onChange={handleChange}
                  placeholder="Youtube link"
                  required
                ></input>
              </div>
            </div>
            <div
              style={{
                width: "350px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-add-tour" onClick={handleSubmit}>
                Add Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
