import React from "react";
import "./blogCard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <div
      className="blog-card"
      onClick={() => {
        navigate(`/blog/${data.id}`);
      }}
    >
      <img
        src={
          data.data.imgLink
            ? data.data.imgLink[1]
            : "https://picsum.photos/380/190"
        }
        alt={data.data.para1}
      ></img>
      <div className="hr"></div>
      <div className="blog-card-content">
        <h1>{data.data.heading}</h1>
        <p>{data.data.para1}</p>
      </div>
    </div>
  );
};

export default BlogCard;
