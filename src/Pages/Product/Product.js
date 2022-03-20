import React from "react";
import "./product.css";
import image1 from "../../assets/product1.png";
import image2 from "../../assets/product2.png";
import image3 from "../../assets/product3.png";
import TourTitle from "../../Components/Cards/TourTitle/TourTitle";

const Product = () => {
  return (
    <div className="product-pg">
      <div className="product-cover">
        {/* <img src={image1} alt="cover 1" className="img1" /> */}
        <div
          className="cover-img1"
          style={{ background: `url(${image1})` }}
        ></div>
        <div className="cover-rt">
          <div
            className="cover-img2"
            style={{ background: `url(${image2})` }}
          ></div>
          <div
            className="cover-img3"
            style={{ background: `url(${image3})` }}
          ></div>
        </div>
      </div>
      <div className="product-content">
        <div className="content-left">
          <TourTitle />
          <div className="tour-details">
            <div className="details-title-holder">
              <h1>Island Resort Maldives Highlights</h1>
            </div>
            <ul>
              <li>
                Luxurious stay in comfortable, aesthetically designed and fully
                sanitized villas with the mesmerizing view to the beach and the
                ocean
              </li>
              <li>
                Rejuvante at "Araamu Spa" in Paradise Island Resort in a choice
                of relaxing treatments for a truly tranquil setting at this
                resort
              </li>
              <li>
                Enjoy Honeymoon Freebies like tropical fruit basket on arrival,
                bed decoration, special candlelight dinner with a bottle of wine
                with this limited period offer.
              </li>
              <li>
                Relish scrumptious maldivan meals at LAGOON Restaurant perfectly
                capturing pleasing view of the blue sea and colorful sky.
              </li>
              <li>
                Indulge in an adrenaline-fuelled experience of a lifetime by
                exploring the water sport activities like snorkeling, scuba
                diving, surfing and many more
              </li>
            </ul>
          </div>
          <div className="tour-details">
            <div className="details-title-holder">
              <h1>Island Resort Maldives Overview</h1>
            </div>
            <p>
              <span>Check-in Time: </span>02:00 PM
            </p>
            <p>
              <span>Check-out Time: </span>02:00 PM
            </p>
            <p>
              <span>Location: </span>Lankanfinolhu North, Maldives
            </p>
            <h5>About Paradise Island Resort</h5>
            <p>
              Get ready for a dreamy escape in the beguiling land of enthralling
              beaches and lagoons fringed by a splendid bank of pearl-white
              sand. Explore the beauty of Paradise Island pristine waters
              surrounding the beaches of the island Resort. From oozing your
              stress out and rejuvenating yourself in the self-pampering
              sessions of araamu spa to dining in the freshest Maldivian seafood
              at the Lagoon Restaurant with a pleasing view of the blue sea and
              sky, this tour has got everything you need. Feel audacious enough
              as you indulge in various water sports such as Catamaran sailing,
              wind surfing and canoeing.
            </p>
            <h5>About Paradise Island Resort</h5>
            <p>
              Get ready for a dreamy escape in the beguiling land of enthralling
              beaches and lagoons fringed by a splendid bank of pearl-white
              sand. Explore the beauty of Paradise Island pristine waters
              surrounding the beaches of the island Resort. From oozing your
              stress out and rejuvenating yourself in the self-pampering
              sessions of araamu spa to dining in the freshest Maldivian seafood
              at the Lagoon Restaurant with a pleasing view of the blue sea and
              sky, this tour has got everything you need. Feel audacious enough
              as you indulge in various water sports such as Catamaran sailing,
              wind surfing and canoeing.
            </p>
            <h5>About Paradise Island Resort</h5>
            <p>
              Get ready for a dreamy escape in the beguiling land of enthralling
              beaches and lagoons fringed by a splendid bank of pearl-white
              sand. Explore the beauty of Paradise Island pristine waters
              surrounding the beaches of the island Resort. From oozing your
              stress out and rejuvenating yourself in the self-pampering
              sessions of araamu spa to dining in the freshest Maldivian seafood
              at the Lagoon Restaurant with a pleasing view of the blue sea and
              sky, this tour has got everything you need. Feel audacious enough
              as you indulge in various water sports such as Catamaran sailing,
              wind surfing and canoeing.
            </p>
          </div>
        </div>
        <div className="content-right">
          <div className="price-card">
            <h1>
              ₹<span>5000</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
