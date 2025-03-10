import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CustomerRegistration from "./components/CustomerRegistration";
import AdminDashboard from "./pages/admin/Dashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerRegistration />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/customer-dashboard" element={<ProtectedRoute role="CUSTOMER"><CustomerDashboard /></ProtectedRoute>} />
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
