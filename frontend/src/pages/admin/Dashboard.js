import React, { useState } from "react";
import { FaTachometerAlt, FaCar, FaUser, FaSignOutAlt } from "react-icons/fa";
import CarTable from "./panels/CarTable";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="text-center">MegaCityCab</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setActiveComponent("dashboard")}
            >
              <FaTachometerAlt className="me-2" /> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setActiveComponent("cars")}
            >
              <FaCar className="me-2" /> Manage Cars
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setActiveComponent("users")}
            >
              <FaUser className="me-2" /> Manage Drivers
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setActiveComponent("logout")}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {activeComponent === "dashboard" && <h2>Dashboard</h2>}
        {activeComponent === "cars" && <CarTable />}
        {activeComponent === "users" && <h2>Manage Drivers (Coming Soon)</h2>}
        {activeComponent === "logout" && <h2>Logging Out...</h2>}
      </div>
    </div>
  );
};

export default Dashboard;
