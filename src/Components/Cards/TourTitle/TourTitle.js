import React from "react";
import "./tourTitle.css";
import location from "../../../assets/location.svg";
import day from "../../../assets/day.svg";
import night from "../../../assets/night.svg";
import dining from "../../../assets/dining.png";
import liqour from "../../../assets/liqour.png";
import ratings from "../../../assets/ratings.svg";

const TourTitle = ({ data }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="tour-title-card">
      <h1>{data.title}</h1>
      <div className="tour-title-info">
        <div className="tour-location">
          <img src={location} alt="location" />
          <p>{capitalizeFirstLetter(data.destination)}</p>
        </div>
        {/* <div className="tour-temp-info">
          <h1>
            <img src={day} alt="day temperature"></img>
            <span
              style={{
                color: "#FF5D2C",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {data.dayTemp}
            </span>
          </h1>
          <div className="hyphen"></div>
          <h1>
            <img src={night} alt="night temperature"></img>
            <span
              style={{
                color: "##17648F",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              {data.nightTemp}
            </span>
          </h1>
        </div> */}
      </div>
      {/* <div className="tour-card-bottom-strip">
        <div className="amenities">
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liqour" />
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liqour" />
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liqour" />
        </div>
        <img src={ratings} alt="ratings"></img>
      </div> */}
    </div>
  );
};

export default TourTitle;
