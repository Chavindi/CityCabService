import React from 'react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';

const ViewBooking = ({ show, onHide, booking }) => {
  if (!booking) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Booking Information</Card.Title>
                <p><strong>Order Number:</strong> {booking.booking?.orderNumber || 'N/A'}</p>
                <p><strong>Pickup Location:</strong> {booking.booking?.pickupLocation || 'N/A'}</p>
                <p><strong>Dropoff Location:</strong> {booking.booking?.dropoffLocation || 'N/A'}</p>
                <p><strong>Date:</strong> {booking.booking?.date || 'N/A'}</p>
                <p><strong>Time:</strong> {booking.booking?.time || 'N/A'}</p>
                <p><strong>Status:</strong> {booking.booking?.status || 'N/A'}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Customer Information</Card.Title>
                <p><strong>Name:</strong> {booking.customer?.name || 'Unknown'}</p>
                <p><strong>Email:</strong> {booking.customer?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {booking.customer?.contactNumber || 'N/A'}</p>
                <p><strong>Address:</strong> {booking.customer?.address || 'N/A'}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewBooking;
