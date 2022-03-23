import React, { useState } from "react";
import "./blogs.css";

const Blogs = () => {
  const [add, setAdd] = useState(false);
  return (
    <div className="admin-blogs">
      <div className="admin-blogs-top">
        <h1>Manage Tours</h1>
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
          {/* {tours.map((tour, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img alt="" className="product-preview"></img>
                  </td>
                  <td>{tour.data.title}</td>
                  <td>{tour.data.destination}</td>
                  <td>{tour.data.price.discountPrice}</td>
                  <td>{tour.data.price.actualPrice}</td>
                  <td
                    className="btn-del"
                    onClick={() => {
                    //   handleDelete(tour.id);
                    }}
                  >
                    Delete
                  </td>
                  <td className="btn-edit">Edit</td>
                </tr>
              );
            })} */}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
