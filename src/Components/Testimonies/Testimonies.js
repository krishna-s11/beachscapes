import React from "react";
import "./testimonies.css";

const Testimonies = ({ link }) => {
  console.log(link);
  return (
    <div className="testimonies">
      <div className="details-title-holder">
        <h1>Testimonies</h1>
      </div>
      {link ? (
        <iframe
          width="420"
          height="315"
          src={link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      ) : (
        <p>No Videos Available.</p>
      )}
    </div>
  );
};

export default Testimonies;
