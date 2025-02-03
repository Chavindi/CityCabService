import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import "./CustomerDashboard.css";


const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("Customer");

  useEffect(() => {
    // Fetch customer details from localStorage or API
    const name = localStorage.getItem("customerName") || "Customer";
    setCustomerName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
          <Form className="booking-form shadow p-4 rounded">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pickup Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter pickup location" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Drop-off Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter drop-off location" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" required />
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
