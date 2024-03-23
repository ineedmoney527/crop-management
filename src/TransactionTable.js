import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const headCells = [
  { id: "date", label: "Date", type: "date" },
  { id: "payee", label: "Payee" },
  { id: "category", label: "Category" },
  { id: "description", label: "Description" },
  { id: "type", label: "Type" },
  { id: "amount", label: "Amount", type: "amount" },
];

const TransactionTable = ({ transactions, onDelete, setTransactions }) => {
  const [editableId, setEditableId] = useState(null);

  const handleEdit = (id) => {
    setEditableId(id);
  };

  const handleSave = () => {
    setEditableId(null);
  };

  const handleChange = (e, id, type) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Handle value transformations based on type
    if (type === "date") {
      updatedValue = new Date(value).toISOString().split("T")[0];
    } else if (type === "amount") {
      // Remove any non-numeric characters except for '.' and limit to one decimal point
      updatedValue = value
        .replace(/[^\d.]/g, "")
        .replace(/^(\d*\.\d*).*/, "$1");
    }

    // Update the transaction with the new value
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, [name]: updatedValue }
        : transaction
    );
    // Update the state with the updated transactions
    setTransactions(updatedTransactions);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const renderCell = (row, id, name, type) => {
    if (editableId === id) {
      if (type === "date") {
        return (
          <input
            type="date"
            name={name}
            value={row[name]}
            onChange={(e) => handleChange(e, id, type)}
          />
        );
      } else {
        return (
          <input
            type="text"
            name={name}
            value={row[name]}
            style={{ width: "100px" }}
            onChange={(e) => handleChange(e, id, type)}
          />
        );
      }
    } else {
      return row[name];
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  {renderCell(row, row.id, headCell.id, headCell.type)}
                </TableCell>
              ))}
              <TableCell>
                {editableId === row.id ? (
                  <>
                    <IconButton onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
