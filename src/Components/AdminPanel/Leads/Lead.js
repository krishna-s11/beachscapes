import React, { useEffect, useState } from "react";
import "./lead.css";
import { db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Lead = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const getLeads = async () => {
      const querySnapshot = await getDocs(collection(db, "leads"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      setLeads(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    };
    getLeads();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "leads", id));
    window.location.reload();
  };

  return (
    <div className="lead-pg">
      <div className="lead-top">
        <h1>Manage Tours</h1>
      </div>
      <table className="fl-table">
        <thead>
          <tr>
            <th></th>
            <th>Tour</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>No. of Peo..</th>
            <th>Coupon Code</th>
            <th>Request</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{lead.data.name}</td>
                <td>
                  {lead.data.firstName} {lead.data.lastName}
                </td>
                <td>{lead.data.email}</td>
                <td>{lead.data.phone}</td>
                <td>{lead.data.nop}</td>
                <td>{lead.data.couponCode}</td>
                <td>{lead.data.request}</td>
                <td
                  className="btn-del"
                  onClick={() => {
                    handleDelete(lead.id);
                  }}
                >
                  Delete
                </td>
                <td className="btn-edit">Edit</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Lead;
