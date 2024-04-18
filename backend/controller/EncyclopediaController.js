import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

// GET route to fetch data
router.get("/crops", async (req, res) => {
  try {
    const sqlQuery = `
            SELECT e.encyclopedia_id, e.name AS crop_name, e.scientific_name, CONCAT('/encyclopedia/', e.image) AS image_path, o.name AS other_name
            FROM encyclopedia e
            LEFT JOIN other_names o ON e.encyclopedia_id = o.encyclopedia_id
            ORDER BY e.encyclopedia_id, o.other_id;
        `;

    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const crops = [];
        results.forEach((row) => {
          const existingCrop = crops.find(
            (crop) => crop.name === row.crop_name
          );
          if (existingCrop) {
            existingCrop.otherNames.push(row.other_name);
          } else {
            const newCrop = {
              id: row.encyclopedia_id,
              name: row.crop_name,
              scientificName: row.scientific_name,
              image: row.image_path, // Modified to use formatted image path
              otherNames: row.other_name ? [row.other_name] : [],
            };
            crops.push(newCrop);
          }
        });
        res.status(200).json(crops);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/test", async (req, res) => {
  const a = req.query.name;
  console.log("Params:", a);
  try {
    if (a === "test") {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: a });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/info/:name", async (req, res) => {
  try {
    const { name } = req.params;
    console.log("Name:", name);
    const sqlQuery = `
          SELECT
              e.name,
              e.scientific_name AS scientificName,
              GROUP_CONCAT(DISTINCT ons.name SEPARATOR ', ') AS otherNames,
              CONCAT('/encyclopedia/', e.image) AS image,
              ei.description AS description,
              GROUP_CONCAT(DISTINCT CONCAT(ia.attribute_name, ':', ia.attribute_value) SEPARATOR '|||') AS attributes
          FROM encyclopedia e
          JOIN encyclopedia_info ei ON e.encyclopedia_id = ei.encyclopedia_id
          LEFT JOIN info_attributes ia ON ei.info_id = ia.info_id
          LEFT JOIN other_names ons ON e.encyclopedia_id = ons.encyclopedia_id
          WHERE e.name = ?
          GROUP BY e.encyclopedia_id;
            `;

    connection.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: "Entry not found" });
          return;
        }

        const info = {
          name: results[0].name,
          scientificName: results[0].scientificName,
          otherNames: results[0].otherNames,
          image: results[0].image,
          description: results[0].description,
          attributes: results[0].attributes.split("|||").reduce((obj, pair) => {
            const [attributeName, ...attributeValueParts] = pair.split(":");
            const attributeValue = attributeValueParts.join(":"); // Re-join remaining parts into attributeValue
            obj[attributeName.trim()] = attributeValue.trim();
            return obj;
          }, {}),
        };
        res.status(200).json(info);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/cares/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const sqlQuery = `
        SELECT care, description FROM encyclopedia_cares ec JOIN encyclopedia e ON ec.encyclopedia_id = e.encyclopedia_id WHERE e.name = ?;
        `;
    connection.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const cares = results.map((result) => ({
          name: result.care,
          description: result.description,
        }));
        res.status(200).json(cares);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/faq/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const sqlQuery = `
        SELECT faq_id, question, answer FROM encyclopedia_faq f JOIN encyclopedia e ON f.encyclopedia_id = e.encyclopedia_id WHERE e.name = ?;
        `;
    connection.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const faqs = results.map((result) => ({
          id: result.faq_id,
          question: result.question,
          answer: result.answer,
        }));
        res.status(200).json(faqs);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/pests/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const sqlQuery = `
        SELECT ep.name, description, solution, CONCAT("/encyclopedia/pest/", ep.image) AS image FROM encyclopedia_pest ep JOIN encyclopedia e ON ep.encyclopedia_id = e.encyclopedia_id WHERE e.name = ?;
        `;
    connection.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const pests = results.map((result) => ({
          name: result.name,
          description: result.description,
          solution: result.solution,
          image: result.image,
        }));
        console.log("Pests:", pests);
        res.status(200).json(pests);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/diseases/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const sqlQuery = `
            SELECT ed.name, description, solution, CONCAT("/encyclopedia/disease/", ed.image) AS image FROM encyclopedia_disease ed JOIN encyclopedia e ON ed.encyclopedia_id = e.encyclopedia_id WHERE e.name = ?;
            `;
    connection.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const diseases = results.map((result) => ({
          name: result.name,
          description: result.description,
          solution: result.solution,
          image: result.image,
        }));
        console.log("Diseases:", diseases);
        res.status(200).json(diseases);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
