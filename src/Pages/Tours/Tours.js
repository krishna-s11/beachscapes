import React, { useEffect, useState } from "react";
import TourCard from "../../Components/TourCard/TourCard";
import "./tours.css";
import image1 from "../../assets/tourimg.jpg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const { destination } = useParams();

  useEffect(() => {
    const getDestTours = async () => {
      const q = query(
        collection(db, "tours"),
        where("destination", "==", destination.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setTours(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };

    const getTours = async () => {
      const querySnapshot = await getDocs(collection(db, "tours"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setTours(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    if (destination) {
      return getDestTours();
    } else {
      getTours();
    }
  }, [destination]);

  console.log(tours, destination);

  return (
    <div className="tours-pg">
      <div className="hero-tours"></div>
      <div className="tours-content">
        <h1 className="tours-title">
          Showing <span>20</span> Tours Packages
        </h1>
        {tours &&
          tours.map((tour) => {
            return <TourCard image={image1} data={tour} />;
          })}
      </div>
    </div>
  );
};

export default Tours;
