import React, { useEffect, useState } from "react";
import "./blog.css";
import blog from "../../assets/blog1.png";
import Enquire from "../../Components/Enquire/Enquire";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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

  return (
    <div className="blog-pg">
      <div className="hero"></div>
      <div className="blog-content">
        <h1 className="blog-title">{data?.heading}</h1>
        <div className="blog-details">
          <div className="blog-details-lt">
            <h1>1. {data?.title}</h1>
            <img src={blog} alt=""></img>
            <p>
              <span style={{ color: "#FF5D2C" }}>Update 2021: </span>{" "}
              {data?.para1}
            </p>
            <p>{data?.para2}</p>
            <p>{data?.para3}</p>
            <p>{data?.para4}</p>
            <p>{data?.para5}</p>
            <p>{data?.para6}</p>
            <p>{data?.para7}</p>
            <p>{data?.para8}</p>
            <p>{data?.para9}</p>
            <p>{data?.para10}</p>
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
