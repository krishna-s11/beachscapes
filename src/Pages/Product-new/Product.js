import React, { useEffect, useState } from "react";
import "./product.css";
import image1 from "../../assets/product1.png";
import image2 from "../../assets/product2.png";
import image3 from "../../assets/product3.png";
import TourTitle from "../../Components/Cards/TourTitle/TourTitle";
import Itinerary from "../../Components/Itinerary/Itinerary";
import Testimonies from "../../Components/Testimonies/Testimonies";
import Enquire from "../../Components/Enquire/Enquire";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Contact from "../Contact/Contact";

const Product = () => {
  const { id } = useParams();
  const [tour, setTour] = useState();
  const [contact, setContact] = useState(false);

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
        <div className="product-pg-container">
          <div className="pd-nw-lt">
            <div className="cover-container-lt">
              <img src={image1} alt="cover1" />
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
                <img src={image2} alt="cover1" />
              </div>
              <div className="rt-img2">
                <img src={image3} alt="cover1" />
              </div>
            </div>
            <div className="rt-content">
              <div className="card-price">
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
