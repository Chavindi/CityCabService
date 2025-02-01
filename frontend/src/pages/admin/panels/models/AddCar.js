import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCar = ({ handleClose, fetchCars }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    number: "",
    color: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send POST request to backend to add the car
    axios
      .post("http://localhost:8080/cars", formData)
      .then((response) => {
        console.log("Car added:", response.data);
        fetchCars();  // Reload car list after adding
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding car:", error);
      });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Car</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="model" className="form-label">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="form-label">Number Plate</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Car</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
