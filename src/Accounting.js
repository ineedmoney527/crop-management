import React, { useEffect, useState, useContext } from "react";
import TransactionTable from "./TransactionTable.js";
import TransactionBarChart from "./TransactionBarChart.js";
import TransactionPieChart from "./TransactionPieChart.js";
import AddTransactionForm from "./AddTransactionForm.js";
import "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import axios from "axios";

import "./Accounting.css";

const Accounting = () => {
  const [pageTitle, setPageTitle] = useState("Accounting");
  const [transactions, setTransactionss] = useState([]);
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2023");
  const years = ["2021", "2022", "2023", "2024", "2025"]; // Add more years as needed
  const user_id = 1;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/accounting/1`
      );
      console.log("accounting: ", response.data);
      setTransactionss(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/accounting",
        newTransaction
      );

      if (!response.data.success) {
        alert("Transaction is not added successfully!");
      } else {
        setOpenAddTransaction(false); // Close the dialog after adding transacti
        alert("Transaction added successfully!");
        fetchTransactions();
      }
    } catch (e) {
      alert("An error occured!");
    }
  };

  // const handleUpdateTransaction = async (id) => {
  //   try {
  //     const response = await axios.post("http://localhost:5050/api/market", {
  //       ...data,
  //     });

  //     if (!response.data.success) {
  //       setError("root", { message: "Server Error. Please try again" });
  //     } else {
  //       onClose();
  //       reset();
  //       alert("Product added successfully!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // Handle network errors or other unexpected errors
  //     setError("root", {
  //       message: "An error occurred while processing your request.",
  //     });
  //   }
  // };

  const handleDeleteTransaction = async (id) => {
    console.log(id);
    if (
      window.confirm(
        `Are you sure you want to delete this product with ID ${id}?`
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5050/api/accounting/${id}`
        );
        alert("Transaction deleted successfully");
        fetchTransactions();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleDeleteTransactions = async (selectedRows) => {
    if (selectedRows.length === 0) {
      return;
    }

    try {
      const id = selectedRows.map((row) => row.id).join(",");
      if (
        window.confirm(
          `Are you sure you want to delete selected products with ID ${id}?`
        )
      ) {
        const response = await axios.delete(
          `http://localhost:5050/api/accounting/rows/${id}`
        );
        alert("Transactions deleted successfully");
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert(error.message);
    }
  };
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setPageTitle(e.target.value);
  };

  useEffect(() => {
    // Navigate to a specific page based on the selected title
    switch (pageTitle) {
      case "Crop Summary":
        navigate("/CropSummary");
        break;

      case "Weather":
        navigate("/Weather");
        break;
      // Add more cases for additional options if needed
      default:
        navigate("/Accounting");
        break;
    }
  }, [pageTitle]);

  useEffect(() => {
    if (transactions) {
      let revenue = 0;
      let expenses = 0;
      transactions.map((transaction) => {
        const amount = parseFloat(transaction.amount || 0);
        if (transaction.type === "Income") {
          revenue += amount;
        } else if (transaction.type === "Expense") {
          expenses += amount;
        }
      });
      const profit = revenue - expenses;
      setTotalRevenue(revenue);
      setTotalExpenses(expenses);
      setTotalProfit(profit);
    }
  }, [transactions]);

  return (
    <div>
      <select
        className="select-page"
        value={pageTitle}
        onChange={handleTitleChange}
        style={{ fontSize: "24px", width: "200px" }}
      >
        <option value="Accounting">Accounting</option>
        <option value="Crop Summary">Farm Summary</option>
        <option value="Weather">Weather</option>
        {/* Add more options as needed */}
      </select>
      <div
        className="summary-year"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          fontFamily: "Inter",
        }}
      >
        {/* {" Summary"} */}
        <h1 className="summary-title">Summary</h1>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          // style={{
          //   width: "80px",
          //   padding: "5px",
          //   marginTop: "10px",
          //   borderRadius:'10px' }}
          className="select-box"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="summary-graphs">
        <Stack className="summary-bar-chart">
          <div className="pie-chart-title" style={{ fontWeight: "bold" }}>
            Income VS Expenses
          </div>
          <TransactionBarChart transactions={transactions} />
        </Stack>
        <Stack className="summary-pie-chart">
          <TransactionPieChart transactions={transactions} />
        </Stack>
      </div>
      <div
        className="transaction-table-container"
        style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        <div className="tags">
          <label className="tagsBars">
            Revenue: RM {totalRevenue.toFixed(2)}
          </label>
          <label className="tagsBars-Expenses">
            Expenses: RM {totalExpenses.toFixed(2)}
          </label>
          <label className="tagsBars">
            Profit: RM {totalProfit.toFixed(2)}
          </label>
          <div className="add-transaction">
            <Button
              className="add-transaction-button"
              onClick={() => setOpenAddTransaction(true)}
              variant="contained"
              sx={{
                mb: "10px",
                bgcolor: "#9FC173",
                "&:hover": {
                  bgcolor: "#495D44",
                  opacity: "70%",
                  color: "white",
                },
              }}
            >
              Add Transaction
            </Button>
          </div>
        </div>
        <div className="transaction-table">
          {transactions.length > 0 && (
            <TransactionTable
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onDeleteRows={handleDeleteTransactions}
              // onUpdate={handleUpdateTransaction}
              setTransactions={setTransactionss}
            />
          )}
        </div>
      </div>
      <Dialog
        open={openAddTransaction}
        onClose={() => setOpenAddTransaction(false)}
      >
        <DialogTitle sx={{ fontSize: 30, fontWeight: "bold", mb: "5px" }}>
          Add Transaction
        </DialogTitle>
        <DialogContent sx={{ pl: "10px", pr: "10px", pt: "10px" }}>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddTransaction(false)}
            sx={{
              mb: "2px",
              bgcolor: "#9FC173",
              height: "40px",
              color: "white",
              "&:hover": {
                bgcolor: "#495D44",
                opacity: "70%",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Accounting;
