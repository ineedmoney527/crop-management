import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

//read user
router.get("/", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM users WHERE UserID = $1";

    const { rows } = await connection.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Pay route
router.post("/pay", async (req, res) => {
  const { cartItems, userId } = req.body;

  try {
    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    let userBalance; // Declare userBalance variable here

    // Check user's balance
    const sqlBalanceQuery = `SELECT balance FROM users WHERE UserID = ?`;
    connection.query(sqlBalanceQuery, [userId], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      userBalance = result[0].balance; // Assign userBalance here

      console.log(userBalance); // This will log the user's balance
      console.log(totalPrice); // This will log the total price

      if (userBalance >= totalPrice) {
        // Sufficient balance, update quantities and deduct balance
        const updateQuantityPromises = cartItems.map(async (item) => {
          const { id, quantity } = item;
          const sqlUpdateQuery = `
              UPDATE market SET quantity = quantity - ? WHERE id = ?
            `;
          await connection.query(sqlUpdateQuery, [quantity, id]);
        });
        Promise.all(updateQuantityPromises)
          .then(() => {
            const sqlUpdateBalanceQuery = `
                UPDATE users SET balance = balance - ? WHERE UserID = ?
              `;
            connection.query(
              sqlUpdateBalanceQuery,
              [totalPrice, userId],
              (err, result) => {
                if (err) {
                  console.error("Error updating balance:", err);
                  return res.status(500).json({ error: "Server error" });
                }
                res.status(200).json({ message: "Payment successful" });
              }
            );
          })
          .catch((err) => {
            console.error("Error updating quantities:", err);
            res.status(500).json({ error: "Server error" });
          });
      } else {
        // Insufficient balance, send alert
        res.status(400).json({ error: "Insufficient balance" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
