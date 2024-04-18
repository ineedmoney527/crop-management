import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

router.get("/", (req, res) => {
  // Change the route to /comments
  // const postID=req.params.postId
  // console.log("Display like postID: ",postID);
  const query = `SELECT P.PostID, P.Content, U.UserID, U.ProfilePictureURL FROM Likes L JOIN Posts P ON L.PostID = P.PostID JOIN Users U ON P.UserID = U.UserID WHERE L.UserID = 1;
`;
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error display liked posts:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    // Results will contain the selected columns for the user's reviews
    res.json({ data: results, success: true });
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
  console.log("s" + content);
  console.log("Insert Comment at, with: ", postID, content);
  const query = `INSERT INTO Comments (UserID, PostID, Content) VALUES (1, ?, ?);
`;
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
router.delete("/Unlikes/:postId", (req, res) => {
  const postID = req.params.postId;
  console.log("Unlike the postID:", postID);

  const query = `DELETE FROM Likes WHERE PostID = ?;
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

export default router;
