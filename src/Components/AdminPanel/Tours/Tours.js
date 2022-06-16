import React, { useEffect, useState } from "react";
import "./tours.css";
import { db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import NewTour from "../NewTour/NewTour";

const Tours = () => {
  const [tours, setTours] = useState();
  const [add, setAdd] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      const querySnapshot = await getDocs(collection(db, "tours"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setTours(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getTours();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tours", id));
    window.location.reload();
  };

  if (tours) {
    return (
      <div className="tours">
        {add ? (
          <NewTour
            id={id}
            close={() => {
              setAdd(false);
            }}
            resetId={() => {
              setId(null);
            }}
          />
        ) : null}
        <div className="tours-top">
          <h1>Manage Tours</h1>
          <div className="tours-action-bar">
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
              <th>Preview</th>
              <th>title</th>
              <th>Destination</th>
              <th>Discount</th>
              <th>Price</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      alt=""
                      src={tour.data.imgLink[0]}
                      className="product-preview"
                    ></img>
                  </td>
                  <td>{tour.data.title}</td>
                  <td>{tour.data.destination}</td>
                  <td>{tour.data.price.discountPrice}</td>
                  <td>{tour.data.price.actualPrice}</td>
                  <td
                    className="btn-del"
                    onClick={() => {
                      handleDelete(tour.id);
                    }}
                  >
                    Delete
                  </td>
                  <td
                    className="btn-edit"
                    onClick={() => {
                      setId(tour.id);
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
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Tours;
