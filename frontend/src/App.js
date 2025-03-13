import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CustomerRegistration from "./components/CustomerRegistration";
import DriverRegistration from "./components/DriverRegistration";
import Map from "./components/Map";
import AdminDashboard from "./pages/admin/Dashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import DriverDashboard from "./pages/driver/Dashboard";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerRegistration />} />
        <Route path="/driver/register" element={<DriverRegistration />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/customer-dashboard" element={<ProtectedRoute role="CUSTOMER"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

// Protected Route Component
const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem("userRole"); // Get stored role
  return userRole === role ? children : <Navigate to="/" />;
};

export default App;
