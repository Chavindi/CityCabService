import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateDriver = ({ driver, handleClose, fetchDrivers }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone1: "",
    telephone2: "",
    nic: "",
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        firstName: driver.firstName || "",
        lastName: driver.lastName || "",
        email: driver.email || "",
        telephone1: driver.telephone1 || "",
        telephone2: driver.telephone2 || "",
        nic: driver.nic || "",
      });
    }
  }, [driver]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = driver ? `http://localhost:8080/drivers/${driver.id}` : "http://localhost:8080/drivers";
    const method = driver ? "put" : "post";  // Use PUT for update, POST for add

    axios({
      method: method,
      url: url,
      data: formData,
    })
      .then((response) => {
        console.log("Driver updated:", response.data);
        fetchDrivers();  // Reload driver list after updating
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{driver ? "Update Driver" : "Add Driver"}</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telephone1" className="form-label">Telephone 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone1"
                  name="telephone1"
                  value={formData.telephone1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telephone2" className="form-label">Telephone 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone2"
                  name="telephone2"
                  value={formData.telephone2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nic" className="form-label">NIC</label>
                <input
                  type="text"
                  className="form-control"
                  id="nic"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">{driver ? "Update Driver" : "Add Driver"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDriver;
