import React from "react";
import "./blog.css";
import blog from "../../assets/blog1.png";
import Enquire from "../../Components/Enquire/Enquire";
const Blog = () => {
  return (
    <div className="blog-pg">
      <div className="hero"></div>
      <div className="blog-content">
        <h1 className="blog-title">
          20 Most Beautiful Travel Blogs In 2022 - 20 Most Beautiful Places
        </h1>
        <div className="blog-details">
          <div className="blog-details-lt">
            <h1>1. Island Resort Maldives Overview</h1>
            <img src={blog} alt=""></img>
            <p>
              <span style={{ color: "#FF5D2C" }}>Update 2021: </span> Due to how
              popular this article has become, I have decided to keep this
              article alive and will continue to add more beautiful travel blogs
              as I discover it.
            </p>
            <p>
              2020 has come, maybe not with a bang as a lot of us may have
              hoped, but the world goes on and as such I have decided to extend
              this most beautiful travel blogs list even further with 6 new
              travel blogs to check out, bringing it to 20, a perfect number for
              the 2020 year. Without further ado, let's check out all the
              beautiful travel blogs out there. As some of you may know, I have
              been in the design industry for the past 10 years working as a
              freelance designer in various companies while also running this
              blog. In fact, the majority of my income is mostly from my design
              freelance work over at The Pete Design.
            </p>
            <p>
              I value well-designed products and today, I want to dive down into
              the design of travel blogs and featured the best design travel
              blogs out there that take storytelling to the next level and
              hopefully inspire you to create an awesome travel blog of your
              own.
            </p>
            <p>
              2020 has come, maybe not with a bang as a lot of us may have
              hoped, but the world goes on and as such I have decided to extend
              this most beautiful travel blogs list even further with 6 new
              travel blogs to check out, bringing it to 20, a perfect number for
              the 2020 year. Without further ado, let's check out all the
              beautiful travel blogs out there. As some of you may know, I have
              been in the design industry for the past 10 years working as a
              freelance designer in various companies while also running this
              blog. In fact, the majority of my income is mostly from my design
              freelance work over at The Pete Design.
            </p>
            <p>
              I value well-designed products and today, I want to dive down into
              the design of travel blogs and featured the best design travel
              blogs out there that take storytelling to the next level and
              hopefully inspire you to create an awesome travel blog of your
              own.
            </p>
          </div>
          <div className="blog-details-rt">
            <Enquire />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
