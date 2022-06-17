import React, { useEffect, useState } from "react";
import "./newTour.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { db, storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Loader/Loader";

const NewTour = ({ close, id, resetId }) => {
  const [display2, setDisplay2] = useState(0);
  const [display3, setDisplay3] = useState(0);
  const [display4, setDisplay4] = useState(0);
  const [display5, setDisplay5] = useState(0);
  const [display6, setDisplay6] = useState(0);
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
    itineraryTitle6: "",
    itinerarySub6: "",
    itineraryLocation6: "",
    itineraryDetails6: "",
    discountPrice: "",
    actualPrice: "",
    offPercentage: "",
    testimonies: "",
    vidLink1: "",
    vidLink2: "",
    vidLink3: "",
    vidLink4: "",
    vidLink5: "",
    enqTitle: "",
    service1: "",
    charge1: "",
    service2: "",
    charge2: "",
    service3: "",
    charge3: "",
    service4: "",
    charge4: "",
    service5: "",
    charge5: "",
    service6: "",
    charge6: "",
    service7: "",
    charge7: "",
    service8: "",
    charge8: "",
    service9: "",
    charge9: "",
    service10: "",
    charge10: "",
  });

  const [itineraryFields, setItineraryFields] = useState([
    {
      itineraryTitle: "",
      itinerarySubtitle: "",
      itineraryLocation: "",
      itineraryDetails: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState();
  const [destinations, setDestinations] = useState();
  const [destinations2, setDestinations2] = useState();

  const defaultBtn = () => {
    const defaultBtn = document.querySelector("#choose-input");
    defaultBtn.click();
  };
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    for (var i = 0; i < Object.keys(e.target.files).length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeItinerary = (index, event) => {
    const values = [...itineraryFields];
    values[index][event.target.name] = event.target.value;
    setItineraryFields(values);
  };
  console.log(itineraryFields);

  const handleAddEvent = () => {
    setItineraryFields([
      ...itineraryFields,
      {
        itineraryTitle: "",
        itinerarySubtitle: "",
        itineraryLocation: "",
        itineraryDetails: "",
      },
    ]);
  };

  const handleRemoveEvent = (index) => {
    const values = [...itineraryFields];
    values.splice(index, 1);
    setItineraryFields(values);
  };

  const handleSubmit = async () => {
    setLoading(true);
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
      // itinerary: [
      //   {
      //     title: details.itineraryTitle1,
      //     subtitle: details.itinerarySub1,
      //     location: details.itineraryLocation1,
      //     details: details.itineraryDetails1,
      //   },
      //   {
      //     title: details.itineraryTitle2,
      //     subtitle: details.itinerarySub2,
      //     location: details.itineraryLocation2,
      //     details: details.itineraryDetails2,
      //   },
      //   {
      //     title: details.itineraryTitle3,
      //     subtitle: details.itinerarySub3,
      //     location: details.itineraryLocation3,
      //     details: details.itineraryDetails3,
      //   },
      //   {
      //     title: details.itineraryTitle4,
      //     subtitle: details.itinerarySub4,
      //     location: details.itineraryLocation4,
      //     details: details.itineraryDetails4,
      //   },
      //   {
      //     title: details.itineraryTitle5,
      //     subtitle: details.itinerarySub5,
      //     location: details.itineraryLocation5,
      //     details: details.itineraryDetails5,
      //   },
      //   {
      //     title: details.itineraryTitle6,
      //     subtitle: details.itinerarySub6,
      //     location: details.itineraryLocation6,
      //     details: details.itineraryDetails6,
      //   },
      // ],
      videoLinks: [
        details.vidLink1,
        details.vidLink2,
        details.vidLink3,
        details.vidLink4,
        details.vidLink5,
      ],
      enquiryTitle: details.enqTitle,
      services: [
        {
          service: details.service1,
          charge: details.charge1,
        },
        {
          service: details.service2,
          charge: details.charge2,
        },
        {
          service: details.service3,
          charge: details.charge3,
        },
        {
          service: details.service4,
          charge: details.charge4,
        },
        {
          service: details.service5,
          charge: details.charge5,
        },
        {
          service: details.service6,
          charge: details.charge6,
        },
        {
          service: details.service7,
          charge: details.charge7,
        },
        {
          service: details.service8,
          charge: details.charge8,
        },
        {
          service: details.service9,
          charge: details.charge9,
        },
        {
          service: details.service10,
          charge: details.charge10,
        },
      ],
    };
    console.log(formData);
    if (id) {
      let imgLink = [];
      imgLink = await Promise.all(
        images?.map(async (image, key) => {
          const storageRef = ref(storage, `tours/${id}/${key}`);
          await uploadBytes(storageRef, image).then((snapshot) => {
            console.log("uploaded");
          });
          const downloadUrl = await getDownloadURL(
            ref(storage, `tours/${id}/${key}`)
          );
          return downloadUrl;
        })
      );
      const docRef = doc(db, "tours", id);
      if (imgLink.length > 0) {
        await updateDoc(docRef, { ...formData, itineraryFields, imgLink });
      } else {
        await updateDoc(docRef, { ...formData, itineraryFields });
      }
    } else {
      let imgLink = [];
      const randomId = uuidv4();
      imgLink = await Promise.all(
        images.map(async (image, key) => {
          const storageRef = ref(storage, `tours/${randomId}/${key}`);
          await uploadBytes(storageRef, image).then((snapshot) => {
            console.log("uploaded");
          });
          const downloadUrl = await getDownloadURL(
            ref(storage, `tours/${randomId}/${key}`)
          );
          return downloadUrl;
        })
      );
      await setDoc(doc(db, "tours", randomId), {
        ...formData,
        itineraryFields,
        imgLink,
      });
    }
    setLoading(false);
    close();
    window.location.reload();
  };

  useEffect(() => {
    if (id) {
      const getTour = async () => {
        const docRef = doc(db, "tours", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTour(docSnap.data());
          const data = docSnap.data();
          console.log(data);
          setDetails({
            ...details,
            title: data.title,
            destination: data.destination,
            dayTemp: data.dayTemp,
            nightTemp: data.nightTemp,
            highlightTitle: data.hightlights.title,
            pt1: data.hightlights.data[0],
            pt2: data.hightlights.data[1],
            pt3: data.hightlights.data[2],
            pt4: data.hightlights.data[3],
            pt5: data.hightlights.data[4],
            overviewTitle: data.overview.title,
            overviewLocation: data.overview.location,
            checkIn: data.overview.checkIn,
            checkOut: data.overview.checkOut,
            overviewDesc: data.overview.desc,
            // itineraryTitle1: data.itinerary[0].title,
            // itinerarySub1: data.itinerary[0].subtitle,
            // itineraryLocation1: data.itinerary[0].location,
            // itineraryDetails1: data.itinerary[0].details,
            // itineraryTitle2: data.itinerary[1].title,
            // itinerarySub2: data.itinerary[1].subtitle,
            // itineraryLocation2: data.itinerary[1].location,
            // itineraryDetails2: data.itinerary[1].details,
            // itineraryTitle3: data.itinerary[2].title,
            // itinerarySub3: data.itinerary[2].subtitle,
            // itineraryLocation3: data.itinerary[2].location,
            // itineraryDetails3: data.itinerary[2].details,
            // itineraryTitle4: data.itinerary[3].title,
            // itinerarySub4: data.itinerary[3].subtitle,
            // itineraryLocation4: data.itinerary[3].location,
            // itineraryDetails4: data.itinerary[3].details,
            // itineraryTitle5: data.itinerary[4].title,
            // itinerarySub5: data.itinerary[4].subtitle,
            // itineraryLocation5: data.itinerary[4].location,
            // itineraryDetails5: data.itinerary[4].details,
            // itineraryTitle6: data.itinerary[5].title,
            // itinerarySub6: data.itinerary[5].subtitle,
            // itineraryLocation6: data.itinerary[5].location,
            // itineraryDetails6: data.itinerary[5].details,
            discountPrice: data.price.discountPrice,
            actualPrice: data.price.actualPrice,
            offPercentage: data.price.offPercentage,
            testimonies: data.testimonies,
            vidLink1: data.videoLinks[0],
            vidLink2: data.videoLinks[1],
            vidLink3: data.videoLinks[2],
            vidLink4: data.videoLinks[3],
            vidLink5: data.videoLinks[4],
            enqTitle: data.enquiryTitle,
            service1: data.services[0].service,
            charge1: data.services[0].charge,
            service2: data.services[1].service,
            charge2: data.services[1].charge,
            service3: data.services[2].service,
            charge3: data.services[2].charge,
            service4: data.services[3].service,
            charge4: data.services[3].charge,
            service5: data.services[4].service,
            charge5: data.services[4].charge,
            service6: data.services[5].service,
            charge6: data.services[5].charge,
            service7: data.services[6].service,
            charge7: data.services[6].charge,
            service8: data.services[7].service,
            charge8: data.services[7].charge,
            service9: data.services[8].service,
            charge9: data.services[8].charge,
            service10: data.services[9].service,
            charge10: data.services[9].charge,
          });
        } else {
          console.log("No such document!");
        }
      };
      getTour();
    }
    const getDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      setDestinations(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getDestinations();
    const getDestinations2 = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations2"));
      setDestinations2(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getDestinations2();
  }, []);

  console.log(details);

  return (
    <div className="new-tour">
      <div className="add-tour-card">
        <div className="add-card-top">
          <h2>Add New Tour</h2>
          <AiOutlineClose
            id="btn-close"
            onClick={() => {
              close();
              resetId();
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
                defaultValue={tour ? tour.title : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Destination:</p>
              <select
                name="destination"
                id="destination"
                onChange={handleChange}
              >
                {destinations?.map((destination) => {
                  return (
                    <option value={destination.data.destinations}>
                      {destination.data.destinations}
                    </option>
                  );
                })}
                {destinations2?.map((destination) => {
                  return (
                    <option value={destination.data.destinations}>
                      {destination.data.destinations}
                    </option>
                  );
                })}
              </select>
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
                  defaultValue={tour ? tour.dayTemp : null}
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
                  defaultValue={tour ? tour.nightTemp : null}
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
                defaultValue={tour ? tour.hightlights.title : null}
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
                defaultValue={tour ? tour.hightlights.data[0] : null}
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
                defaultValue={tour ? tour.hightlights.data[1] : null}
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
                defaultValue={tour ? tour.hightlights.data[2] : null}
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
                defaultValue={tour ? tour.hightlights.data[3] : null}
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
                defaultValue={tour ? tour.hightlights.data[4] : null}
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
                defaultValue={tour ? tour.overview.title : null}
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
                defaultValue={tour ? tour.overview.location : null}
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
                  defaultValue={tour ? tour.overview.checkIn : null}
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
                  defaultValue={tour ? tour.overview.checkOut : null}
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
                defaultValue={tour ? tour.overview.desc : null}
                required
              ></textarea>
            </div>
            {/* <div className="add-itinerary-container">
              <div className="add-group">
                <p style={{ fontWeight: "600" }}>Itinerary 1:</p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="itineraryTitle1"
                  name="itineraryTitle1"
                  onChange={handleChange}
                  placeholder="Title"
                  defaultValue={tour ? tour.itinerary[0].title : null}
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
                  defaultValue={tour ? tour.itinerary[0].subtitle : null}
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
                  defaultValue={tour ? tour.itinerary[0].location : null}
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
                  defaultValue={tour ? tour.itinerary[0].details : null}
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
                    defaultValue={tour ? tour.itinerary[1].title : null}
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
                    defaultValue={tour ? tour.itinerary[1].subtitle : null}
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
                    defaultValue={tour ? tour.itinerary[1].location : null}
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
                    defaultValue={tour ? tour.itinerary[1].details : null}
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
                    defaultValue={tour ? tour.itinerary[2].title : null}
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
                    defaultValue={tour ? tour.itinerary[2].subtitle : null}
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
                    defaultValue={tour ? tour.itinerary[2].location : null}
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
                    defaultValue={tour ? tour.itinerary[2].details : null}
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
                    defaultValue={tour ? tour.itinerary[3].title : null}
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
                    defaultValue={tour ? tour.itinerary[3].subtitle : null}
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
                    defaultValue={tour ? tour.itinerary[3].location : null}
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
                    defaultValue={tour ? tour.itinerary[3].details : null}
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
                    defaultValue={tour ? tour.itinerary[4].title : null}
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
                    defaultValue={tour ? tour.itinerary[4].subtitle : null}
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
                    defaultValue={tour ? tour.itinerary[4].location : null}
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
                    defaultValue={tour ? tour.itinerary[4].details : null}
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
                  {step === 5 ? (
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => {
                        setStep(6);
                        setDisplay6(1);
                      }}
                      id="add-reveal"
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            {display6 ? (
              <div className="add-itinerary-container">
                <div className="add-group">
                  <p style={{ fontWeight: "600" }}>Itinerary 6:</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryTitle6"
                    name="itineraryTitle6"
                    onChange={handleChange}
                    placeholder="Title"
                    defaultValue={tour ? tour.itinerary[4].title : null}
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itinerarySub6"
                    name="itinerarySub6"
                    onChange={handleChange}
                    placeholder="Sub-title"
                    defaultValue={tour ? tour.itinerary[4].subtitle : null}
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryLocation6"
                    name="itineraryLocation6"
                    onChange={handleChange}
                    placeholder="Location"
                    defaultValue={tour ? tour.itinerary[4].location : null}
                    required
                  ></input>
                </div>
                <div className="add-group">
                  <input
                    type="text"
                    class="form__input add-input"
                    id="itineraryDetails6"
                    name="itineraryDetails6"
                    onChange={handleChange}
                    placeholder="Details"
                    defaultValue={tour ? tour.itinerary[4].details : null}
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
                  {step === 6 ? (
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={() => {
                        setStep(7);
                        // setDisplay6(1);
                      }}
                      id="add-reveal"
                    />
                  ) : null}
                </div>
              </div>
            ) : null} */}
            {itineraryFields.map((itineraryField, index) => (
              <div key={index}>
                <div className="add-itinerary-container">
                  <div className="add-group">
                    <p style={{ fontWeight: "600" }}>Itinerary {index + 1}:</p>
                    {/* itineraryTitle: "",
                    itinerarySubtitle: "",
                    itineraryLocation: "",
                    itineraryDetails: "", */}
                    <input
                      type="text"
                      class="form__input add-input"
                      id="itineraryTitle"
                      name="itineraryTitle"
                      onChange={(event) => {
                        handleChangeItinerary(index, event);
                      }}
                      placeholder="Title"
                      defaultValue={tour ? tour.itinerary[4].title : null}
                      required
                    ></input>
                  </div>
                  <div className="add-group">
                    <input
                      type="text"
                      class="form__input add-input"
                      id="itinerarySub"
                      name="itinerarySubtitle"
                      onChange={(event) => {
                        handleChangeItinerary(index, event);
                      }}
                      placeholder="Sub-title"
                      defaultValue={tour ? tour.itinerary[4].subtitle : null}
                      required
                    ></input>
                  </div>
                  <div className="add-group">
                    <input
                      type="text"
                      class="form__input add-input"
                      id="itineraryLocation"
                      name="itineraryLocation"
                      onChange={(event) => {
                        handleChangeItinerary(index, event);
                      }}
                      placeholder="Location"
                      defaultValue={tour ? tour.itinerary[4].location : null}
                      required
                    ></input>
                  </div>
                  <div className="add-group">
                    <input
                      type="text"
                      class="form__input add-input"
                      id="itineraryDetails"
                      name="itineraryDetails"
                      onChange={(event) => {
                        handleChangeItinerary(index, event);
                      }}
                      placeholder="Details"
                      defaultValue={tour ? tour.itinerary[4].details : null}
                      required
                    ></input>
                  </div>
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <AiOutlinePlusCircle
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      onClick={handleAddEvent}
                      id="add-reveal"
                    />
                    {index > 0 ? (
                      <AiOutlineMinusCircle
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => {
                          handleRemoveEvent(index);
                        }}
                        id="add-reveal"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
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
                  defaultValue={tour ? tour.price.discountPrice : null}
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
                  defaultValue={tour ? tour.price.actualPrice : null}
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
                  defaultValue={tour ? tour.price.offPercentage : null}
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
                  defaultValue={tour ? tour.testimonies : null}
                  required
                ></input>
              </div>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Video Links:</p>
              <input
                type="text"
                class="form__input add-input"
                id="vidLink1"
                name="vidLink1"
                onChange={handleChange}
                placeholder="Video Link 1"
                defaultValue={tour ? tour.videoLinks[0] : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="vidLink2"
                name="vidLink2"
                onChange={handleChange}
                placeholder="Video Link 2"
                defaultValue={tour ? tour.videoLinks[1] : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="vidLink3"
                name="vidLink3"
                onChange={handleChange}
                placeholder="Video Link 3"
                defaultValue={tour ? tour.videoLinks[2] : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="vidLink4"
                name="vidLink4"
                onChange={handleChange}
                placeholder="Video Link 4"
                defaultValue={tour ? tour.videoLinks[3] : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="vidLink5"
                name="vidLink5"
                onChange={handleChange}
                placeholder="Video Link 5"
                defaultValue={tour ? tour.videoLinks[4] : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <p style={{ fontWeight: "600" }}>Enquiry Card:</p>
              <input
                type="text"
                class="form__input add-input"
                id="enqTitle"
                name="enqTitle"
                onChange={handleChange}
                placeholder="Title for Enquiry Card"
                defaultValue={tour ? tour.enquiryTitle : null}
                required
              ></input>
            </div>
            {/* <div className="add-group">
              <p style={{ fontWeight: "600" }}>Why Escape With Us:</p>
              <input
                type="text"
                class="form__input add-input"
                id="whyTitle1"
                name="whyTitle1"
                onChange={handleChange}
                placeholder="Point 1 Title"
                // defaultValue={tour ? tour.enquiryTitle : null}
                required
              ></input>
            </div>
            <div className="add-group">
              <input
                type="text"
                class="form__input add-input"
                id="whyPt1"
                name="whyPt1"
                onChange={handleChange}
                placeholder="Point 1"
                defaultValue={tour ? tour.videoLinks[3] : null}
                required
              ></input>
            </div> */}
            <div className="services">
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service1"
                    name="service1"
                    onChange={handleChange}
                    placeholder="service 1"
                    defaultValue={tour ? tour.services[0].service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge1"
                    name="charge1"
                    onChange={handleChange}
                    placeholder="charge 1"
                    defaultValue={tour ? tour.services[0].charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service2"
                    name="service2"
                    onChange={handleChange}
                    placeholder="service 2"
                    defaultValue={tour ? tour.services[1]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge2"
                    name="charge2"
                    onChange={handleChange}
                    placeholder="charge 2"
                    defaultValue={tour ? tour.services[1]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service3"
                    name="service3"
                    onChange={handleChange}
                    placeholder="service 3"
                    defaultValue={tour ? tour.services[2]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge3"
                    name="charge3"
                    onChange={handleChange}
                    placeholder="charge 3"
                    defaultValue={tour ? tour.services[2]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service4"
                    name="service4"
                    onChange={handleChange}
                    placeholder="service 4"
                    defaultValue={tour ? tour.services[3]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge4"
                    name="charge4"
                    onChange={handleChange}
                    placeholder="charge 4"
                    defaultValue={tour ? tour.services[3]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service5"
                    name="service5"
                    onChange={handleChange}
                    placeholder="service 5"
                    defaultValue={tour ? tour.services[4]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge5"
                    name="charge5"
                    onChange={handleChange}
                    placeholder="charge 5"
                    defaultValue={tour ? tour.services[4]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service6"
                    name="service6"
                    onChange={handleChange}
                    placeholder="service 6"
                    defaultValue={tour ? tour.services[5]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge6"
                    name="charge6"
                    onChange={handleChange}
                    placeholder="charge 6"
                    defaultValue={tour ? tour.services[5]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service7"
                    name="service7"
                    onChange={handleChange}
                    placeholder="service 7"
                    defaultValue={tour ? tour.services[6]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge7"
                    name="charge7"
                    onChange={handleChange}
                    placeholder="charge 7"
                    defaultValue={tour ? tour.services[6]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service8"
                    name="service8"
                    onChange={handleChange}
                    placeholder="service 8"
                    defaultValue={tour ? tour.services[7]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge8"
                    name="charge8"
                    onChange={handleChange}
                    placeholder="charge 8"
                    defaultValue={tour ? tour.services[7]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service9"
                    name="service9"
                    onChange={handleChange}
                    placeholder="service 9"
                    defaultValue={tour ? tour.services[8]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge9"
                    name="charge9"
                    onChange={handleChange}
                    placeholder="charge 9"
                    defaultValue={tour ? tour.services[8]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
              <div className="add-group service-input sub-category">
                <div>
                  <p style={{ fontWeight: "600" }}>Service :</p>
                  <input
                    type="text"
                    class="form__input add-input"
                    id="service10"
                    name="service10"
                    onChange={handleChange}
                    placeholder="service 10"
                    defaultValue={tour ? tour.services[9]?.service : null}
                    required
                  ></input>
                </div>
                <div>
                  <p style={{ fontWeight: "600" }}>Charge:</p>
                  <input
                    type="text"
                    style={{ transform: "translateX(-18px)" }}
                    class="form__input add-input"
                    id="charge10"
                    name="charge10"
                    onChange={handleChange}
                    placeholder="charge 10"
                    defaultValue={tour ? tour.services[9]?.charge : null}
                    required
                  ></input>
                </div>
              </div>
            </div>
            {/* <div className="add-group">
                <p style={{ fontWeight: "600" }}>Fare Break: </p>
                <input
                  type="text"
                  class="form__input add-input"
                  id="fareBreak"
                  name="fareBreak"
                  onChange={handleChange}
                  placeholder=""
                  required
                ></input>
              </div> */}
            <div
              style={{
                width: "350px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-add-tour" onClick={handleSubmit}>
                {loading ? <Loader small /> : id ? "Update Tour" : "Add Tour"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTour;
