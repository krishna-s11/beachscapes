import React from "react";
import "./carouselCard.css";
import { useNavigate } from "react-router-dom";

const CarouselCard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="carousel-card"
      style={{
        background: `linear-gradient(180deg, rgba(57, 84, 100, 0) 50%, #395464 100%),url(${props.img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        navigate(`/tours/${props.text}`);
      }}
    >
      <h1>{props.text}</h1>
    </div>
  );
};

export default CarouselCard;
