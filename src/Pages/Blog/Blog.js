import React, { useEffect, useState } from "react";
import "./blog.css";
import blog from "../../assets/blog1.png";
import Enquire from "../../Components/Enquire/Enquire";
import { matchRoutes, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Slider from "react-slick";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getBlog = async () => {
      const docSnap = await getDoc(doc(db, "blogs", id));
      if (docSnap.exists) {
        setData(docSnap.data());
      }
    };
    getBlog();
  }, [id]);

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

  return (
    <div className="blog-pg">
      <div className="hero"></div>
      <div className="blog-content">
        <h1 className="blog-title">{data?.heading}</h1>
        <div className="blog-details">
          <div className="blog-details-lt">
            <h1>1. {data?.title}</h1>
            {/* <img src={blog} alt=""></img> */}
            <Slider {...settings}>
              {data?.imgLink.map((img, key) => {
                return <img src={img} alt={`${data.title}${key}`} />;
              })}
            </Slider>
            <div style={{ marginTop: "50px" }}>
              <h2>{data?.paraTitle1}</h2>
              <p>{data?.para1}</p>
            </div>
            <div>
              <h2>{data?.paraTitle2}</h2>
              <p>{data?.para2}</p>
            </div>
            <div>
              <h2>{data?.paraTitle3}</h2>
              <p>{data?.para3}</p>
            </div>
            <div>
              <h2>{data?.paraTitle4}</h2>
              <p>{data?.para4}</p>
            </div>
            <div>
              <h2>{data?.paraTitle5}</h2>
              <p>{data?.para5}</p>
            </div>
            <div>
              <h2>{data?.paraTitle6}</h2>
              <p>{data?.para6}</p>
            </div>
            <div>
              <h2>{data?.paraTitle7}</h2>
              <p>{data?.para7}</p>
            </div>
            <div>
              <h2>{data?.paraTitle8}</h2>
              <p>{data?.para8}</p>
            </div>
            <div>
              <h2>{data?.paraTitle9}</h2>
              <p>{data?.para9}</p>
            </div>
            <div>
              <h2>{data?.paraTitle10}</h2>
              <p>{data?.para10}</p>
            </div>
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
