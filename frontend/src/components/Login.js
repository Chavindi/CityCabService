import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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

        // Handle successful login
        if (response.status === 200 && response.data) {
            console.log('Login successful:', response.data);
            setMessage(response.data.message); // Use message from response

            // Optionally, handle the role if needed
            if (response.data.role) {
                console.log('User role:', response.data.role);
                // Do something with the role if necessary
            }
        } else{
          console.log('Invalid response from server');
            setMessage('Login failed. Please try again.');
        }
    } catch (error) {
        console.log('Login failed:', error.response);

        // If the status code is 401 (Unauthorized), show failure message
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
