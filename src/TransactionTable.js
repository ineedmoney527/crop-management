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

function customCheckbox(theme) {
  return {
      '& .MuiCheckbox-root svg': {
          width: 16,
          height: 16,
          backgroundColor: 'transparent',
          border: `1px solid ${
              theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
          }`,
          borderRadius: 2,
      },
      '& .MuiCheckbox-root svg path': {
          display: 'none',
      },
      '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
          backgroundColor: '#73A9AD',
          borderColor: '#73A9AD',
      },
      '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
          position: 'absolute',
          display: 'table',
          border: '2px solid #fff',
          borderTop: 0,
          borderLeft: 0,
          transform: 'rotate(45deg) translate(-50%,-50%)',
          opacity: 1,
          transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
          content: '""',
          top: '50%',
          left: '39%',
          width: 5.71428571,
          height: 9.14285714,
      },
      '& .MuiCheckbox-indeterminate .MuiIconButton-label:after': {
          width: 8,
          height: 8,
          backgroundColor: '#1890ff',
          transform: 'none',
          top: '39%',
          border: 0,
      },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  letterSpacing: 'normal',
  '& .MuiDataGrid-root': {
      borderRadius: 20, // Set the border radius here (adjust the value as needed)
      overflow: 'hidden', // Optional: Hide overflow content if needed
  },
  '& .MuiDataGrid-columnsContainer .MuiDataGrid-iconSeparator': {
      color: '#fff', // Set your desired color here
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
          theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-cell': {
      color:
          theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center', // Align text center
      padding: theme.spacing(1),
  },
  '& .MuiPaginationItem-root': {
      borderRadius: 0,
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle': {
      backgroundColor: '#90C8AC', // Change header background color here
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center', // Align text center
      padding: theme.spacing(1),
      color: '#fff',
      fontSize: '17px',
  },
  '& .MuiDataGrid-sortIcon, .MuiDataGrid-menuIconButton': {
      color: '#fff',
  },
  ...customCheckbox(theme),
}));

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
      <Stack direction={"row"}>
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
          <Typography
          variant="h4"
          sx={{fontWeight:"bold", color: '#383a3b'}}
          >Transaction History</Typography>
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
        }
      </Toolbar>
      </Stack>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selectedRows?.length} />
        <TableContainer>
          <StyledDataGrid
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
