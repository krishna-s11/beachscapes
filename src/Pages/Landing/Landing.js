import React, { useEffect, useState } from "react";
import "./landing.css";
import Slider from "react-slick";
import Cover from "../../Components/Cover/Cover";
import Carousel from "../../Components/Carousel/Carousel";
import EscapeBlogs from "../../Components/EscapeBlogs/EscapeBlogs";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

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

  const [banner, setBanner] = useState();

  useEffect(() => {
    const getBanner2 = async () => {
      const docRef = doc(db, "homepage", "banner2");
      const docSnap = await getDoc(docRef);
      setBanner(docSnap.data());
    };
    getBanner2();
  }, {});

  return (
    <div className="landing-pg">
      <Cover />
      <Carousel />
      <EscapeBlogs />
      <div className="carousel-scroll-banner">
        <Slider {...settings2}>
          {banner?.imgLink.map((img, key) => {
            return <img src={img} alt="advt" className="banner_img" />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Landing;
