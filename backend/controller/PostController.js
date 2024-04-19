import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

router.get("/Forum", (req, res) => {
  // Query to fetch data from the database
  const sql = `SELECT Posts.*, Users.Username AS AuthorUsername, Users.ProfilePictureURL AS Avatar, GROUP_CONCAT(Media.MediaType) AS MediaTypes, GROUP_CONCAT(Media.MediaURL) AS MediaURLs FROM Posts INNER JOIN Users ON Posts.UserID = Users.UserID LEFT JOIN Media ON Posts.PostID = Media.PostID GROUP BY Posts.PostID;`;
  // Execute the query
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching comminuty data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
    console.log("display Community data:", rows); // Log the fetched data
    res.json(rows); // Send the fetched data as JSON response
  });
});

router.post("/AddNewPost/:id", (req, res) => {
  const content = req.body.content; // Extract Media from req.body
  const userId = req.params.id;
  const files = req.body.file;
  console.log("Caption content here: ", content);
  const query = `INSERT INTO Posts (UserID, Content) VALUES (?,?);`;
  connection.query(query, [userId, content], (err, result) => {
    if (err) {
      console.error("Error inserting new post data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    const postId = result.insertId; // Get the ID of the newly inserted post
    // If there are media files, insert their filenames into the Media table
    if (files && files.length > 0) {
      console.log("yes");

      const pathNames = files.map((image) => image.path);
      //Create an array of arrays with PostID and MediaURL values
      const mediaValues = pathNames.map((path, index) => [
        postId,
        `./images/${path}`,
      ]);

      // Construct the mediaQuery with multiple value placeholders
      const mediaQuery = `INSERT INTO Media (PostID, MediaURL) VALUES ?`;

      // Execute the query with mediaValues as the parameter
      connection.query(mediaQuery, [mediaValues], (mediaErr, mediaResult) => {
        if (mediaErr) {
          console.error("Error inserting media data:", mediaErr);
          res
            .status(500)
            .json({ success: false, message: "Internal server media error" });
          return;
        }

        console.log("Media inserted successfully:", mediaResult);
        res.json({ success: true, postId });
      });
    }
  });
});

router.get("/Comment/:postId", (req, res) => {
  // Change the route to /comments
  const postID = req.params.postId;
  console.log("Display Comment: ", postID);
  const query = `SELECT Comments.CommentID, Users.Username, Users.ProfilePictureURL, Comments.Content, Comments.CommentDate FROM Comments INNER JOIN Users ON Comments.UserID = Users.UserID JOIN Posts ON Users.UserID = Posts.PostID WHERE Comments.PostID = ?;`;
  connection.query(query, [postID], (err, results) => {
    if (err) {
      console.error("Error displaying comment:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    // Results will contain the selected columns for the user's reviews
    res.json({ data: results, success: true });
  });
});

router.get("/Likes", (req, res) => {
  // Change the route to /comments
  // const postID=req.params.postId
  // console.log("Display like postID: ",postID);
  const query = `SELECT P.PostID, P.Content, U.UserID, U.ProfilePictureURL FROM Likes L JOIN Posts P ON L.PostID = P.PostID JOIN Users U ON P.UserID = U.UserID WHERE L.UserID = 1;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error display liked posts:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    // Results will contain the selected columns for the user's reviews
    res.json({ data: results, success: true });
  });
});

router.get("/LikesCount/:postId", (req, res) => {
  const query = `SELECT COUNT(*) AS LikesCount FROM Likes WHERE PostID = ?;`;
  connection.query(query, [req.params.postId], (err, results) => {
    if (err) {
      console.error("Error fetching likes count:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Likes count:", results[0]);
    res.json({ data: results[0] });
  });
});

router.delete("/Unlikes/:postId", (req, res) => {
  const postID = req.params.postId;
  console.log("Unlike the postID:", postID);

  const query = `DELETE FROM Likes WHERE PostID = ? AND UserID = 1;
  `;
  connection.query(query, [postID], (err, results) => {
    if (err) {
      console.error("Error unliking /deleting the post:", err);
      res
        .status(500)
        .json({ message: "An error occurred while unlike the post." });
    } else {
      res.json({ message: "Post unlike successfully" });
    }
  });
});

router.put("/SetLikes/:postId", (req, res) => {
  const postID = req.params.postId;
  console.log("like the unlike postID:", postID);

  const query = `INSERT INTO Likes (PostID, UserID) VALUES (?, 1);
  `;
  connection.query(query, [postID], (err, results) => {
    if (err) {
      console.error("Error liking /inserting the post:", err);
      res
        .status(500)
        .json({ message: "An error occurred while like the post." });
    } else {
      res.json({ message: "Post like successfully" });
    }
  });
});

router.post("/LeaveComment/:postId", (req, res) => {
  // Change the route to /comments
  const postID = req.params.postId;
  const content = req.body.content;
  console.log("Insert Comment at, with: ", postID, content);
  const query = `INSERT INTO Comments (UserID, PostID, Content) VALUES (1, ?, ?);`;

  connection.query(query, [postID, content], (err, results) => {
    if (err) {
      console.error("Error inserting comment in post:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
    // Results will contain the selected columns for the user's reviews
    res.json({ data: results, success: false });
  });
});

export default router;
