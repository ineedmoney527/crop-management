import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters

    const sqlQuery = `SELECT a.*, u.Username
    FROM accounting a
    JOIN users u ON a.user_id = u.UserID
    WHERE a.user_id = ?`;

    connection.query(sqlQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, user_id, counterparty, category, description, type, amount } =
      req.body;
    const query =
      "INSERT INTO accounting ( date, user_id, counterparty,  category, description, type, amount) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      date,
      user_id,
      counterparty,
      category,
      description,
      type,
      amount,
    ];
    await connection.query(query, values);
    res
      .status(200)
      .json({ success: true, message: "Market item updated successfully." });
  } catch (error) {
    // Changed 'e' to 'error' here
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

router.delete("/rows/:ids", async (req, res) => {
  const ids = req.params.ids.split(",").map((id) => parseInt(id, 10));

  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "You must provide an array of Codes to delete." });
  }

  const queryString = "DELETE FROM `accounting` WHERE `id` IN  (?)";
  connection.query(queryString, [ids], (err, data) => {
    if (err) {
      console.error("Error deleting transactions:", err);
      res.status(500).json({
        message: "An error occurrdeed while deleting the transactions.",
      });
    } else {
      res.json({ message: "transactions deleted successfully." });
    }
  });
});

router.delete("/:id", async (req, res) => {
  const queryString = "DELETE FROM accounting WHERE `id` =" + req.params.id;
  connection.query(queryString, (err, data) =>
    res.json(
      err ? { message: err.message } : "Transaction deleted successfully"
    )
  );
});

export default router;
