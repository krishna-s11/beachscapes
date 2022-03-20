import React from "react";
import "./landing.css";
import Slider from "react-slick";
import Cover from "../../Components/Cover/Cover";
import Carousel from "../../Components/Carousel/Carousel";
import EscapeBlogs from "../../Components/EscapeBlogs/EscapeBlogs";

const Landing = () => {
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="landing-pg">
      <Cover />
      <Carousel />
      <EscapeBlogs />
      <div className="carousel-scroll-banner">
        <Slider {...settings2}>
          <div className="banner"></div>
          <div className="banner"></div>
        </Slider>
      </div>
    </div>
  );
};

export default Landing;
