import React from "react";
import "./enquire.css";

const Enquire = () => {
  return (
    <div className="enquire-card">
      <h1>Paradise Island Resort Maldives: Get 29% off</h1>
      <div className="form-group">
        <input type="text" name="name" id="name" placeholder="Your Name" />
        <input type="email" name="email" id="email" placeholder="Your Email" />
        <input type="tel" name="phone" id="phone" placeholder="Phone" />
        <input
          type=""
          name="date"
          id="date"
          placeholder="Choose Date of Travel"
        />
        <input type="number" name="nop" id="nop" placeholder="No of people" />
        <textarea
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="message"
        ></textarea>
      </div>
      <button className="btn-enquire">Enquire</button>
    </div>
  );
};

export default Enquire;
