import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable.js";
import TransactionBarChart from "./TransactionBarChart.js";
import TransactionPieChart from "./TransactionPieChart.js";
import AddTransactionForm from "./AddTransactionForm.js";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

import "./Accounting.css";

const Accounting = () => {
  const [pageTitle, setPageTitle] = useState("Accounting");
  const [transactions, setTransactions] = useState(null);
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
        `http://localhost:5000/api/accounting/${user_id}`
      );
      setTransactions(response.data);
      console.log("sell" + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/accounting",
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
  //     const response = await axios.post("http://localhost:5000/api/market", {
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
          `http://localhost:5000/api/accounting/${id}`
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
          `http://localhost:5000/api/accounting/rows/${id}`
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
        value={pageTitle}
        onChange={handleTitleChange}
        style={{ fontWeight: "bold", fontSize: "24px", width: "200px" }}
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
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ width: "80px", padding: "5px", marginTop: "10px" }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {" Summary"}
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
          <div className="revenue">Revenue: RM {totalRevenue.toFixed(2)}</div>
          <div className="expenses">
            Expenses: RM {totalExpenses.toFixed(2)}
          </div>
          <div className="profit">Profit: RM {totalProfit.toFixed(2)}</div>
          <div className="add-transaction">
            <Button
              className="add-transaction-button"
              onClick={() => setOpenAddTransaction(true)}
              variant="contained"
              color="primary"
            >
              Add Transaction
            </Button>
          </div>
        </div>
        <div className="transaction-table">
          {transactions && (
            <TransactionTable
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              onDeleteRows={handleDeleteTransactions}
              // onUpdate={handleUpdateTransaction}
              setTransactions={setTransactions}
            />
          )}
        </div>
      </div>
      <Dialog
        open={openAddTransaction}
        onClose={() => setOpenAddTransaction(false)}
      >
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTransaction(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Accounting;
