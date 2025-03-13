import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import "./Home.css"; // Import corresponding CSS file

const Home = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '0 20px' }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: '24px', fontWeight: 'bold',color: '#cd9f15' }} className="align-content-center">
          Mega City Cab
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto" style={{ marginTop: '5px' }}>
            <Nav.Link
              href="/login"
              className="btn btn-warning btn-lg"
              style={{
                margin: '5px',
                padding: '10px 20px',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              Login
            </Nav.Link>
            <Nav.Link
              href="/register"
              className="btn btn-warning btn-lg"
              style={{
                margin: '5px',
                padding: '10px 20px',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              Signup
            </Nav.Link>
            <Nav.Link
              href="/driver/register"
              className="btn btn-warning btn-lg"
              style={{
                margin: '5px',
                padding: '10px 20px',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              Become a Driver
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <section id="services">
  <div className="container">
    <h1 className="yellow">Welcome to Mega City Cab</h1>
    <h2 className="h1">Our Services</h2>
    <div className="row">
      <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">  
        <div className="image">
          <img src="assets/images/_services-1.png" alt="Rapid City Transfer" />
        </div>
        <h5>Rapid City Transfer</h5>
        <p>We will bring you quickly and comfortably to anywhere in Colombo city, ensuring your trip is stress-free.</p>
      </div>
      <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">  
        <div className="image">
          <img src="assets/images/_services-2.png" alt="Hotel Booking" />
        </div>
        <h5>Hotel Booking</h5>
        <p>If you need a comfortable hotel, our operators will book it for you, and ensure a smooth taxi ride to the address.</p>
      </div>
      <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">  
        <div className="image">
          <img src="assets/images/_services-3.png" alt="Airport Transfer" />
        </div>
        <h5>Airport Transfer</h5>
        <p>We provide quick and reliable airport transfers, ensuring a comfortable journey to and from the airport.</p>
      </div>
      <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">  
        <div className="image">
          <img src="assets/images/_services-4.png" alt="Baggage Transport" />
        </div>
        <h5>Baggage Transport</h5>
        <p>Need help transporting your baggage? Our operators will take care of it and ensure it reaches the destination safely.</p>
      </div>
    </div>
  </div>
</section>

  
<section id="tariffs" style={{ backgroundColor: '#febc04' }}>
		<div className="container">
			<h2 className="yellow">See Our</h2>
			<h2 className="h1">Tariffs</h2>
			<div className="row">
				<div className="col-md-3 col-sm-6">
					<div className="item matchHeight">
						<div className="image"><img src="https://images.hgmsites.net/hug/2015-toyota-prius-5dr-hb-three-natl-angular-front-exterior-view_100485217_h.jpg" className="full-width" alt="Tariff"></img></div>
						<h4>Toyota Prius</h4>
						<div className="price">Rs.500<span>/km</span></div>
					</div>
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="item matchHeight">
						<div className="image"><img src="http://autos.hamariweb.com/images/carimages/3868.jpg" className="full-width" alt="Tariff"></img></div>
						<h4>Toyota Aqua</h4>
						<div className="price">Rs.400<span>/km</span></div>
					</div>
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="item matchHeight vip">
						<div className="image"><img src="https://www.popularmaruti.com/blog/wp-content/uploads/2022/12/20903608375b891fb77e8402.66922053.jpg" className="full-width" alt="Tariff"></img></div>
						<h4 className="red">Wagon R</h4>
						<div className="price">Rs.300<span>/km</span></div>
					</div>
				</div>
				<div className="col-md-3 col-sm-6">
					<div className="item matchHeight">
						<div className="image"><img src="https://royalmotorgrandeur.com.sg/wp-content/uploads/2023/05/rmg-voxy-2-scaled.jpg" className="full-width" alt="Tariff"></img></div>
						<h4>Toyota Woxy</h4>
						<div className="price">Rs.300<span>/km</span></div>
					</div>
				</div>												
			</div>
		</div>
	</section>
  <section id="car-block" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
  <div className="car-right animation-block" style={{ textAlign: 'right' }}>
    <img src="assets/images/_car-big-side.png" alt="Car" style={{ width: '80%', maxWidth: '600px', height: 'auto' }} />
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-7">
        <h1 className="yellow" style={{ color: '#ffcc00' }}>For Drivers</h1>
        <h2 className="h1" style={{ fontWeight: 'bold' }}>Do You Want to Earn with Mega City Cab?</h2>
      </div>
      <div className="col-md-6">
        <p>If you’re looking to join one of Colombo’s most popular and reliable cab services, Mega City Cab is the perfect opportunity. We provide an easy-to-use platform, steady orders, and excellent support for all our drivers.</p>

        <ul className="check two-col strong" style={{ listStyleType: 'none', padding: '0' }}>
          <li style={{ marginBottom: '10px' }}>Luxury cars available</li>
          <li style={{ marginBottom: '10px' }}>No registration fee</li>
          <li style={{ marginBottom: '10px' }}>Weekly payments</li>
          <li style={{ marginBottom: '10px' }}>Fixed pricing for all rides</li>
          <li style={{ marginBottom: '10px' }}>User-friendly application</li>
          <li style={{ marginBottom: '10px' }}>Stable and consistent orders</li>
        </ul>

        <a href="/driver/register" className="btn btn-warning btn-lg" style={{ padding: '12px 25px', borderRadius: '5px', fontWeight: 'bold' }}>
          Become a Driver
        </a>
      </div>
    </div>
  </div>
</section>


	<section id="partners">
		<div className="container">
			<div className="row">
				<div className="col-md-3 col-sm-12">
					<h4 className="black margin-0">Our partners</h4>
					<h2 className="white margin-0">and clients</h2>
				</div>
				<div className="col-md-9 col-sm-12">
					<div className="row items">
					    <div className="col-md-5ths col-sm-3 col-ms-4 col-xs-6"><a href="#"><img src="assets/images/_partner-1.png" alt="Partner"></img></a></div>
					    <div className="col-md-5ths col-sm-3 col-ms-4 col-xs-6"><a href="#"><img src="assets/images/_partner-2.png" alt="Partner"></img></a></div>
					    <div className="col-md-5ths col-sm-3 col-ms-4 col-xs-6"><a href="#"><img src="assets/images/_partner-3.png" alt="Partner"></img></a></div>
					    <div className="col-md-5ths col-sm-3 col-ms-4 col-xs-6"><a href="#"><img src="assets/images/_partner-4.png" alt="Partner"></img></a></div>
					    <div className="col-md-5ths col-sm-3 col-ms-4 col-xs-6"><a href="#"><img src="assets/images/_partner-5.png" alt="Partner"></img></a></div>
					</div>				
				</div>				
			</div>
		</div>
	</section>

  <section id="block-footer" style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '40px 0' }}>
  <div className="container">
    <div className="row">
      {/* About Us Section */}
      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-ms-6" style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#ffcc00' }}>About Mega City Cab</h4>
        <p>We are a trusted and popular cab service in Colombo, providing a fast, safe, and comfortable ride to thousands of customers. Our drivers are well-trained, and our platform ensures smooth booking and reliable service every time.</p>

        {/* Social Media Links */}
        <div className="social-small social-yellow" style={{ marginTop: '20px' }}>
          <a href="#" className="fa fa-twitter" style={{ color: '#ffcc00', marginRight: '10px' }}></a>
          <a href="#" className="fa fa-facebook" style={{ color: '#ffcc00', marginRight: '10px' }}></a>
          <a href="#" className="fa fa-instagram" style={{ color: '#ffcc00', marginRight: '10px' }}></a>
          <a href="#" className="fa fa-google-plus" style={{ color: '#ffcc00', marginRight: '10px' }}></a>
          <a href="#" className="fa fa-pinterest" style={{ color: '#ffcc00' }}></a>
        </div>					
      </div>

      {/* Explore Section */}
      <div className="col-lg-5 col-md-5" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>					
        <h4 style={{ color: '#ffcc00' }}></h4>
        <div className="row">
          <div className="col-md-5">
            						
          </div>
          <div className="col-md-5">
            					
          </div>						
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="col-lg-3 col-md-6 col-sm-6 col-ms-6" style={{ marginBottom: '30px' }}>					
        <h4 style={{ color: '#ffcc00' }}>Contact Us</h4>
        <p><span className="yellow" style={{ color: '#ffcc00' }}>Address:</span> 123, Colombo Road, Colombo, Sri Lanka</p>

        <ul className="address" style={{ listStyleType: 'none', padding: '0' }}>
          <li><span className="fa fa-phone" style={{ color: '#ffcc00' }}></span> 800-123-456</li>
          <li><span className="fa fa-envelope" style={{ color: '#ffcc00' }}></span> <a href="mailto:contact@megacitycab.lk" style={{ color: '#ffffff' }}>contact@megacitycab.lk</a></li>
          <li><span className="fa fa-skype" style={{ color: '#ffcc00' }}></span> megacitycab.lk</li>
        </ul>					
      </div>		
    </div>
  </div>
</section>

{/* Footer */}
<footer style={{ backgroundColor: '#212529', color: '#ffffff', padding: '20px 0' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    <p>&copy; 2025 Mega City Cab. All Rights Reserved. | <a href="/terms" style={{ color: '#ffcc00' }}>Terms of Use</a></p>
    <a href="#" className="go-top" style={{ display: 'none', color: '#ffcc00' }}></a>
  </div>
</footer>

    </div>
  );
};

export default Home;
