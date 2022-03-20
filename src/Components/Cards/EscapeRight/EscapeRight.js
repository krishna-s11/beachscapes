import React from "react";
import "./escapeRight.css";
import escapeRight from "../../../assets/escapeRight.png";
import rightArrow from "../../../assets/rightArrow.svg";

const EscapeRight = () => {
  return (
    <div className="escape-right">
      <img src={escapeRight} alt=""></img>
      <div>
        <h1>Revolutionising the travel industry, one partnership at a time</h1>
        <p>
          Back in 2017, a seed was sown for Beachscape partnership journey. It
          was with a campaign for GoPro India,{" "}
        </p>
        <div className="link-holder">
          <a>
            Go to Articles
            <span>
              <img src={rightArrow} alt="" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EscapeRight;
