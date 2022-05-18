import React, { useEffect, useState } from "react";
import "./product.css";
import image1 from "../../assets/product1.png";
import image2 from "../../assets/product2.png";
import image3 from "../../assets/product3.png";
import image4 from "../../assets/mumbai.jpeg";
import TourTitle from "../../Components/Cards/TourTitle/TourTitle";
import Itinerary from "../../Components/Itinerary/Itinerary";
import Testimonies from "../../Components/Testimonies/Testimonies";
import Enquire from "../../Components/Enquire/Enquire";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Contact from "../Contact/Contact";
import Slider from "react-slick";
import AdditionalVideos from "../../Components/AdditionalVideos/AdditionalVideos";
import PriceDetails from "../../Components/Cards/PriceDetails/PriceDetails";

const Product = () => {
  const { id } = useParams();
  const [tour, setTour] = useState();
  const [contact, setContact] = useState(false);
  const [priceDetails, setPriceDetails] = useState(false);

  useEffect(() => {
    const getTour = async () => {
      const docSnap = await getDoc(doc(db, "tours", id));
      if (docSnap.exists) {
        setTour(docSnap.data());
      }
    };
    getTour();
  }, [id]);

  console.log(tour);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  if (tour) {
    return (
      <div className="product-new">
        {contact ? (
          <Contact
            name={tour.title}
            close={() => {
              setContact(false);
            }}
          />
        ) : null}
        {priceDetails ? (
          <PriceDetails
            services={tour.services}
            close={() => {
              setPriceDetails(false);
            }}
          />
        ) : null}
        <div className="product-pg-container">
          <div className="pd-nw-lt">
            <div className="cover-container-lt">
              <Slider {...settings}>
                {tour.imgLink.map((img, key) => {
                  return <img src={img} alt={`${tour.title}${key}`} />;
                })}
              </Slider>
            </div>
            <div className="pd-lt-content">
              <TourTitle data={tour} />
              <div className="tour-details">
                <div className="details-title-holder">
                  <h1>{tour.hightlights.title}</h1>
                </div>
                <ul>
                  {tour.hightlights.data.map((data) => {
                    return <li>{data}</li>;
                  })}
                </ul>
              </div>
              <div className="tour-details">
                <div className="details-title-holder">
                  <h1>Hotel Videos & Images</h1>
                </div>
                <div className="additional-videos-holder">
                  <div className="video-container">
                    <iframe
                      width="310px"
                      height="181px"
                      src="https://www.youtube.com/embed/XLlP-_Abd5k"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="video-container">
                    <iframe
                      width="310px"
                      height="181px"
                      src="https://www.youtube.com/embed/XLlP-_Abd5k"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="video-container">
                    <iframe
                      width="310px"
                      height="181px"
                      src="https://www.youtube.com/embed/XLlP-_Abd5k"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="video-container">
                    <iframe
                      width="310px"
                      height="181px"
                      src="https://www.youtube.com/embed/XLlP-_Abd5k"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
              {/* <AdditionalVideos /> */}
              <div className="tour-details">
                <div className="details-title-holder">
                  <h1>{tour.overview.title}</h1>
                </div>
                <p>
                  <span>Check-in Time: </span>
                  {tour.overview.checkIn}
                </p>
                <p>
                  <span>Check-out Time: </span>
                  {tour.overview.checkOut}
                </p>
                <p>
                  <span>Location: </span>
                  {tour.overview.location}
                </p>
                <h5>About {tour.overview.title}</h5>
                <p>{tour.overview.desc}</p>
              </div>
              <Itinerary data={tour} />
            </div>
          </div>
          <div className="pd-nw-rt">
            <div className="cover-container-rt">
              <div className="rt-img1">
                <img src={tour.imgLink[1]} alt="cover1" />
              </div>
              <div className="rt-img2">
                <img src={tour.imgLink[2]} alt="cover1" />
              </div>
            </div>
            <div className="rt-content">
              <div className="card-price">
                <div>
                  <h1>
                    ₹{" "}
                    <span style={{ color: "#FF5D2C" }}>
                      {tour.price.discountPrice}
                    </span>
                    <strike>
                      <span style={{ marginLeft: "10px", fontSize: "18px" }}>
                        ₹ <span>{tour.price.actualPrice}</span>
                      </span>
                    </strike>
                  </h1>
                  <p
                    id="fare-break"
                    onClick={() => {
                      setPriceDetails(true);
                    }}
                  >
                    View Details
                  </p>
                </div>
                <div
                  className="book-now"
                  onClick={() => {
                    setContact(true);
                  }}
                >
                  <div className="booking-offer">
                    {tour.price.offPercentage}% OFF
                  </div>
                  <div className="price">
                    BOOK <br></br> NOW
                  </div>
                </div>
              </div>
              <Testimonies link={tour.testimonies} />
              <Enquire />
              <div className="escape-card">
                <div className="escape-card-title">
                  <p>Why Escape With Us?</p>
                </div>
                <div className="escape-card-content">
                  <h4>Point 1</h4>
                  <p>
                    Get ready for a dreamy escape in the beguiling land of
                    enthralling beaches and lagoons fringed by a splendid bank
                    of pearl-white sand. Explore the beauty
                  </p>
                  <h4>Point 1</h4>
                  <p>
                    Get ready for a dreamy escape in the beguiling land of
                    enthralling beaches and lagoons fringed by a splendid bank
                    of pearl-white sand. Explore the beauty
                  </p>
                  <h4>Point 1</h4>
                  <p>
                    Get ready for a dreamy escape in the beguiling land of
                    enthralling beaches and lagoons fringed by a splendid bank
                    of pearl-white sand. Explore the beauty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Product;
