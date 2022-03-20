import React, { useState } from "react";
import "./itinerary.css";
import down_arrow from "../../assets/down-arrow.svg";
import location from "../../assets/location.svg";
import image1 from "../../assets/itinerary1.png";
import image2 from "../../assets/itinerary2.png";

const Itinerary = ({ data }) => {
  const [disp, setDisp] = useState(0);
  console.log(data);
  return (
    <div className="itinerary-card">
      <div className="details-title-holder">
        <h1>Itinerary</h1>
      </div>
      <div
        className="itinerary-container"
        onClick={() => {
          setDisp(!disp);
        }}
      >
        <div className="it-ct-l">
          <div className="capsule">Day 1</div>
          <p>Port Blair: Arrival and Sightseeing</p>
        </div>
        <img src={down_arrow}></img>
      </div>
      <div
        className="itinerary-content"
        style={!disp ? { display: "none" } : null}
      >
        <p>
          <em>Start an amazing day at Andaman with sightseeing</em>
          <span>
            <img src={location} alt="" />
          </span>
          Maldives
        </p>
        <p>
          On the arrival at Port Blair, expect a warm welcome by our envoy and
          he will escort you to the hotel. After the completion of hassle-free
          check-in formalities and having a delicious breakfast you are all set
          to enjoy the tour at the Cellular jail. Also, enjoy the light and
          sound show which will portray the hardships of our freedom fighters
          during the independence struggle. Stay overnight at the hotel of Port
          Blair.
        </p>
        {/* <div className="itinerary-img-container">
          <img src={image1} alt="" />
          <img src={image2} alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default Itinerary;
