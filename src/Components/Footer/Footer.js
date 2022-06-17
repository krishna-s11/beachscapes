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
          4th Floor, Plot No. 94 Dwarka Sec-13, Opposite Metro Station Near
          Radisson Blue, New Delhi 110078
        </p>
        <p id="footer-tel">Contact: +91-8802442789 </p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/beachscapes.travel/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram id="insta-ico" className="social-link" />
          </a>
          <FiTwitter
            className="social-link"
            onClick={() => {
              window.open("https://twitter.com/Beachscapes1", "_blank");
            }}
          />
          <BsFacebook
            className="social-link"
            onClick={() => {
              window.open(
                "https://www.facebook.com/Beachscapes-103133545763200",
                "_blank"
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
