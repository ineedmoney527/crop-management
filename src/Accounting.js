import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionBarChart from "./TransactionBarChart";
import TransactionPieChart from "./TransactionPieChart";
import AddTransactionForm from "./AddTransactionForm";
// import { Stack } from "@mui/material";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "./Accounting.css";

const Accounting = () => {
  const dummy_transactions = [
    {
      id: 1,
      date: "2023-06-12",
      payee: "John Doe",
      category: "Livestock Sales",
      description: "Sale of cattle",
      type: "Income",
      amount: 223.0,
    },
    {
      id: 2,
      date: "2023-05-26",
      payee: "Jane Smith",
      category: "Gardening",
      description: "Purchase of seeds and gardening tools",
      type: "Expense",
      amount: 500.0,
    },
    {
      id: 3,
      date: "2023-05-25",
      payee: "Mike Johnson",
      category: "Resale Items",
      description: "Resale of farm equipment",
      type: "Income",
      amount: 83.88,
    },
    {
      id: 4,
      date: "2023-05-25",
      payee: "John Doe",
      category: "Resale Items",
      description: "Resale of farm tools",
      type: "Income",
      amount: 60.0,
    },
    {
      id: 5,
      date: "2023-04-13",
      payee: "Jane Smith",
      category: "Miscellaneous Income",
      description: "Miscellaneous income source",
      type: "Income",
      amount: 860.0,
    },
    {
      id: 6,
      date: "2023-07-18",
      payee: "Alice Johnson",
      category: "Maintenance",
      description: "Repair of farming equipment",
      type: "Expense",
      amount: 120.0,
    },
    {
      id: 7,
      date: "2023-07-22",
      payee: "Bob Williams",
      category: "Transportation",
      description: "Transportation expenses for farm produce",
      type: "Expense",
      amount: 65.5,
    },
    {
      id: 8,
      date: "2023-08-05",
      payee: "Charlie Brown",
      category: "Fertilizers",
      description: "Purchase of fertilizers for crops",
      type: "Expense",
      amount: 300.0,
    },
    {
      id: 9,
      date: "2023-08-15",
      payee: "David Miller",
      category: "Rent",
      description: "Payment for renting farmland",
      type: "Expense",
      amount: 700.0,
    },
    {
      id: 10,
      date: "2023-08-20",
      payee: "Emma Davis",
      category: "Utilities",
      description: "Payment for farm utilities",
      type: "Expense",
      amount: 150.0,
    },
  ];

  const [transactions, setTransactions] = useState(dummy_transactions);
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setOpenAddTransaction(false); // Close the dialog after adding transaction
  };
  const handleDeleteTransaction = (id) => {
    // Logic to delete transaction with the given id
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions); // Update transactions state
  };

  useEffect(() => {
    let revenue = 0;
    let expenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        revenue += transaction.amount;
      } else if (transaction.type === "Expense") {
        expenses += transaction.amount;
      }
    });
    const profit = revenue - expenses;

    setTotalRevenue(revenue);
    setTotalExpenses(expenses);
    setTotalProfit(profit);
  }, [transactions]);

  //  { totalRevenue, totalExpenses, totalProfit } : {calculateRevenueExpensesProfit()};

  return (
    <div>
      <div
        className="page-title"
        style={{ textAlign: "left", fontWeight: "bold", fontSize: "24px" }}
      >
        Accounting
      </div>
      <Stack className="transaction-summary-container">
        <div
          className="summary-year"
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Inter",
          }}
        >
          2023 Summary
        </div>
        <div className="summary-graphs">
          <Stack className="summary-bar-chart">
            <div className="pie-chart-title" style={{ fontWeight: "bold" }}>
              Income VS Expenses
            </div>
            <TransactionBarChart transactions={transactions} />
          </Stack>
          <Stack className="summary-pie-chart">
            <div className="pie-chart-title" style={{ fontWeight: "bold" }}>
              Expenses by Category
            </div>
            <TransactionPieChart transactions={transactions} />
          </Stack>
        </div>
      </Stack>
      <div className="transaction-table-container">
        <div className="tags">
          <div className="revenue">Revenue: RM {totalRevenue}</div>
          <div className="expenses">Expenses: RM {totalExpenses}</div>
          <div className="profit">Profit: RM {totalProfit}</div>
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
          <TransactionTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            setTransactions={setTransactions}
          />
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
