import React, { useState } from "react";
import "./nav.css";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import ham from "../../assets/ham.svg";
import { useNavigate } from "react-router-dom";
import ourPackage from "../../assets/ourPackages.svg";
import blogs from "../../assets/blogs.svg";
import aboutUs from "../../assets/aboutUs.svg";
import contactUs from "../../assets/contactUs.svg";
import Contact from "../../Pages/Contact/Contact";

const Nav = (props) => {
  let navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handleHam = () => {
    document.getElementById("menu").classList.toggle("menu-open");
  };

  return (
    <div className="navbar" style={{ background: props.colour }}>
      {popup ? (
        <Contact
          enquire
          close={() => {
            setPopup(false);
          }}
        />
      ) : null}
      <img
        src={logo}
        alt="beachscapes"
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      />
      <div className="nav-rt-box">
        {/* <div className="search-box">
          <input
            type="text"
            name="search"
            id="input-search"
            placeholder="search..."
          />
          <img src={search} alt="search-box" id="search-icon" />
        </div> */}
        <img src={ham} alt="menu" id="hamburger" onClick={handleHam} />
        <div className="menu" id="menu">
          <ul>
            <li>
              <span>
                <img src={aboutUs} alt="about beachscapes" id="about"></img>
              </span>
              Home
            </li>
            <li
              onClick={() => {
                navigate("/tours");
                handleHam();
              }}
            >
              <span>
                <img src={ourPackage} alt="famous tour packages"></img>
              </span>
              Our Packages
            </li>
            <li
              onClick={() => {
                navigate("/blogs");
                handleHam();
              }}
            >
              <span>
                <img src={blogs} alt="tour blogs" id="blog"></img>
              </span>
              Blogs
            </li>
            <li
              onClick={() => {
                setPopup(true);
                handleHam();
              }}
            >
              <span>
                <img
                  src={contactUs}
                  alt="contact us beachscapes"
                  id="contact"
                ></img>
              </span>
              Contact Us
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
