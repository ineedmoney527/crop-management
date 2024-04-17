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
  const userId = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is 'amount' and value is empty, set it to '0'
    const newValue =
      name === "amount" ? (value === "" ? 0 : parseFloat(value)) : value;

    // Update the transaction state with the updated value
    setTransaction({ ...transaction, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ ...transaction, user_id: userId }); // Pass the new transaction data to the callback function
    console.log(transaction);
    // Clear form fields after submission
    setTransaction({
      date: new Date().toISOString().substr(0, 10),
      user_id: userId,
      payee: "",
      category: "",
      description: "",
      type: "",
      amount: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{pt:'10px'}} >
        <Grid item xs={12}>
          <TextField
            className="date-input"
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
            className="payee-input"
            fullWidth
            name="payee"
            label="Payee"
            value={transaction.payee}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="category-input"
            fullWidth
            name="category"
            label="Category"
            value={transaction.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="description-input"
            fullWidth
            name="description"
            label="Description"
            value={transaction.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="type-input"
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
            className="amount-input"
            name="amount"
            label="Amount"
            type="text"
            value={transaction.amount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth
            sx={{
              mb: '10px',
              bgcolor: '#9FC173',
              height: '40px',
              "&:hover": {
                bgcolor: "#495D44",
                opacity: '70%',
                color: 'white'
            },
            }}
          >
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTransactionForm;
