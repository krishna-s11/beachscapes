import React, { useEffect, useState } from "react";
import NewBlogs from "../NewBlogs/NewBlogs";
import "./blogs.css";
import { db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Blogs = () => {
  const [add, setAdd] = useState(false);
  const [blogs, setBlogs] = useState();
  const [id, setId] = useState();

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    window.location.reload();
  };

  return (
    <div className="admin-blogs">
      {add ? (
        <NewBlogs
          close={() => {
            setAdd(false);
          }}
          id={id}
        />
      ) : null}
      <div className="admin-blogs-top">
        <h1>Manage Blogs</h1>
        <div className="admin-blogs-action-bar">
          {
            <button
              className="btn btn-add_items"
              onClick={() => {
                setAdd(true);
              }}
            >
              New +
            </button>
          }
        </div>
      </div>
      <table className="fl-table">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img
                    alt=""
                    src={blog.data.imgLink[0]}
                    className="product-preview"
                  ></img>
                </td>
                <td>{blog.data.heading}</td>
                <td>{blog.data.title}</td>
                <td
                  className="btn-del"
                  onClick={() => {
                    handleDelete(blog.id);
                  }}
                >
                  Delete
                </td>
                <td
                  className="btn-edit"
                  onClick={() => {
                    setId(blog.id);
                    setAdd(true);
                  }}
                >
                  Edit
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
