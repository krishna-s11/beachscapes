import React from "react";
import "./priceDetails.css";
import { AiOutlineClose } from "react-icons/ai";

const PriceDetails = ({ services, close }) => {
  console.log(services);
  return (
    <div className="price-details">
      <div className="price-details-box">
        <AiOutlineClose
          className="btn-close"
          onClick={() => {
            close();
          }}
        />
        <h3>Fare Break</h3>
        <ul>
          {services.map((service) => {
            return (
              <>
                {service.service !== "" ? (
                  <li>
                    {service.service}: <p>₹{service.charge}</p>
                  </li>
                ) : null}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PriceDetails;
