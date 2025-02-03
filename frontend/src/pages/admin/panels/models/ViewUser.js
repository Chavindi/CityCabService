import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewUser = ({ user, handleClose }) => {
  if (!user) return null; // Ensure user data exists

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact Number:</strong> {user.contactNumber}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>NIC:</strong> {user.nic}</p>
        <p><strong>Registration Number:</strong> {user.registrationNumber}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUser;
