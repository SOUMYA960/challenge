import React from "react";
import TableRow from "./TableRow";

function Table({
  users,
  selectedRows,
  onSelectRow,
  onEditRow,
  onDeleteRow,
  onSelectAllRows,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" onClick={onSelectAllRows} />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            user={user}
            isSelected={selectedRows.includes(user.id)}
            onSelectRow={onSelectRow}
            onEditRow={onEditRow}
            onDeleteRow={onDeleteRow}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
