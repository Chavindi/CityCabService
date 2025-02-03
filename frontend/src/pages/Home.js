import React from "react";
import { Container, Navbar, Nav, Button, Carousel, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 shadow">
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
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="https://static.vecteezy.com/system/resources/thumbnails/026/992/343/small_2x/classic-modified-car-with-dark-smokie-background-ai-generative-free-photo.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Reliable City Rides</h3>
            <p>Book a cab anytime, anywhere in Colombo.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Affordable Fares</h3>
            <p>Transparent pricing with no hidden charges.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://source.unsplash.com/1600x600/?city,transport" alt="Third slide" />
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
