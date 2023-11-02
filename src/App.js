/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Components/Table.js";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from API
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSelectRow = (userId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSelectAllRows = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((user) => user.id));
    }
  };

  const handleDeleteRow = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setSelectedRows((prevSelected) =>
      prevSelected.filter((id) => id !== userId)
    );
  };

  const handleEditRow = (userId) => {
    // Implement edit functionality here
    //console.log(`Editing user with ID ${userId}`);
    // Find the user by ID
    const userToEdit = users.find((user) => user.id === userId);

    // Open a modal or form for editing
    if (userToEdit) {
      const newName = prompt(
        `Edit Name for user ID ${userId}:`,
        userToEdit.name
      );
      if (newName !== null) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, name: newName } : user
          )
        );
      }
    }
  };

  const handleDeleteSelectedRows = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const itemsPerPage = 10;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="App">
      <h1> admin ui </h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        users={filteredUsers.slice(startIndex, endIndex)}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onDeleteRow={handleDeleteRow}
        onEditRow={handleEditRow}
      />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
      <button
        className="deleteBtn"
        onClick={handleDeleteSelectedRows}
        disabled={selectedRows.length === 0}
      >
        Delete Selected
      </button>
    </div>
  );
}

export default App;
