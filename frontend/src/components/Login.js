import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
        'http://localhost:8080/auth/login',
        new URLSearchParams(formData),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.status === 200 && response.data) {
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('customerName', response.data.name);
        localStorage.setItem('registrationNumber', response.data.registrationNumber);
        localStorage.setItem('email', response.data.email);
        console.log('Registration Number set in localStorage:', response.data.registrationNumber);
        console.log('Role set in localStorage:', response.data.role);

        if (response.data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (response.data.role === 'CUSTOMER') {
          navigate('/customer-dashboard');
        }
        else if(response.data.role === 'DRIVER') {
          navigate('/driver-dashboard');
        }
        else {
          setMessage('Unauthorized role.');
        }
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.status === 401 ? 'Invalid email or password!' : 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow p-4">
            <h2 className="text-center h1 mb-4">Login</h2>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit} className="form form-sm form-validate">
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

              <Button
                variant="primary"
                type="submit"
                className="btn btn-yellow aligncenter btn-lg"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Register here</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
