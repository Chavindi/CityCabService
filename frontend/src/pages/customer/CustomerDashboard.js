import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("Customer");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Fetch customer details from localStorage or API
    const name = localStorage.getItem("customerName") || "Customer";
    console.log("customerName:", name);
  
    // Get registration number from localStorage
    const registrationNumber = localStorage.getItem("registrationNumber");
    console.log("Registration Number:", registrationNumber);

    setCustomerName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const registrationNumber = localStorage.getItem("registrationNumber");
    if (!registrationNumber) {
      console.error("Registration Number is missing.");
      return;
    }
    console.log("Registration Number:", registrationNumber);
    
    const orderNumber = "ORD-" + Math.floor(Math.random() * 90000 + 10000);

    const bookingData = {
      orderNumber, // Generated order number
      registrationNumber, // Retrieved from localStorage
      pickupLocation,
      dropoffLocation,
      date,
      time,
      status: "booked",
    };

    try {
      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Booking confirmed:", data);
        // Optionally, redirect or show a success message
        // navigate("/my-bookings");
      } else {
        console.error("Booking failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h4 className="text-light text-center my-3">MegaCityCab</h4>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="#" className="nav-item active">Book a Cab</Nav.Link>
          <Nav.Link as={Link} to="#">My Bookings</Nav.Link>
          <Nav.Link as={Link} to="#">Profile</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm px-3">
          <Button className="toggle-btn"><FaBars /></Button>
          <Dropdown className="ms-auto">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <FiUser className="me-2" /> {customerName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        {/* Booking Form (Default Content) */}
        <Container className="mt-4">
          <h3 className="mb-4">Book a Cab</h3>
          <Form className="booking-form shadow p-4 rounded" onSubmit={handleBookingSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pickup Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Drop-off Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter drop-off location"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Confirm Booking
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default CustomerDashboard;

