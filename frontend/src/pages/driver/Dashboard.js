import React, { useState } from "react";
import { FaTachometerAlt, FaSignOutAlt, FaPrint } from "react-icons/fa";
import { Card, Button, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [bookings, setBookings] = useState([
    {
      orderNumber: "ORD12345",
      customer: { name: "John Doe" },
      pickupLocation: "Colombo Fort",
      dropoffLocation: "Mount Lavinia",
      totalAmount: 1500,
      status: "Completed",
      driver: { name: "Jane Smith" },
      date: "2025-03-13T10:00:00Z",
    },
    {
      orderNumber: "ORD12346",
      customer: { name: "Alice Johnson" },
      pickupLocation: "Rajagiriya",
      dropoffLocation: "Colombo 7",
      totalAmount: 1200,
      status: "In Progress",
      driver: { name: "Mark Lee" },
      date: "2025-03-13T11:00:00Z",
    },
    {
      orderNumber: "ORD12347",
      customer: { name: "Bob Williams" },
      pickupLocation: "Kollupitiya",
      dropoffLocation: "Nugegoda",
      totalAmount: 1000,
      status: "Completed",
      driver: { name: "Sarah Kim" },
      date: "2025-03-12T15:30:00Z",
    },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handlePrintInvoice = (booking) => {
    const invoiceWindow = window.open('', '', 'width=800,height=600');
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${booking.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #fff; color: #333; }
            .invoice-container { padding: 20px; color: black; }
            .invoice-header { text-align: center; margin-bottom: 20px; }
            .invoice-header h2 { margin: 0; color: #FFC61A; }
            .invoice-details { margin-bottom: 20px; }
            .invoice-details table { width: 100%; border-collapse: collapse; }
            .invoice-details table, .invoice-details th, .invoice-details td { border: 1px solid #ddd; }
            .invoice-details th, .invoice-details td { padding: 8px; text-align: left; }
            .invoice-footer { margin-top: 20px; text-align: center; }
            button { background-color: #FFC61A; border: none; padding: 10px 20px; cursor: pointer; }
            button:hover { background-color: #f1a700; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <h2>Invoice - ${booking.orderNumber}</h2>
              <p>Customer: ${booking.customer.name}</p>
              <p>Booking Date: ${new Date(booking.date).toLocaleDateString()}</p>
            </div>
            <div class="invoice-details">
              <table>
                <tr>
                  <th>Pickup Location</th>
                  <td>${booking.pickupLocation}</td>
                </tr>
                <tr>
                  <th>Dropoff Location</th>
                  <td>${booking.dropoffLocation}</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>Rs.${booking.totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>${booking.status}</td>
                </tr>
                <tr>
                  <th>Assigned Driver</th>
                  <td>${booking.driver ? booking.driver.name : 'No driver assigned'}</td>
                </tr>
              </table>
            </div>
            <div class="invoice-footer">
              <button onclick="window.print()">Print Invoice</button>
            </div>
          </div>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  };

  const columns = [
    { name: "Order Number", selector: row => row.orderNumber, sortable: true },
    { name: "Customer Name", selector: row => row.customer?.name || "Unknown", sortable: true },
    { name: "Pickup Location", selector: row => row.pickupLocation || "N/A", sortable: true },
    { name: "Dropoff Location", selector: row => row.dropoffLocation || "N/A", sortable: true },
    { name: "Total Price", selector: row => `Rs.${row.totalAmount}` || "N/A", sortable: true },
    {
      name: "Driver",
      selector: row => row.driver ? `${row.driver.name}` : "No driver assigned",
      sortable: true,
    },
    {
      name: "Invoice",
      cell: row => (
        <Button variant="warning" onClick={() => handlePrintInvoice(row)} className="w-100">
          <FaPrint /> Print Invoice
        </Button>
      ),
      ignoreRowClick: true
    }
  ];

  return (
    <Row className="w-100" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Col xs={12} lg={3} className="bg-dark text-white p-3 vh-100 position-fixed">
        <h1 className="text-center text-warning">MegaCityCab</h1>
        <ul className="nav flex-column">
          <li className="nav-item"><button className="nav-link text-white btn btn-link" onClick={() => setActiveComponent("dashboard")}><FaTachometerAlt className="me-2" /> Dashboard</button></li>
          <li className="nav-item"><button className="nav-link text-white btn btn-link" onClick={handleLogout}><FaSignOutAlt className="me-2" /> Logout</button></li>
        </ul>
      </Col>

      {/* Main Content */}
      <Col xs={12} lg={9} className="p-4 offset-lg-3" style={{ overflowY: "auto", height: "100vh" }}>
        {activeComponent === "dashboard" && (
          <>
            <h2 className="text-warning">Driver Dashboard</h2>
            <div className="mt-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Assigned Bookings</h4>
                  <div className="table-responsive" style={{ overflowX: "auto" }}>
                    <DataTable
                      columns={columns}
                      data={bookings} // Display sample bookings
                      pagination
                      highlightOnHover
                      responsive
                      customStyles={{
                        rows: {
                          style: {
                            backgroundColor: "white", // All rows have a white background
                          },
                        },
                        cells: {
                          style: {
                            padding: "10px",
                          },
                        },
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default DriverDashboard;
