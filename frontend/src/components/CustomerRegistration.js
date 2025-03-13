import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    nic: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:8080/users/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
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
            <h2 className="text-center h1 mb-4">Customer Registration</h2>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit} className="form form-sm form-validate">
              <div className="form-group">
                <label>Name <span className="red">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Your name"
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
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number <span className="red">*</span></label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Contact Number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address <span className="red">*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="ajaxField required"
                  placeholder="Address"
                  required
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

export default CustomerRegistration;
