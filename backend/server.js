import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import ChatbotController from "../backend/controller/ChatbotController.js";
import SmartDoctorController from "../backend/controller/SmartDoctorController.js";
import MarketController from "../backend/controller/MarketController.js";
import UserController from "../backend/controller/UserController.js";
import AccountingController from "../backend/controller/AccoutingController.js";

import pool from "./config/dbConnection.js";
const app = express();
import dotenv from "dotenv";

dotenv.config();

// Enable CORS for all routes
app.use(cors());
// Configure body-parser for handling JSON and URL-encoded data with a limit of "10mb"
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
const PORT = process.env.PORT || 5050;
console.log(process.env.PORT);

app.use("/api/user", UserController);
// app.use("/api/chatbot", ChatbotController);
app.use("/api/vision", SmartDoctorController);
app.use("/api/market", MarketController);
app.use("/api/accounting", AccountingController);
app.listen(5050, () => {
  console.log(`Server running on port ${5050}`);
});


app.get('/Forum', (req, res) => {
  // Query to fetch data from the database
  const sql =
      `SELECT Posts.*, Users.Username AS AuthorUsername, Users.ProfilePictureURL AS Avatar, GROUP_CONCAT(Media.MediaType) AS MediaTypes, GROUP_CONCAT(Media.MediaURL) AS MediaURLs FROM Posts INNER JOIN Users ON Posts.UserID = Users.UserID LEFT JOIN Media ON Posts.PostID = Media.PostID GROUP BY Posts.PostID;`
  // Execute the query
  pool.query(sql, (err, rows) => {
      if (err) {
          console.error('Error fetching comminuty data:', err);
          res.status(500).json({success: false, message: 'Internal server error'});
          return;
      }
      console.log('display Community data:', rows); // Log the fetched data
      res.json(rows); // Send the fetched data as JSON response
  });
});


app.post('/AddNewPost', (req, res) => {
  const content = req.body.content; // Extract Media from req.body
  const files = req; // Extract files from req
  console.log("Caption content here: ", content);
  const query =
          `INSERT INTO Posts (UserID, Content) VALUES (12,?);`
  pool.query(query, [content], (err, result)=>{
      if(err){
          console.error('Error inserting new post data:', err);
          res.status(500).json({success: false, message: 'Internal server error'});
          return;
      }

      const postId = result.insertId; // Get the ID of the newly inserted post
      // If there are media files, insert their filenames into the Media table
      if (files && files.length > 0) {
          const mediaValues = files.map(file => [postId, file.filename]); // Extract filenames
          const mediaQuery = `INSERT INTO Media (PostID, MediaURL) VALUES ?;`;
          pool.query(mediaQuery, [mediaValues], (mediaErr, mediaResult) => {
              if (mediaErr) {
                  console.error('Error inserting media data:', mediaErr);
                  res.status(500).json({ success: false, message: 'Internal server media error' });
                  return;
              }

              console.log('Media inserted successfully:', mediaResult);
              res.json({ success: true, postId });
          });
      } else {
          // No media files, return success
          res.json({ success: true, postId });
      }
  });
})

app.get('/Comment/:postId', (req, res) => { // Change the route to /comments
  const postID=req.params.postId
  console.log("Display Comment: ",postID);
  const query =
`SELECT Comments.CommentID, Users.Username, Users.ProfilePictureURL, Comments.Content, Comments.CommentDate FROM Comments INNER JOIN Users ON Comments.UserID = Users.UserID JOIN Posts ON Users.UserID = Posts.PostID WHERE Comments.PostID = ?;`
  pool.query(query, [postID], (err, results) => {
      if (err) {
          console.error("Error displaying comment:", err);
          return res.status(500).json({ error: "Internal server error" });
      }
      // Results will contain the selected columns for the user's reviews
      res.json({ data: results, success: true });
  });
});

app.get('/Likes', (req, res) => { // Change the route to /comments
  // const postID=req.params.postId
  // console.log("Display like postID: ",postID);
  const query =
      `SELECT P.PostID, P.Content, U.UserID, U.ProfilePictureURL FROM Likes L JOIN Posts P ON L.PostID = P.PostID JOIN Users U ON P.UserID = U.UserID WHERE L.UserID = 1;
`
  pool.query(query, (err, results) => {
      if (err) {
          console.error("Error display liked posts:", err);
          return res.status(500).json({ error: "Internal server error" });
      }
      // Results will contain the selected columns for the user's reviews
      res.json({ data: results, success: true });
  });
});

app.delete('/Unlikes/:postId', (req,res)=>{
  const postID = req.params.postId;
  console.log("Unlike the postID:", postID);

  const query =
      `DELETE FROM Likes WHERE PostID = ?;
`
  pool.query(query, [postID], (err, results) => {
      if (err) {
          console.error("Error unliking /deleting the post:", err);
          res
              .status(500)
              .json({ message: "An error occurred while unlike the post." });
      } else {
          res.json({ message: "Post unlike successfully" });
      }
  });
})

app.put('/SetLikes/:postId', (req,res)=>{
  const postID = req.params.postId;
  console.log("like the unlike postID:", postID);

  const query =
      `INSERT INTO Likes (PostID, UserID) VALUES (?, 1);
`
  pool.query(query, [postID], (err, results) => {
      if (err) {
          console.error("Error liking /inserting the post:", err);
          res
              .status(500)
              .json({ message: "An error occurred while like the post." });
      } else {
          res.json({ message: "Post like successfully" });
      }
  });
})



app.post('/LeaveComment/:postId', (req, res) => { // Change the route to /comments
  const postID=req.params.postId
  const content=req.body.content;
  console.log("Insert Comment at, with: ",postID, content);
  const query =
      `INSERT INTO Comments (UserID, PostID, Content) VALUES (1, ?, ?);
`
  pool.query(query, [postID, content], (err, results) => {
      if (err) {
          console.error("Error inserting comment in post:", err);
          res.status(500).json({success: false, message: 'Internal server error'});
          return;
      }
      // Results will contain the selected columns for the user's reviews
      res.json({ data: results, success: false });
  });

});

