import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import AddUser from "../panels/models/AddUser";
 import ViewUser from "../panels/models/ViewUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/users/all")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        const customers = response.data.filter(user => user.role === "CUSTOMER"); // Filter only customers
        setUsers(customers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        console.log("User deleted");
        fetchUsers(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Contact", selector: (row) => row.contactNumber, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "NIC", selector: (row) => row.nic, sortable: true },
    { name: "Registration Number", selector: (row) => row.registrationNumber, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
           <button className="btn btn-info me-2" onClick={() => handleViewUser(row)}>
            <FaEye />
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteUser(row.id)}>
            <FaTrash />
          </button>
        </>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h3>Manage Customers</h3>
      <DataTable columns={columns} data={users} pagination highlightOnHover />

      {showViewModal && <ViewUser user={selectedUser} handleClose={handleCloseModal} />}

    </div>
  );
};

export default UserTable;
