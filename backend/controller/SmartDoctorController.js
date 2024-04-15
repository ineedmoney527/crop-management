import multer from "multer";
import mutler from "multer";
import OpenAI from "openai";
import fs from "fs";
import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

const openAIApiKey = "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";
const openai = new OpenAI({ apiKey: openAIApiKey });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = mutler({ storage: storage }).single("file");

let filePath;
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
    console.log(filePath);
  });
});

router.post("/analyze", async (req, res) => {
  try {
    const image = fs.readFileSync(filePath, "base64");
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: req.body.message },
            {
              type: "image_url",
              image_url: `data:image/png;base64,${image}`,
            },
          ],
        },
      ],
    });

    console.log(response.choices[0]);
    return res.json(response.choices[0]);
  } catch (e) {
    console.log(e);
  }
});

// GET route to fetch data
router.get("/", async (req, res) => {
  try {
    const sqlQuery = `SELECT Posts.*, Users.Username AS AuthorUsername,
      Users.ProfilePictureURL AS Avatar, GROUP_CONCAT(Media.MediaType) AS MediaTypes,
      GROUP_CONCAT(Media.MediaURL) AS MediaURLs
      FROM Posts
      INNER JOIN Users ON Posts.UserID = Users.UserID
      LEFT JOIN Media ON Posts.PostID = Media.PostID
      GROUP BY Posts.PostID`;

    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
