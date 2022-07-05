import React, { useState } from "react";
import "./deleteCard.css";
import Loader from "../../Loader/Loader";

const DeleteCard = ({ del, close }) => {
  const [loading, setLoading] = useState(0);
  return (
    <div className="delete-card">
      <p>Are you sure you want to delete ?</p>
      <div className="action-box">
        <button
          onClick={() => {
            setLoading(1);
            del();
            setLoading(0);
          }}
        >
          {loading ? <Loader small /> : "Delete"}
        </button>
        <button onClick={close}>No</button>
      </div>
    </div>
  );
};

export default DeleteCard;
