import React, { useState } from "react";
import "./contact.css";
import { AiOutlineClose } from "react-icons/ai";
import image1 from "../../assets/contact.png";
import location from "../../assets/location-white.svg";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "emailjs-com";
import Loader from "../../Components/Loader/Loader";

const Contact = ({ close, name }) => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nop: "",
    couponCode: "",
    request: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  function sendEmail(e, templateParams) {
    e.preventDefault();
    emailjs
      .send(
        "service_vttqhtd",
        "template_b3ccuup",
        templateParams,
        "kpcdBkL5dZ-K8sb-4"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    var templateParams = {
      first_name: details.firstName,
      last_name: details.lastName,
      email_id: details.email,
      phone_number: details.phone,
      number_of_people: details.nop,
      coupon_code: details.couponCode,
      any_request: details.request,
    };
    await addDoc(collection(db, "leads"), { ...details, name });
    sendEmail(e, templateParams);
    setLoading(false);
    close();
  };

  return (
    <div className="contact-pg">
      <div className="contact-card">
        <AiOutlineClose
          id="btn-contactClose"
          onClick={() => {
            close();
          }}
        />
        <div className="contact-img-holder">
          <img className="contact-img" src={image1} alt=""></img>
          <div className="contact-img-content">
            <p>You picked</p>
            <p className="contact-tour-name">{name}</p>
            <p>
              <span>
                <img src={location} alt="" />
              </span>
              Maldives
            </p>
          </div>
        </div>
        <div className="contact-rt">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>Contact Form</h2>
          </div>
          <div className="contact-frm">
            <div>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
              ></input>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
              ></input>
            </div>
            <input
              type="email"
              className="emnum"
              name="email"
              onChange={handleChange}
              placeholder="Email ID"
            ></input>
            <input
              type="tel"
              className="emnum"
              name="phone"
              maxLength={10}
              onChange={handleChange}
              placeholder="Phone No"
            ></input>
            <div>
              <input
                type="number"
                name="nop"
                onChange={handleChange}
                placeholder="No. of people"
              ></input>
              <input
                type="text"
                name="couponCode"
                onChange={handleChange}
                placeholder="Coupon Code"
              ></input>
            </div>
            <textarea
              rows="4"
              name="request"
              onChange={handleChange}
              placeholder="Any request"
            ></textarea>
            <button onClick={handleSubmit}>
              {loading ? <Loader small /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
