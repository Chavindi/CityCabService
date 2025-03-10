import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateCar = ({ car, handleClose, fetchCars }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    number: "",
    color: "",
    year: "",
  });

  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand || "",
        model: car.model || "",
        number: car.number || "",
        color: car.color || "",
        year: car.year || "",
      });
    }
  }, [car]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = car ? `http://localhost:8080/cars/${car.id}` : "http://localhost:8080/cars";
    const method = car ? "put" : "post";  // Use PUT for update, POST for add

    axios({
      method: method,
      url: url,
      data: formData,
    })
      .then((response) => {
        console.log("Car updated:", response.data);
        fetchCars();  // Reload car list after updating
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{car ? "Update Car" : "Add Car"}</h5>
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
              <button type="submit" className="btn btn-primary">{car ? "Update Car" : "Add Car"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
