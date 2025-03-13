import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    telephone1: '',
    telephone2: '',
    nic: '',
    assignedCar: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vehicles = [
    { name: "Toyota Prius", image: "https://images.hgmsites.net/hug/2015-toyota-prius-5dr-hb-three-natl-angular-front-exterior-view_100485217_h.jpg" },
    { name: "Toyota Aqua", image: "http://autos.hamariweb.com/images/carimages/3868.jpg" },
    { name: "Wagon R", image: "https://www.popularmaruti.com/blog/wp-content/uploads/2022/12/20903608375b891fb77e8402.66922053.jpg" },
    { name: "Toyota Woxy", image: "https://royalmotorgrandeur.com.sg/wp-content/uploads/2023/05/rmg-voxy-2-scaled.jpg" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:8080/drivers/add', // Update the endpoint for driver registration
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setMessage(response.data);
        navigate('/login'); // Redirect to login after successful registration
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow p-4">
            <h1 className="h1 aligncenter">Driver Registration</h1>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit} className="form form-sm form-validate">
              <div className="form-group">
                <label>First Name <span className="red">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name <span className="red">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email <span className="red">*</span></label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password <span className="red">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="form-group">
                <label>Telephone 1 <span className="red">*</span></label>
                <input
                  type="text"
                  name="telephone1"
                  value={formData.telephone1}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Telephone 1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Telephone 2</label>
                <input
                  type="text"
                  name="telephone2"
                  value={formData.telephone2}
                  onChange={handleChange}
                  className="ajaxField"
                  placeholder="Telephone 2"
                />
              </div>

              <div className="form-group">
                <label>NIC <span className="red">*</span></label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="NIC"
                  required
                />
              </div>

              <div className="form-group">
                <label>Assigned Car <span className="red">*</span></label>
                <Form.Control
                  as="select"
                  name="assignedCar"
                  value={formData.assignedCar}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a car</option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle.name}>
                      {vehicle.name}
                    </option>
                  ))}
                </Form.Control>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="btn btn-yellow aligncenter btn-lg"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login">Login here</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverRegistration;
