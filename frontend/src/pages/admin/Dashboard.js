import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaSignOutAlt, FaPrint } from "react-icons/fa";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings assigned to the driver (no authentication check)
    axios.get("http://localhost:8080/bookings/withCustomers")
      .then(response => {
        setBookings(response.data); // Set bookings in state
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });

    // Fetch drivers to assign to bookings (if needed)
    axios.get("http://localhost:8080/drivers")
      .then(response => {
        setDrivers(response.data); // Set drivers in state
      })
      .catch(error => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/"); // Navigate to the home page or login
  };

  const handleAssignDriver = (bookingId, driverId) => {
    if (!driverId) return;
    axios.post("http://localhost:8080/bookings/assignDriver", { bookingId, driverId })
      .then(response => {
        setBookings(bookings.map(booking =>
          booking.booking.id === bookingId
            ? { ...booking, booking: { ...booking.booking, assignedDriver: response.data } }
            : booking
        ));
        alert("Driver assigned successfully!");

        // Fetch the updated list of bookings with customers after assigning the driver
        axios.get("http://localhost:8080/bookings/withCustomers")
          .then(updatedResponse => {
            setBookings(updatedResponse.data);  // Update bookings with the latest data
          })
          .catch(error => console.error("Error fetching updated bookings:", error));
      })
      .catch(error => console.error("Error assigning driver:", error));
  };

  const handlePrintInvoice = (booking) => {
    const invoiceWindow = window.open('', '', 'width=800,height=600');
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${booking.booking.orderNumber}</title>
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
              <h2>Invoice - ${booking.booking.orderNumber}</h2>
              <p>Customer: ${booking.customer.name}</p>
              <p>Booking Date: ${new Date(booking.booking.date).toLocaleDateString()}</p>
            </div>
            <div class="invoice-details">
              <table>
                <tr>
                  <th>Pickup Location</th>
                  <td>${booking.booking.pickupLocation}</td>
                </tr>
                <tr>
                  <th>Dropoff Location</th>
                  <td>${booking.booking.dropoffLocation}</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>Rs.${booking.booking.totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>${booking.booking.status}</td>
                </tr>
                <tr>
                  <th>Assigned Driver</th>
                  <td>${booking.booking.driver ? booking.booking.driver.name : 'No driver assigned'}</td>
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

  // Sorting bookings so non-assigned bookings appear first
  const sortedBookings = bookings.sort((a, b) => {
    if (a.booking.driver === null && b.booking.driver !== null) {
      return -1;  // Non-assigned bookings come first
    } else if (a.booking.driver !== null && b.booking.driver === null) {
      return 1;   // Assigned bookings come later
    }
    return 0;       // If both have or don't have drivers, they stay in the same order
  });

  const columns = [
    { name: "Order Number", selector: row => row.booking?.orderNumber, sortable: true },
    { name: "Customer Name", selector: row => row.customer?.name || "Unknown", sortable: true },
    { name: "Pickup Location", selector: row => row.booking?.pickupLocation || "N/A", sortable: true },
    { name: "Dropoff Location", selector: row => row.booking?.dropoffLocation || "N/A", sortable: true },
    { name: "Total Price", selector: row => `Rs.${row.booking?.totalAmount}` || "N/A", sortable: true },
    {
      name: "Driver",
      selector: row => row.booking?.driver ? `${row.booking.driver.name}` : "No driver assigned",
      sortable: true,
    },
    {
      name: "Assign Driver",
      cell: row => (
        row.booking?.driver ? (
          <span>{row.booking.driver.name}</span> // Show the driver's name if already assigned
        ) : (
          <Form.Select
            value={row.booking?.assignedDriver?.id || ""}
            onChange={e => handleAssignDriver(row.booking.id, e.target.value)}
            className="w-100"
          >
            <option value="">-- Select Driver --</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.name} ({driver.vehicle})</option>
            ))}
          </Form.Select>
        )
      ),
      ignoreRowClick: true
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
            <h1 className="text-warning">Dashboard</h1>
            <div className="mt-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Booking Details</h4>
                  <div className="table-responsive" style={{ overflowX: "auto" }}>
                    <DataTable
                      columns={columns}
                      data={sortedBookings} // Display sorted bookings
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

export default Dashboard;
