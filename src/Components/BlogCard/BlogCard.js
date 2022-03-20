import React from "react";
import "./blogCard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="blog-card"
      onClick={() => {
        navigate("/blog");
      }}
    >
      <img src="https://picsum.photos/380/190"></img>
      <div className="hr"></div>
      <div className="blog-card-content">
        <h1>Best food you can get at Maldives on our Tour pack</h1>
        <p>
          This was my second stay at the Grand Dragon Ladakh. The first time I
          stayed there, it was of January 2016. Both the times I have stayed as
          a blogger, my stay was complimentary. The January 2016 was a group
          trip whereas in October 2021 I was staying alone and doing my own
          things!
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
