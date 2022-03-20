import React from "react";
import "./topNav.css";
import { GiHamburgerMenu } from "react-icons/gi";

const TopNav = () => {
  return (
    <div className="top_nav">
      <div className="ham-container">
        <GiHamburgerMenu />
      </div>
    </div>
  );
};

export default TopNav;
