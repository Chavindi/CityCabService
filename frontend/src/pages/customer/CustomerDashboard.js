import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from "@mapbox/polyline";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("Customer");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [position, setPosition] = useState([51.505, -0.09]);
  const [route, setRoute] = useState([]);
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [distance, setDistance] = useState(0); // To store calculated distance
  const [totalAmount, setTotalAmount] = useState(0); // Store total amount
  const [receipt, setReceipt] = useState(null); // Store the booking receipt

  const vehicles = [
    { name: "Toyota Prius", image: "https://images.hgmsites.net/hug/2015-toyota-prius-5dr-hb-three-natl-angular-front-exterior-view_100485217_h.jpg" },
    { name: "Toyota Aqua", image: "http://autos.hamariweb.com/images/carimages/3868.jpg" },
    { name: "Wagon R", image: "https://www.popularmaruti.com/blog/wp-content/uploads/2022/12/20903608375b891fb77e8402.66922053.jpg" },
    { name: "Toyota Woxy", image: "https://royalmotorgrandeur.com.sg/wp-content/uploads/2023/05/rmg-voxy-2-scaled.jpg" },
  ];

  // Free API keys
  const OPENCAGE_API_KEY = "648b6f3495dc4161864f6012c82ce634";
  const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf624892309b054b094464ab7c7a1509514a22";

  useEffect(() => {
    const name = localStorage.getItem("customerName") || "Customer";
    setCustomerName(name);

    // Fetch user's current location (optional)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  // Fetch location suggestions using OpenCage API
  const fetchSuggestions = async (query) => {
    if (query.trim()) {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPENCAGE_API_KEY}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    }
  };

  // Fetch coordinates and route from OpenRouteService API
  const fetchRoute = (pickup, destination) => {
    axios
      .get(
        `http://localhost:8080/api/route/getRoute?origin=${pickup.lat},${pickup.lng}&destination=${destination.lat},${destination.lng}`
      )
      .then((response) => {
        const routeSteps = response.data.routes[0].legs[0].steps;
        const coordinates = [];

        // Decode each step's geometry into lat/lng coordinates
        routeSteps.forEach((step) => {
          const decoded = polyline.decode(step.geometry);
          coordinates.push(...decoded);
        });

        setRoute(coordinates);

        // Calculate the distance between pickup and dropoff locations
        const calculatedDistance = calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng);
        setDistance(calculatedDistance);

        // Calculate the total amount (150 per km)
        setTotalAmount(calculatedDistance * 150);
      })
      .catch((error) => {
        console.error("Error fetching route:", error);
      });
  };

  // Calculate distance using the Haversine formula
  const toRad = (value) => (value * Math.PI) / 180;

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Handle location selection from suggestions
  const handleLocationSelect = (location, type) => {
    const coordinates = {
      lat: location.geometry.lat,
      lng: location.geometry.lng,
    };
    if (type === "pickup") {
      setPickupLocation(location.formatted);
      setPickupCoordinates(coordinates);
    } else if (type === "dropoff") {
      setDropoffLocation(location.formatted);
      setDropoffCoordinates(coordinates);
    }
  };

  useEffect(() => {
    if (pickupCoordinates && dropoffCoordinates) {
      fetchRoute(pickupCoordinates, dropoffCoordinates);
    }
  }, [pickupCoordinates, dropoffCoordinates]);

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

    const orderNumber = "ORD-" + Math.floor(Math.random() * 90000 + 10000);

    const bookingData = {
      orderNumber,
      registrationNumber,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      pickupLat: pickupCoordinates.lat,
      pickupLng: pickupCoordinates.lng,
      passengers,
      vehicle,
      totalAmount,
      distance,
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
        alert("Booking successful!");
        setReceipt(data); // Save receipt data on success
      } else {
        const errorMsg = await response.text();
        console.error("Booking failed:", errorMsg);
        alert("Booking failed! Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while booking.");
    }
  };

  // Map focusing logic
  const FocusMap = () => {
    const map = useMap();
    if (pickupCoordinates && dropoffCoordinates) {
      map.flyTo([pickupCoordinates.lat, pickupCoordinates.lng], 13, {
        animate: true,
        duration: 2,
      });
    }
    return null;
  };

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Current date in yyyy-mm-dd format
  const formattedTime = currentDate.toTimeString().split(' ')[0]; // Current time in hh:mm:ss format

  // Validate date and time based on current date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate < formattedDate) {
      setDate(formattedDate); // Set current date if the selected date is in the past
    } else {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (date === formattedDate && selectedTime < formattedTime) {
      setTime(formattedTime); // Set current time if the selected time is in the past on the same day
    } else {
      setTime(selectedTime);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar" style={{ backgroundColor: '#FFC61A', minHeight: '100vh', padding: '15px' }}>
  <h1 className="text-black text-center my-5">MegaCityCab</h1>
  <Nav className="flex-column">
    <Nav.Link 
      as={Link} 
      to="#" 
      className="nav-item active" 
      style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}
    >
      Book a Cab
    </Nav.Link>
  </Nav>
</div>


      <div className="main-content" style={{ padding: '0px', backgroundColor: '#ffc61a8f' }}>
      <Navbar style={{ backgroundColor: '#FFC61A' }} expand="lg" className="shadow-sm px-3">
  
  <Dropdown className="ms-auto">
    <Dropdown.Toggle className="btn btn-lg aligncenter" style={{ backgroundColor: 'black', color: 'white', border: 'none' }} id="dropdown-basic">
      <FiUser className="me-2" /> {customerName}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/" style={{ color: 'black' }}>Home</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout} style={{ color: 'black' }}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Navbar>


        <Container className="mt-4">
          <h1 className="mb-4 text-center">Book a Cab</h1>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
              <Form className="booking-form shadow p-4 rounded" onSubmit={handleBookingSubmit} style={{ backgroundColor: '#FFC61A' }}>
  <Row className="mb-3">
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: 'black' }}>Pickup Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChange={(e) => { setPickupLocation(e.target.value); fetchSuggestions(e.target.value); }}
          required
          style={{ borderColor: 'black' }}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list" style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px' }}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleLocationSelect(suggestion, "pickup")}>
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: 'black' }}>Drop-off Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter drop-off location"
          value={dropoffLocation}
          onChange={(e) => { setDropoffLocation(e.target.value); fetchSuggestions(e.target.value); }}
          required
          style={{ borderColor: 'black' }}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list" style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px' }}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleLocationSelect(suggestion, "dropoff")}>
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label style={{ color: 'black' }}>Pickup Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={handleDateChange}
            min={formattedDate} // Prevent selecting past dates
            required
            style={{ borderColor: 'black' }}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label style={{ color: 'black' }}>Pickup Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={handleTimeChange}
            required
            style={{ borderColor: 'black' }}
          />
        </Form.Group>
      </Col>
    </Row>

  <Row className="mb-3">
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: 'black' }}>Passengers</Form.Label>
        <Form.Control
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          required
          style={{ borderColor: 'black' }}
        />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label style={{ color: 'black' }}>Vehicle</Form.Label>
        <Dropdown onSelect={(vehicleName) => setVehicle(vehicleName)}>
          <Dropdown.Toggle variant="dark" id="vehicle-dropdown" style={{ backgroundColor: 'black', color: 'white' }}>
            {vehicle ? vehicle : "Select Vehicle"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {vehicles.map((v, index) => (
              <Dropdown.Item key={index} eventKey={v.name} style={{ color: 'black' }}>
                <div className="vehicle-item">
                  <img src={v.image} alt={v.name} width={200} height={120} className="vehicle-image" />
                  {v.name}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </Col>
  </Row>

  <Button variant="dark" type="submit" style={{ backgroundColor: 'black', borderColor: 'black' }}>
    Confirm Booking
  </Button>
</Form>

              </div>
              <div className="col-6">
                {/* Bill on the bottom right */}
                <div className="card col-6 shadow-lg" style={{ backgroundColor: '#FFC61A', color: 'black', borderRadius: '10px' }}>
  <div className="card-body">
    <h5 className="card-title text-center" style={{ fontWeight: 'bold' }}>Trip Details</h5>
    <p className="card-text mt-3">
      <strong>Distance:</strong> {distance.toFixed(2)} km
    </p>
    <p className="card-text">
      <strong>Total Amount:</strong> Rs.{totalAmount.toFixed(2)}
    </p>
  </div>
</div>
              </div>
            </div>
          </div>
          
        </Container>

        <div className="map-bill-container row mt-4">
          {/* Map on the bottom left */}
          <div className="map-container col-12">
            <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <FocusMap />
              {pickupCoordinates && (
                <Marker position={pickupCoordinates}>
                  <Popup>Pickup Location</Popup>
                </Marker>
              )}
              {dropoffCoordinates && (
                <Marker position={dropoffCoordinates}>
                  <Popup>Dropoff Location</Popup>
                </Marker>
              )}
              {route.length > 0 && <Polyline positions={route} color="blue" />}
            </MapContainer>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
