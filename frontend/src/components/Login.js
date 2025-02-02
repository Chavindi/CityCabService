// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import navigation hook
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize navigation

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     try {
//         const response = await axios.post(
//             'http://localhost:8080/auth/login',
//             { username, password },
//             {
//                 headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );

//         if (response.status === 200 && response.data) {
//             console.log('Login successful:', response.data);
//             setMessage(response.data.message);

//             // Store role in localStorage
//             localStorage.setItem('userRole', response.data.role);

//             // Redirect based on role
//             if (response.data.role === 'admin') {
//                 navigate('/admin-dashboard');
//             } else if (response.data.role === 'customer') {
//                 navigate('/customer-dashboard');
//             } else {
//                 setMessage('Unauthorized role.'); // Handle unexpected roles
//             }
//         } else {
//             console.log('Invalid response from server');
//             setMessage('Login failed. Please try again.');
//         }
//     } catch (error) {
//         console.log('Login failed:', error.response);
//         if (error.response && error.response.status === 401) {
//             setMessage('Invalid username or password!');
//         } else {
//             setMessage('Login failed. Please try again.');
//         }
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
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

        if (response.data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (response.data.role === 'customer') {
          navigate('/customer-dashboard');
        } else {
          setMessage('Unauthorized role.');
        }
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.status === 401 ? 'Invalid username or password!' : 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow p-4">
            <Card.Title className="text-center mb-4">Login</Card.Title>

            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
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

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
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
