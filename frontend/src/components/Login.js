import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await axios.post(
            'http://localhost:8080/auth/login',
            { username, password },
            {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        if (response.status === 200 && response.data) {
            console.log('Login successful:', response.data);
            setMessage(response.data.message);

            // Store role in localStorage
            localStorage.setItem('userRole', response.data.role);

            // Redirect based on role
            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (response.data.role === 'customer') {
                navigate('/customer-dashboard');
            } else {
                setMessage('Unauthorized role.'); // Handle unexpected roles
            }
        } else {
            console.log('Invalid response from server');
            setMessage('Login failed. Please try again.');
        }
    } catch (error) {
        console.log('Login failed:', error.response);
        if (error.response && error.response.status === 401) {
            setMessage('Invalid username or password!');
        } else {
            setMessage('Login failed. Please try again.');
        }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;

