import React from "react";
import "./blogs.css";
import stroke from "../../assets/stroke.svg";
import BlogCard from "../../Components/BlogCard/BlogCard";

const Blogs = () => {
  return (
    <div className="blogs-pg">
      <div className="hero"></div>
      <div className="blogs-content">
        <h1 className="blogs-title">
          Our Blogs{" "}
          <span>
            <img src={stroke} alt="" />
          </span>
        </h1>
        <div className="blogs-container">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
