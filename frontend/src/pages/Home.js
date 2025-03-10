import React from "react";
import { Container, Navbar, Nav, Button, Carousel, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';
// import '../pages/Home.css';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 shadow sticky-top">
        <Navbar.Brand as={Link} to="/">MegaCityCab</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" as={Link} to="/login" className="me-2">Sign In</Button>
            <Button variant="primary" as={Link} to="/register">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section with Carousel */}
     <Carousel className="slider" style={{ height: "500px" }}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image5}
      alt="First slide"
      style={{ height: "500px", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3>Reliable City Rides</h3>
      <p>Book a cab anytime, anywhere in Colombo.</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image6}
      alt="Second slide"
      style={{ height: "500px", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3>Affordable Fares</h3>
      <p>Transparent pricing with no hidden charges.</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image4}
      alt="Third slide"
      style={{ height: "500px", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3>Fast & Secure</h3>
      <p>Enjoy safe and secure rides with our verified drivers.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


      {/* About Section */}
      <Container className="my-5 text-center">
        <h2 className="fw-bold">Why Choose MegaCityCab?</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h5>🚖 Easy Booking</h5>
                <p>Book a cab in just a few clicks.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h5>💰 Best Prices</h5>
                <p>Enjoy affordable and fair pricing.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h5>🛡️ Safe & Secure</h5>
                <p>Verified drivers for a safe ride.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="my-5 text-center">
        <h2 className="fw-bold">What Our Customers Say</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <p>"MegaCityCab has the best service! Always on time and super professional."</p>
                <strong>- Alex P.</strong>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <p>"Reliable and affordable. Highly recommend it for daily commutes!"</p>
                <strong>- Samantha R.</strong>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Body>
                <p>"Great drivers and clean cars. Booking was super easy!"</p>
                <strong>- Kevin M.</strong>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4">
        <p className="mb-0">© 2025 MegaCityCab | All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
