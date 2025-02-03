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
            <Card.Title className="text-center mb-4">Customer Registration</Card.Title>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
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
