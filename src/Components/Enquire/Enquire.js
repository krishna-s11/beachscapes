import React, { useState } from "react";
import "./enquire.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";

const Enquire = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfTravel: "",
    numberOfPeople: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // await addDoc(collection(db, "enquiry"), { ...data });
    // setLoading(false);
    // window.location.reload();
  };

  return (
    <div className="enquire-card">
      <h1>Paradise Island Resort Maldives: Get 29% off</h1>
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Your Email"
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          maxLength={10}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type=""
          name="date"
          id="dateOfTravel"
          onChange={handleChange}
          placeholder="Choose Date of Travel"
        />
        <input
          type="number"
          name="nop"
          id="numberOfPeople"
          onChange={handleChange}
          placeholder="No of people"
        />
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="message"
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="btn-enquire" onClick={handleSubmit}>
        {loading ? (
          <Loader small={true} />
        ) : (
          <p style={{ color: "#fff", marginTop: 0, marginBottom: 0 }}>
            Enquire
          </p>
        )}
      </button>
    </div>
  );
};

export default Enquire;
