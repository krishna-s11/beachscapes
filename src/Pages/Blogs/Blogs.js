import React, { useEffect, useState } from "react";
import "./blogs.css";
import stroke from "../../assets/stroke.svg";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const getTours = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setBlogs(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getTours();
  }, []);
  return (
    <div className="blogs-pg">
      <div className="hero"></div>
      <div className="blogs-content">
        <h1 className="blogs-title">
          Our Blogs{" "}
          <span>
            <img src={stroke} alt="" />
          </span>
        </h1>
        <div className="blogs-container">
          {blogs &&
            blogs.map((blog) => {
              return <BlogCard data={blog} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
