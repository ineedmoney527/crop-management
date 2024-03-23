import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const AddTransactionForm = ({ onAddTransaction }) => {
  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().substr(0, 10),
    payee: "",
    category: "",
    description: "",
    type: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction(transaction); // Pass the new transaction data to the callback function
    // Clear form fields after submission
    setTransaction({
      date: new Date().toISOString().substr(0, 10),
      payee: "",
      category: "",
      description: "",
      type: "",
      amount: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="payee"
            label="Payee"
            value={transaction.payee}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="category"
            label="Category"
            value={transaction.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={transaction.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="type"
            label="Type"
            value={transaction.type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="amount"
            label="Amount"
            type="text"
            value={transaction.amount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTransactionForm;
