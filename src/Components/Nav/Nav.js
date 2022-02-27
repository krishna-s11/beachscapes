import React from "react";
import "./nav.css";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import ham from "../../assets/ham.svg";

const Nav = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="beachscapes" />
      <div className="nav-rt-box">
        <div className="search-box">
          <input
            type="text"
            name="search"
            id="input-search"
            placeholder="search..."
          />
          <img src={search} alt="search-box" id="search-icon" />
        </div>
        <img src={ham} alt="menu" id="hamburger" />
      </div>
    </div>
  );
};

export default Nav;
