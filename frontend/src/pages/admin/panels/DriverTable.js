import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Select from "react-select";
import AddDriver from "../panels/models/AddDriver";
import UpdateDriver from "../panels/models/UpdateDriver";

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);


  useEffect(() => {
    fetchDrivers();
    fetchCars();
  }, []);

  const fetchDrivers = () => {
    axios
      .get("http://localhost:8080/drivers")
      .then((response) => {
        console.log("Fetched Drivers:", response.data); // Debug log
        setDrivers(response.data);
      })
      .catch((error) => console.error("Error fetching drivers:", error));
  };

  const fetchCars = () => {
    axios
      .get("http://localhost:8080/cars")
      .then((response) => {
        // Convert car list to dropdown format
        const carOptions = response.data.map((car) => ({
          value: car.number, // Store car number as value
          label: `${car.number} (${car.brand} - ${car.model})`, // Display number + brand + model
        }));
        setCars(carOptions);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  };

  const handleCarChange = (selectedOption, rowId) => {
    setSelectedCar((prev) => ({
      ...prev,
      [rowId]: selectedOption,
    }));
  };

  const handleUpdateDriver = (driver) => {
    setSelectedDriver(driver);  // Pass selected driver data
    setShowUpdateModal(true);  // Open modal
  };

  const handleAddDriver = () => {
    setShowModal(true);  // Open modal when Add button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close modal
    setShowUpdateModal(false);
  };

  const handleDeleteDriver = (id) => {
    axios
      .delete(`http://localhost:8080/drivers/${id}`)
      .then(() => {
        console.log("Driver deleted");
        fetchDrivers(); // Refresh the driver list after deletion
      })
      .catch((error) => {
        console.error("Error deleting driver:", error);
      });
  };


  

  // Define table columns
  const columns = [
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone 1", selector: (row) => row.telephone1, sortable: true },
    // { name: "Phone 2", selector: (row) => row.telephone2, sortable: true },
    { name: "NIC", selector: (row) => row.nic, sortable: true },
    {
      name: "Car Assigned",
      cell: (row) => (
        <Select
          options={cars}
          value={selectedCar[row.id] || null}
          onChange={(selectedOption) => handleCarChange(selectedOption, row.id)}
          placeholder="Select Car"
        />
      ),
      ignoreRowClick: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="btn btn-primary me-2" onClick={() => handleUpdateDriver(row)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteDriver(row.id)}> 
            <FaTrash />
          </button>
        </>
      ),
      ignoreRowClick: true,
    },
  ];
  

  return (
    <div className="container mt-4">
      <h3>Manage Drivers</h3>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={handleAddDriver}>
          Add Driver
        </button>
      </div>
      <DataTable columns={columns} data={drivers} pagination highlightOnHover />

      {/* AddDriver Modal */}
      {showModal && (
        <AddDriver handleClose={handleCloseModal} fetchDrivers={fetchDrivers} />
      )}

      {/* UpdateDriver Modal */}
      {showUpdateModal && (
        <UpdateDriver
          driver={selectedDriver}  // Pass selected driver data to modal
          handleClose={handleCloseModal}
          fetchDrivers={fetchDrivers}
        />
      )}
    </div>
  );
};

export default DriverTable;
