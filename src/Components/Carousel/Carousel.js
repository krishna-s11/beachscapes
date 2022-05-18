import React, { useEffect, useState } from "react";
import "./carousel.css";
import stroke from "../../assets/stroke.svg";
import Slider from "react-slick";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import CarouselCard from "../Cards/CarouselCard/CarouselCard";
import bali from "../../assets/bali.png";
import goa from "../../assets/goa.png";
import maldives from "../../assets/malidives.png";
import vergin from "../../assets/vergin.png";
import bora from "../../assets/bora.png";
import CarouselCard2 from "../Cards/CarouselCard2/CarouselCard2";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import TourCardT2 from "../TourCardT2/TourCardT2";

const Carousel = () => {
  const [destinations, setDestinations] = useState([]);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        src={left}
        class={className}
        style={{ ...style, transform: "scale(2) translateX(-20px)" }}
        onClick={onClick}
        alt="left"
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        src={right}
        className={className}
        style={{ ...style, transform: "scale(2) translateX(10px)" }}
        onClick={onClick}
        alt="right"
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    row: 1,
    autoplaySpeed: 2000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const getDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setDestinations(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getDestinations();
    const getBanner1 = async () => {
      const docRef = doc(db, "homepage", "banner1");
      const docSnap = await getDoc(docRef);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-header">
        <h1 className="carousel-title">
          Find the perfect escape
          <span>
            <img src={stroke} alt="stroke"></img>
          </span>
        </h1>
      </div>
      <div className="carousel-scroll">
        <Slider {...settings}>
          {destinations &&
            destinations.map((destination) => {
              return (
                <CarouselCard
                  img={destination.data.downloadUrl}
                  text={destination.data.destinations}
                />
              );
            })}
          {/* <CarouselCard img={bali} text="bali" />
          <CarouselCard img={goa} text="goa" />
          <CarouselCard img={maldives} text="maldives" />
          <CarouselCard img={vergin} text="vergin islands" />
          <CarouselCard img={bora} text="bora bora" />
          <CarouselCard img={maldives} text="bora bora" /> */}
        </Slider>
      </div>
      <div className="carousel-scroll-banner">
        <Slider {...settings2}>
          <div className="banner"></div>
          <div className="banner"></div>
        </Slider>
      </div>
      <div className="carousel-scroll type2">
        <h1>
          Title goes here
          <span>
            <img src={stroke} alt="stroke" />
          </span>
        </h1>
        <Slider {...settings}>
          {/* <TourCardT2 />
          <TourCardT2 />
          <TourCardT2 />
          <TourCardT2 />
          <TourCardT2 />
          <TourCardT2 />
          <TourCardT2 /> */}
          <CarouselCard img={bali} text="bali" />
          <CarouselCard img={goa} text="goa" />
          <CarouselCard img={maldives} text="maldives" />
          <CarouselCard img={vergin} text="vergin islands" />
          <CarouselCard img={bora} text="bora bora" />
          <CarouselCard img={maldives} text="bora bora" />
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
