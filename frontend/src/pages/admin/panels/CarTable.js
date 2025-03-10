import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AddCar from "../panels/models/AddCar";
import UpdateCar from "../panels/models/UpdateCar";


const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios
      .get("http://localhost:8080/cars")
      .then((response) => {
        console.log("Fetched Cars:", response.data); // Debug log
        setCars(response.data);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  };

  const handleUpdateCar = (car) => {
    setSelectedCar(car);  // Pass selected car data
    setShowUpdateModal(true);  // Open modal
  };

  const handleAddCar = () => {
    setShowModal(true);  // Open modal when Add button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close modal
    setShowUpdateModal(false);
  };



  const handleDeleteCar = (id) => {
    axios
      .delete(`http://localhost:8080/cars/${id}`)
      .then(() => {
        console.log("Car deleted");
        fetchCars(); // Refresh the car list after deletion
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  // Define table columns
  const columns = [
    { name: "Brand", selector: (row) => row.brand, sortable: true },
    { name: "Model", selector: (row) => row.model, sortable: true },
    { name: "Number Plate", selector: (row) => row.number, sortable: true },
    { name: "Color", selector: (row) => row.color, sortable: true },
    { name: "Year", selector: (row) => row.year, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="btn btn-primary me-2" onClick={() => handleUpdateCar(row)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger"  onClick={() => handleDeleteCar(row.id)}>
            <FaTrash />
          </button>
        </>
      ),
      ignoreRowClick: true,
    },
  ];


  return (
    <div className="container mt-4">
      <h3>Manage Cars</h3>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={handleAddCar}>
          Add Car
        </button>
      </div>
      <DataTable columns={columns} data={cars} pagination highlightOnHover />

      {/* AddCar Modal */}
      {showModal && (
        <AddCar handleClose={handleCloseModal} fetchCars={fetchCars} />
      )}

            {/* UpdateCar Modal */}
            {showUpdateModal && (
        <UpdateCar
          car={selectedCar}  // Pass selected car data to modal
          handleClose={handleCloseModal}
          fetchCars={fetchCars}
          carData={selectedCar}
        />
      )}
    </div>
  );
};
  

export default CarTable;
