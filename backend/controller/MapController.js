import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

// API to save shape data to MySQL

router.post("/", (req, res) => {
  const { user_id, latlngs, crops, soilType } = req.body;
  const insertQuery = `
        INSERT INTO map (user_id,crop_id, latlngs, address, tilage_depth, name, nitrogen, ph, phosphorus, potassium, soil_texture, tilage_practice,tilage_timing)
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
  const latlngsJSON = JSON.stringify(latlngs);
  const values = [
    user_id,
    1,
    latlngsJSON,
    soilType.address,
    soilType.depth,
    soilType.name,
    soilType.nitrogen,
    soilType.ph,
    soilType.phosphorus,
    soilType.potassium,
    soilType.texture,
    soilType.tilage,
    soilType.time,
  ];

  // Execute the insert query
  connection.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
    } else {
      console.log("Data inserted successfully");
    }
  });
});

router.get("/addCrop", (req, res) => {
  const sql = "SELECT * FROM crop";
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err });
    } else {
      res.status(200).send(results);
    }
  });
});
// API to fetch all shapes from MySQL
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM map where user_id=" + req.params.id;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error fetching shape data" });
    } else {
      res.status(200).send(results);
    }
  });
});
router.put("/crop/:cropId/:id", (req, res) => {
  const sql = "UPDATE `map` SET `crop_id` =? WHERE id = ?";
  const cropId = req.params.cropId;
  const id = req.params.id;

  connection.query(sql, [cropId, id], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

export default router;
