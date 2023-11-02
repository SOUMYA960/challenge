import React from "react";

function TableRow({ user, isSelected, onSelectRow, onEditRow, onDeleteRow }) {
  return (
    <tr style={{ backgroundColor: isSelected ? "#ccc" : "inherit" }}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectRow(user.id)}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={() => onEditRow(user.id)}>Edit</button>
        <button onClick={() => onDeleteRow(user.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default TableRow;
