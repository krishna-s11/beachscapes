import React from "react";
import "./tourCard.css";
import day from "../../assets/day.svg";
import night from "../../assets/night.svg";
import location from "../../assets/location.svg";
import dining from "../../assets/dining.png";
import liqour from "../../assets/liqour.png";
import ratings from "../../assets/ratings.svg";
import maldives from "../../assets/maldives.jpeg";
import { useNavigate } from "react-router-dom";

const TourCard = ({ image, data }) => {
  let navigate = useNavigate();
  const tour = data.data;
  console.log(tour.hightlights);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="tour-card">
      <img src={maldives} alt="maldives" />
      <div className="mid-section">
        <h1>{tour.title}</h1>
        <ul>
          {tour.hightlights.data.map((data) => {
            return <li>{data}</li>;
          })}
        </ul>
        <div className="tour-info-strip">
          <p className="tour-price">
            <span>₹ </span> {tour.price.discountPrice}
            <span>₹{tour.price.actualPrice}</span>
          </p>
          <div className="temp-info">
            {/* <p class="dayTemp">
              <span>
                <img src={day} alt="day" />
              </span>
              {tour.dayTemp}
            </p>
            <p className="nightTemp">
              <span>
                <img src={night} alt="night" />
              </span>
              {tour.nightTemp}
            </p> */}
          </div>
          <h1 className="tour-loc">
            <span>
              <img src={location} alt="location" />
            </span>
            {capitalizeFirstLetter(tour.destination)}
          </h1>
        </div>
        {/* <div className="amenities">
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liquor" />
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liquor" />
          <img src={dining} alt="dining" />
          <img src={liqour} alt="liquor" />
        </div> */}
      </div>
      <div className="right-section">
        <img src={ratings} alt="ratings" />
        <div className="tags-container">
          <div className="tag-flex">
            <div className="tag-flex-1">Beach</div>
            <div className="tag-flex-2">Beach</div>
          </div>
          <div className="tags">Relaxing Experience</div>
          <div className="tags">Water Activities</div>
        </div>
        <button
          className="btn-viewMore"
          onClick={() => {
            navigate(`/tour/${data.id}`);
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default TourCard;
