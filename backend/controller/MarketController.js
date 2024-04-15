import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

// GET route to fetch data
router.get("/:id/:buy", async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters
    const isBuyer = req.params.buy;
    console.log("isbuyer" + isBuyer);
    let sqlQuery;
    if (isBuyer === "1") {
      console.log("woh");
      sqlQuery = `SELECT id, name, description, category, price_per_unit,
      quantity, image_url, user_id FROM market WHERE user_id != ?`;
    } else {
      console.log("miao");
      sqlQuery = `SELECT id, name, description, category, price_per_unit,
      quantity, image_url, user_id FROM market WHERE user_id = ?`;
    }

    await connection.query(sqlQuery, [userId], (err, results) => {
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
    const {
      name,
      fileName,
      description,
      price_per_unit,
      quantity,
      category,
      userId,
    } = req.body;
    const query =
      "INSERT INTO market (name, description, category, price_per_unit, quantity, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      description,
      category,
      price_per_unit,
      quantity,
      fileName,
      userId,
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

router.put("/product/:id", async (req, res) => {
  try {
    const {
      id,
      name,
      fileName,
      description,
      price_per_unit,
      quantity,
      category,
    } = req.body;
    const query =
      "UPDATE market SET name = ?, description = ?, category = ?, price_per_unit = ?, quantity = ?, image_url = ? WHERE id = ? ";
    const values = [
      name,
      description,
      category,
      price_per_unit,
      quantity,
      fileName,
      id,
    ];
    await connection.query(query, values);
    res
      .status(200)
      .json({ success: true, message: "Market item updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const query = "UPDATE market SET quantity = $1 WHERE id = $2";
    const values = [quantity, id];

    await connection.query(query, values);

    res.status(200).json({ message: "Market item updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/rows/:ids", async (req, res) => {
  const ids = req.params.ids.split(",").map((id) => parseInt(id, 10));

  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "You must provide an array of Codes to delete." });
  }

  const queryString = "DELETE FROM `market` WHERE `id` IN  (?)";
  connection.query(queryString, [ids], (err, data) => {
    if (err) {
      console.error("Error deleting books:", err);
      res
        .status(500)
        .json({ message: "An error occurrdeed while deleting the books." });
    } else {
      res.json({ message: "Products deleted successfully." });
    }
  });
});
router.delete("/:id", async (req, res) => {
  const queryString = "DELETE FROM market WHERE `id` =" + req.params.id;
  connection.query(queryString, (err, data) =>
    res.json(err ? { message: err.message } : "Product deleted successfully")
  );
});

export default router;
