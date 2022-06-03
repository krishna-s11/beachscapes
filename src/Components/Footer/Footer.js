import React from "react";
import "./footer.css";
import logo from "../../assets/logoSym.svg";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="" />
        </div>
        <h2 className="logo-title">Beachscapes</h2>
        <p>
          Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
        </p>
        <p id="footer-tel">Contact: +91-9990002234 </p>
        <div className="social-links">
          <BsInstagram id="insta-ico" className="social-link" />
          <FiTwitter className="social-link" />
          <BsFacebook className="social-link" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
