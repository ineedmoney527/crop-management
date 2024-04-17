import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

// API to save shape data to MySQL

app.post("/api/shapes", (req, res) => {
  const { id, latlngs, crops, soilType } = req.body;

  const sql =
    "INSERT INTO shapes (id, latlngs, crops, soilType) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [
      id,
      JSON.stringify(latlngs),
      JSON.stringify(crops),
      JSON.stringify(soilType),
    ],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error saving shape data" });
      } else {
        res.status(200).send({ message: "Shape data saved successfully" });
      }
    }
  );
});

// API to fetch all shapes from MySQL
app.get("/api/shapes", (req, res) => {
  const sql = "SELECT * FROM shapes";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error fetching shape data" });
    } else {
      res.status(200).send(results);
    }
  });
});

export default router;
