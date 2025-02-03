import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaCar, FaUser, FaSignOutAlt,FaEye } from "react-icons/fa";
import { Card, Row, Col, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';

import CarTable from "./panels/CarTable";
import DriverTable from "./panels/DriverTable";
import UserTable from "./panels/UserTable";
import ViewBooking from './models/ViewBooking';

import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings with customer details
  useEffect(() => {
    axios.get('http://localhost:8080/bookings/withCustomers')
      .then(response => {
        console.log("API response:", response.data);
        setBookings(response.data);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

   // DataTable columns
   const columns = [
    {
      name: 'Order Number',
      selector: row => row.booking?.orderNumber,
      sortable: true,
    },
    {
      name: 'Customer Name',
      selector: row => row.customer?.name || 'Unknown',
      sortable: true,
    },
    {
      name: 'Pickup Location',
      selector: row => row.booking?.pickupLocation || 'N/A',
      sortable: true,
    },
    {
      name: 'Dropoff Location',
      selector: row => row.booking?.dropoffLocation || 'N/A',
      sortable: true,
    },
    {
      name: 'Date & Time',
      selector: row => `${row.booking?.date || 'N/A'} ${row.booking?.time || 'N/A'}`,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.booking?.status || 'N/A',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Button
          variant="link"
          onClick={() => {
            console.log("Selected booking:", row);
            setSelectedBooking(row);
            setShowModal(true);
          }}
        >
          <FaEye />
        </Button>
      ),
      ignoreRowClick: true,
     
    }
  ];
  
  

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
              onClick={() => setActiveComponent("drivers")}
            >
              <FaUser className="me-2" /> Manage Drivers
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setActiveComponent("users")}
            >
              <FaUser className="me-2" /> Manage Customers
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
        {activeComponent === "dashboard" && (
          <>
            <h2>Dashboard</h2>
            {/* Cards displaying statistics */}
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Pending Bookings</Card.Title>
                    <Card.Text>5</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Completed Bookings</Card.Title>
                    <Card.Text>20</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Bookings</Card.Title>
                    <Card.Text>{bookings.length}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* DataTable for bookings */}
            <div className="mt-4">
              <h4>Booking Details</h4>
              <DataTable
                columns={columns}
                data={bookings}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          </>
        )}

        {activeComponent === "cars" && <CarTable />}
        {activeComponent === "drivers" && <DriverTable />}
        {activeComponent === "users" && <UserTable />}
        {activeComponent === "logout" && <h2>Logging Out...</h2>}
      </div>

      {/* Modal for Viewing Booking */}
      {showModal && selectedBooking && (
        <ViewBooking
          show={showModal}
          onHide={() => setShowModal(false)}
          booking={selectedBooking}
        />
      )}

    </div>
  );
};

export default Dashboard;
