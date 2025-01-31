import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaCar, FaUser, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="text-center">MegaCityCab</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/cars">
              <FaCar className="me-2" /> Manage Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/users">
              <FaUser className="me-2" /> Manage Drivers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              <FaSignOutAlt className="me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Dashboard</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
