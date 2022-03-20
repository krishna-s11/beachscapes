import React from "react";
import "./dashboard.css";
import LeftPane from "../../../Components/AdminPanel/LeftPane/LeftPane";
import TopNav from "../../../Components/AdminPanel/TopNav/TopNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="admin_dashboard">
      <LeftPane />
      <div className="main_container">
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
