import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Slider,
  Divider,
  Stack,
  Grid,
  Button,
  TextField,
  styled,
  Avatar,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  TabContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TransactionTable = ({
  transactions,
  onDelete,
  onDeleteRows,
  onUpdate,
  setTransactions,
}) => {
  const [editableId, setEditableId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    if (updatedValue === "") updatedValue = 0;

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

  const handleDeleteRows = (selectedRows) => {
    onDeleteRows(selectedRows);
    setSelectedRows([]);
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

  const headCells = [
    { id: "date", label: "Date", type: "date" },
    { id: "payee", label: "Payee" },
    { id: "category", label: "Category" },
    { id: "description", label: "Description" },
    { id: "type", label: "Type" },
    { id: "amount", label: "Amount", type: "amount" },
  ];

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          "Transaction History"
        )}

        {
          numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteRows(selectedRows)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )
          // <Tooltip sx={{ display: "flex", gap: "20px" }} title="Filter list">
          //   <IconButton onClick={handleAddNewProduct}>
          //     {`My Products ${"    "}`}

          //     <AddCircleIcon />
          //   </IconButton>
          // </Tooltip>
        }
      </Toolbar>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selectedRows?.length} />
        <TableContainer>
          <DataGrid
            rows={transactions}
            checkboxSelection
            disableRowSelectionOnClick
            headerClassName="header-center"
            disableSelectionOnClick
            // onRowClick={(row) => {
            //   console.log("haha");
            // }}
            onRowSelectionModelChange={(ids) => {
              setSelectedRows(
                ids.map((id) => transactions.find((row) => row.id === id))
              );
            }}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            pagination
            autoHeight
            slots={{
              toolbar: GridToolbar,
            }}
            {...transactions}
            columns={[
              {
                field: "id",
                headerName: "ID",
                width: 100,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "date",
                headerName: "Date",
                width: 150,
                align: "center",
                headerAlign: "center",
                editable: true,
              },
              {
                field: "counterparty",
                headerName: "Payee/Payer",
                width: 200,
                align: "center",
                headerAlign: "center",
                editable: true,
              },
              {
                field: "category",
                headerName: "Category",
                width: 200,
                align: "center",
                headerAlign: "center",
                editable: true,
              },
              {
                field: "description",
                headerName: "Description",
                width: 300,
                align: "center",
                headerAlign: "center",
                editable: true,
              },
              {
                field: "type",
                headerName: "Type",
                width: 150,
                align: "center",
                headerAlign: "center",
                editable: true,
              },
              {
                field: "amount",
                headerName: "Amount",
                width: 150,
                align: "center",
                headerAlign: "center",
                type: "number",
                editable: true,
              },
              {
                field: "action",
                headerName: "Action",
                headerAlign: "center",
                width: 100,
                align: "center",
                renderCell: (params) => (
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(params.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(params.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
                disableSelectionOnClick: false,
              },
            ]}
            onEditCellChangeCommitted={(params) => {
              handleChange(params.event, params.id, params.field);
              handleSave();
            }}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TransactionTable;
