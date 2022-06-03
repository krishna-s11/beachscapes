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
  const [destinations2, setDestinations2] = useState([]);
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [carouselTitle, setCarouselTitle] = useState();

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
    const getDestinations2 = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations2"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setDestinations2(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getDestinations2();
    const getBanner1 = async () => {
      const docRef = doc(db, "homepage", "banner1");
      const docSnap = await getDoc(docRef);
      setBanner1(docSnap.data());
    };
    getBanner1();
    const getTitle = async () => {
      const docRef = doc(db, "homepage", "CarouselTitle");
      const docSnap = await getDoc(docRef);
      setCarouselTitle(docSnap.data());
    };
    getTitle();
  }, []);

  console.log(banner1);
  console.log(banner2);

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
          {banner1?.imgLink.map((img, key) => {
            return <img src={img} alt="advt" className="banner_img" />;
          })}
        </Slider>
      </div>
      <div className="carousel-scroll type2">
        <h1>
          {carouselTitle ? carouselTitle.title : ""}
          <span>
            <img src={stroke} alt="stroke" />
          </span>
        </h1>
        <Slider {...settings}>
          {destinations2 &&
            destinations2.map((destination) => {
              return (
                <CarouselCard
                  img={destination.data.downloadUrl}
                  text={destination.data.destinations}
                />
              );
            })}
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
