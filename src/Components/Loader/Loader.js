import React from "react";
import "./loader.css";

const Loader = ({ small }) => {
  return (
    <div className={small ? "loader loader-sm loader-white" : "loader"}></div>
  );
};

export default Loader;
