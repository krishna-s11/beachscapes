import React, { useState } from "react";
import "./itinerary.css";
import down_arrow from "../../assets/down-arrow.svg";
import location from "../../assets/location.svg";
import image1 from "../../assets/itinerary1.png";
import image2 from "../../assets/itinerary2.png";

const Itinerary = ({ data }) => {
  const [disp, setDisp] = useState(0);
  console.log(data.itinerary);
  return (
    <div className="itinerary-card">
      <div className="details-title-holder">
        <h1>Itinerary</h1>
      </div>
      {data.itineraryFields.map((itinerary, key) => {
        return (
          <>
            {itinerary.title !== "" ? (
              <>
                <div
                  className="itinerary-container"
                  onClick={() => {
                    setDisp(!disp);
                  }}
                >
                  <div className="it-ct-l">
                    <div className="capsule">Day {key + 1}</div>
                    <p>{itinerary.itineraryTitle}</p>
                  </div>
                  <img src={down_arrow}></img>
                </div>
                <div
                  className="itinerary-content"
                  style={!disp ? { display: "none" } : null}
                >
                  <p>
                    <em>{itinerary.itinerarySubtitle}</em>
                    <span>
                      <img src={location} alt="" />
                    </span>
                    {itinerary.itineraryLocation}
                  </p>
                  <p>{itinerary.itineraryDetails}</p>
                  {/* <div className="itinerary-img-container">
            <img src={image1} alt="" />
            <img src={image2} alt="" />
          </div> */}
                </div>
              </>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Itinerary;
