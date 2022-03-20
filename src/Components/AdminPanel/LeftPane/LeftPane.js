import React, { useState } from "react";
import "./leftPane.css";
import home from "../../../assets/home.png";
import destination from "../../../assets/destination.png";
import tours from "../../../assets/tour-bus.png";
import leads from "../../../assets/prospect.png";
import { useNavigate } from "react-router-dom";

const LeftPane = () => {
  const [filter, setFilter] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="left_pane">
      <div className="logo_container">
        <h3>Beachscapes </h3>
      </div>
      <ul className="left_pane_items">
        <li
          onClick={() => {
            setFilter(0);
          }}
          style={{ backgroundColor: filter === 0 ? "#2e538a" : null }}
        >
          <span>
            <img alt="" src={home}></img>
          </span>
          Homepage
        </li>
        <li
          onClick={() => {
            setFilter(1);
            navigate("/admin/dashboard/destinations");
          }}
          style={{ backgroundColor: filter === 1 ? "#2e538a" : null }}
        >
          <span>
            <img alt="" src={destination}></img>
          </span>
          Destinations
        </li>
        <li
          onClick={() => {
            setFilter(2);
            navigate("/admin/dashboard/tours");
          }}
          style={{ backgroundColor: filter === 2 ? "#2e538a" : null }}
        >
          <span>
            <img alt="" src={tours}></img>
          </span>
          Tours
        </li>
        <li
          onClick={() => {
            setFilter(3);
            navigate("/admin/dashboard/leads");
          }}
          style={{ backgroundColor: filter === 3 ? "#2e538a" : null }}
        >
          <span>
            <img alt="" src={leads}></img>
          </span>
          Leads
        </li>
      </ul>
    </div>
  );
};

export default LeftPane;