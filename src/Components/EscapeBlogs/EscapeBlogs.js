import React from "react";
import "./escapeBlogs.css";
import strokeLeft from "../../assets/strokeLeft.svg";
import strokeRight from "../../assets/stroke.svg";
import escapebloglt from "../../assets/escapebloglt.png";
import rightArrow from "../../assets/rightArrow.svg";
import EscapeRight from "../Cards/EscapeRight/EscapeRight";

const EscapeBlogs = () => {
  return (
    <div className="escape-blogs">
      <div className="escape-title-holder">
        <h1>
          <span>
            <img src={strokeLeft} alt="" />
          </span>
          ESCAPE BLOGS
          <span>
            <img src={strokeRight} alt="" />
          </span>
        </h1>
      </div>
      <div className="escape-blogs-card-content">
        <div className="escape-lt">
          <div className="escape-blog-lt">
            <img src={escapebloglt} alt=""></img>
            <h1>
              Revolutionising the travel industry, one partnership at a time
            </h1>
            <p>
              Back in 2017, a seed was sown for Beachscape partnership journey.
              It was with a campaign for GoPro India, which by the way, is still
              going strong. Fast forward to today, this fireball of a team is
              just 3 years old and yet, they have helped Thrillophilia
              collaborate with 50+ fabulous Indian and international brands.
              Some of these partnerships include brands like
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <a>
                Go to Articles
                <span>
                  <img src={rightArrow} alt="" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="escape-rt">
          <EscapeRight />
          <EscapeRight />
        </div>
      </div>
    </div>
  );
};

export default EscapeBlogs;
