import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ChatbotController from "../backend/controller/ChatbotController.js";
import SmartDoctorController from "../backend/controller/SmartDoctorController.js";
import MarketController from "../backend/controller/MarketController.js";
import UserController from "../backend/controller/UserController.js";
import AccountingController from "../backend/controller/AccoutingController.js";
import MapCotroller from "../backend/controller/MapController.js";
import EncyclopediaController from "../backend/controller/EncyclopediaController.js";
import ToDoListController from "../backend/controller/ToDoListController.js";
import PostController from "../backend/controller/PostController.js";

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
app.use("/api/chatbot", ChatbotController);
app.use("/api/vision", SmartDoctorController);
app.use("/api/market", MarketController);
app.use("/api/todo", ToDoListController);
app.use("/api/post", PostController);
app.use("/api/map", MapCotroller);
app.use("/api/accounting", AccountingController);
app.use("/api/encyclopedia", EncyclopediaController);

app.listen(5050, () => {
  console.log(`Server running on port ${5050}`);
});

app.post("/api/update-quiz-count", (req, res) => {
  const { userId } = req.body;

  // Query to update the quiz count for the specified user
  const sql1 = `UPDATE user_achievements SET quiz_completed = quiz_completed + 1 WHERE user_id = ?`;

  // Query to update the level progress for the specified user
  const sql2 = `UPDATE user_gamification SET level_progress = level_progress + 10 WHERE user_id = ?`;

  // Update ranking after updating level or level_progress
  const updateRanking = (userId) => {
    const sqlUpdateRanking = `
            UPDATE user_gamification 
            SET ranking = (
                SELECT COUNT(*) + 1 
                FROM user_gamification AS u 
                WHERE u.level > user_gamification.level OR (u.level = user_gamification.level AND u.level_progress > user_gamification.level_progress)
            )
        `;

    pool.query(sqlUpdateRanking, [userId], (errRanking, resultRanking) => {
      if (errRanking) {
        console.error("Error updating ranking:", errRanking);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
    });
  };

  // Execute the first query to update quiz count
  pool.query(sql1, [userId], (err1, result1) => {
    if (err1) {
      console.error("Error executing SQL query 1:", err1);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    // Execute the second query to update level progress
    pool.query(sql2, [userId], (err2, result2) => {
      if (err2) {
        console.error("Error executing SQL query 2:", err2);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }

      // Fetch updated user data to get current level and progress
      const sqlFetch = `SELECT level, level_progress FROM user_gamification WHERE user_id = ?`;

      pool.query(sqlFetch, [userId], (errFetch, resultFetch) => {
        if (errFetch) {
          console.error("Error fetching user data:", errFetch);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        const userData = resultFetch[0];
        // updateRanking(userId);

        // Check if level progress is 100 or more
        if (userData.level_progress >= 100) {
          // Calculate new level and progress
          const newLevel = userData.level + 1;
          const newProgress = userData.level_progress - 100;

          // Update user_level and level_progress
          const sql3 = `UPDATE user_gamification SET level = ?, level_progress = ? WHERE user_id = ?`;
          pool.query(sql3, [newLevel, newProgress, userId], (err3, result3) => {
            if (err3) {
              console.error("Error updating user level and progress:", err3);
              res
                .status(500)
                .json({ success: false, message: "Internal server error" });
              return;
            }

            // Update ranking after updating level or level_progress
            updateRanking(userId);

            res.json({
              success: true,
              message:
                "Learning hours, level progress, and level updated successfully",
            });
          });
        } else {
          // Update ranking after updating level_progress
          updateRanking(userId);

          res.json({
            success: true,
            message: "Learning hours and level progress updated successfully",
          });
        }
      });
    });
  });
});

app.post("/api/update-lecture-hours", (req, res) => {
  const { userId } = req.body;

  // Query to update the quiz count for the specified user
  const sql1 = `UPDATE user_achievements SET lecture_hours = lecture_hours + 1 WHERE user_id = ?`;

  // Query to update the level progress for the specified user
  const sql2 = `UPDATE user_gamification SET level_progress = level_progress + 35 WHERE user_id = ?`;

  const updateRanking = (userId) => {
    const sqlUpdateRanking = `
            UPDATE user_gamification 
            SET ranking = (
                SELECT COUNT(*) + 1 
                FROM user_gamification AS u 
                WHERE u.level > user_gamification.level OR (u.level = user_gamification.level AND u.level_progress > user_gamification.level_progress)
            )
        `;

    pool.query(sqlUpdateRanking, [userId], (errRanking, resultRanking) => {
      if (errRanking) {
        console.error("Error updating ranking:", errRanking);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
    });
  };

  // Execute the first query to update quiz count
  pool.query(sql1, [userId], (err1, result1) => {
    if (err1) {
      console.error("Error executing SQL query 1:", err1);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    // Execute the second query to update level progress
    pool.query(sql2, [userId], (err2, result2) => {
      if (err2) {
        console.error("Error executing SQL query 2:", err2);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }

      // Check if both queries were successful
      if (result1.affectedRows > 0 && result2.affectedRows > 0) {
        // Fetch updated user data to get current level and progress
        const sqlFetch = `SELECT level, level_progress FROM user_gamification WHERE user_id = ?`;

        pool.query(sqlFetch, [userId], (errFetch, resultFetch) => {
          if (errFetch) {
            console.error("Error fetching user data:", errFetch);
            res
              .status(500)
              .json({ success: false, message: "Internal server error" });
            return;
          }

          const userData = resultFetch[0];

          // Check if level progress is 100 or more
          if (userData.level_progress >= 100) {
            // Calculate new level and progress
            const newLevel = userData.level + 1;
            const newProgress = userData.level_progress - 100;

            // Update user_level and level_progress
            const sql3 = `UPDATE user_gamification SET level = ?, level_progress = ? WHERE user_id = ?`;
            pool.query(
              sql3,
              [newLevel, newProgress, userId],
              (err3, result3) => {
                if (err3) {
                  console.error(
                    "Error updating user level and progress:",
                    err3
                  );
                  res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
                  return;
                }
                res.json({
                  success: true,
                  message:
                    "Learning hours, level progress, and level updated successfully",
                });

                // Update ranking after updating level or level_progress
                updateRanking(userId);
              }
            );
          } else {
            // Update ranking after updating level or level_progress
            updateRanking(userId);
            res.json({
              success: true,
              message: "Learning hours and level progress updated successfully",
            });
          }
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    });
  });
});

app.get("/api/gamification", (req, res) => {
  // Query to fetch gamification data from the database
  const sql =
    "SELECT username,level,ranking FROM user_gamification JOIN users ON user_gamification.user_id= users.UserID;";

  // Execute the query
  pool.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching gamification data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    console.log("Gamification data:", rows); // Log the fetched data
    res.json(rows); // Send the fetched data as JSON response
  });
});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to fetch user details by ID from the database
  // const sql = 'SELECT * FROM users WHERE user_id = ?';
  const sql =
    "SELECT * FROM `user_gamification` JOIN users ON `user_gamification`.`user_id` = `users`.`UserID` WHERE user_id = ?";

  // Execute the query
  pool.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    if (rows.length > 0) {
      res.json(rows[0]); // Send the fetched user data as JSON response
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

app.get("/api/userAchievement/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to fetch user details by ID from the database
  const sql = "SELECT * FROM user_achievements WHERE user_id = ?";

  // Execute the query
  pool.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    if (rows.length > 0) {
      res.json(rows[0]); // Send the fetched user data as JSON response
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

app.get("/Forum", (req, res) => {
  // Query to fetch data from the database
  const sql = `SELECT Posts.*, Users.Username AS AuthorUsername, Users.ProfilePictureURL AS Avatar, GROUP_CONCAT(Media.MediaType) AS MediaTypes, GROUP_CONCAT(Media.MediaURL) AS MediaURLs FROM Posts INNER JOIN Users ON Posts.UserID = Users.UserID LEFT JOIN Media ON Posts.PostID = Media.PostID GROUP BY Posts.PostID;`;
  // Execute the query
  pool.query(sql, (err, rows) => {
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
app.post("/api/update-quiz-count", (req, res) => {
  const { userId } = req.body;

  // Query to update the quiz count for the specified user
  const sql1 = `UPDATE user_achievements SET quiz_completed = quiz_completed + 1 WHERE user_id = ?`;

  // Query to update the level progress for the specified user
  const sql2 = `UPDATE user_gamification SET level_progress = level_progress + 10 WHERE user_id = ?`;

  // Update ranking after updating level or level_progress
  const updateRanking = (userId) => {
    const sqlUpdateRanking = `
            UPDATE user_gamification
            SET ranking = (
                SELECT COUNT(*) + 1
                FROM user_gamification AS u
                WHERE u.level > user_gamification.level OR (u.level = user_gamification.level AND u.level_progress > user_gamification.level_progress)
            )
        `;

    pool.query(sqlUpdateRanking, [userId], (errRanking, resultRanking) => {
      if (errRanking) {
        console.error("Error updating ranking:", errRanking);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
    });
  };
  // Execute the first query to update quiz count
  pool.query(sql1, [userId], (err1, result1) => {
    if (err1) {
      console.error("Error executing SQL query 1:", err1);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    // Execute the second query to update level progress
    pool.query(sql2, [userId], (err2, result2) => {
      if (err2) {
        console.error("Error executing SQL query 2:", err2);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }

      // Fetch updated user data to get current level and progress
      const sqlFetch = `SELECT level, level_progress FROM user_gamification WHERE user_id = ?`;

      pool.query(sqlFetch, [userId], (errFetch, resultFetch) => {
        if (errFetch) {
          console.error("Error fetching user data:", errFetch);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        const userData = resultFetch[0];
        // updateRanking(userId);

        // Check if level progress is 100 or more
        if (userData.level_progress >= 100) {
          // Calculate new level and progress
          const newLevel = userData.level + 1;
          const newProgress = userData.level_progress - 100;

          // Update user_level and level_progress
          const sql3 = `UPDATE user_gamification SET level = ?, level_progress = ? WHERE user_id = ?`;
          pool.query(sql3, [newLevel, newProgress, userId], (err3, result3) => {
            if (err3) {
              console.error("Error updating user level and progress:", err3);
              res
                .status(500)
                .json({ success: false, message: "Internal server error" });
              return;
            }

            // Update ranking after updating level or level_progress
            updateRanking(userId);

            res.json({
              success: true,
              message:
                "Learning hours, level progress, and level updated successfully",
            });
          });
        } else {
          // Update ranking after updating level_progress
          updateRanking(userId);

          res.json({
            success: true,
            message: "Learning hours and level progress updated successfully",
          });
        }
      });
    });
  });
});

app.post("/api/update-lecture-hours", (req, res) => {
  const { userId } = req.body;

  // Query to update the quiz count for the specified user
  const sql1 = `UPDATE user_achievements SET lecture_hours = lecture_hours + 1 WHERE user_id = ?`;

  // Query to update the level progress for the specified user
  const sql2 = `UPDATE user_gamification SET level_progress = level_progress + 35 WHERE user_id = ?`;

  const updateRanking = (userId) => {
    const sqlUpdateRanking = `
            UPDATE user_gamification
            SET ranking = (
                SELECT COUNT(*) + 1
                FROM user_gamification AS u
                WHERE u.level > user_gamification.level OR (u.level = user_gamification.level AND u.level_progress > user_gamification.level_progress)
            )
        `;

    pool.query(sqlUpdateRanking, [userId], (errRanking, resultRanking) => {
      if (errRanking) {
        console.error("Error updating ranking:", errRanking);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
      // Execute the first query to update quiz count
      pool.query(sql1, [userId], (err1, result1) => {
        if (err1) {
          console.error("Error executing SQL query 1:", err1);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        // Execute the second query to update level progress
        pool.query(sql2, [userId], (err2, result2) => {
          if (err2) {
            console.error("Error executing SQL query 2:", err2);
            res
              .status(500)
              .json({ success: false, message: "Internal server error" });
            return;
          }

          // Check if both queries were successful
          if (result1.affectedRows > 0 && result2.affectedRows > 0) {
            // Fetch updated user data to get current level and progress
            const sqlFetch = `SELECT level, level_progress FROM user_gamification WHERE user_id = ?`;

            pool.query(sqlFetch, [userId], (errFetch, resultFetch) => {
              if (errFetch) {
                console.error("Error fetching user data:", errFetch);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
                return;
              }

              const userData = resultFetch[0];

              // Check if level progress is 100 or more
              if (userData.level_progress >= 100) {
                // Calculate new level and progress
                const newLevel = userData.level + 1;
                const newProgress = userData.level_progress - 100;

                // Update user_level and level_progress
                const sql3 = `UPDATE user_gamification SET level = ?, level_progress = ? WHERE user_id = ?`;
                pool.query(
                  sql3,
                  [newLevel, newProgress, userId],
                  (err3, result3) => {
                    if (err3) {
                      console.error(
                        "Error updating user level and progress:",
                        err3
                      );
                      res.status(500).json({
                        success: false,
                        message: "Internal server error",
                      });
                      return;
                    }
                    res.json({
                      success: true,
                      message:
                        "Learning hours, level progress, and level updated successfully",
                    });

                    // Update ranking after updating level or level_progress
                    updateRanking(userId);
                  }
                );
              } else {
                // Update ranking after updating level or level_progress
                updateRanking(userId);
                res.json({
                  success: true,
                  message:
                    "Learning hours and level progress updated successfully",
                });
              }
            });
          } else {
            res.status(404).json({ success: false, message: "User not found" });
          }
        });
      });
    });
  };
});

app.get("/api/gamification", (req, res) => {
  // Query to fetch gamification data from the database
  const sql =
    "SELECT username,level,ranking FROM user_gamification JOIN users ON user_gamification.user_id= users.UserID;";

  // Execute the query
  pool.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching gamification data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    console.log("Gamification data:", rows); // Log the fetched data
    res.json(rows); // Send the fetched data as JSON response
  });
});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to fetch user details by ID from the database
  // const sql = 'SELECT * FROM users WHERE user_id = ?';
  const sql =
    "SELECT * FROM `user_gamification` JOIN users ON `user_gamification`.`user_id` = `users`.`UserID` WHERE user_id = ?";

  // Execute the query
  pool.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    if (rows.length > 0) {
      res.json(rows[0]); // Send the fetched user data as JSON response
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

app.get("/api/userAchievement/:userId", (req, res) => {
  const userId = req.params.userId;

  // Query to fetch user details by ID from the database
  const sql = "SELECT * FROM user_achievements WHERE user_id = ?";

  // Execute the query
  pool.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    if (rows.length > 0) {
      res.json(rows[0]); // Send the fetched user data as JSON response
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

app.post("/AddNewPost/:id", (req, res) => {
  const content = req.body.content; // Extract Media from req.body
  const userId = req.params.id;
  const files = req.body.file;
  console.log("Caption content here: ", content);
  const query = `INSERT INTO Posts (UserID, Content) VALUES (?,?);`;
  pool.query(query, [userId, content], (err, result) => {
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
      pool.query(mediaQuery, [mediaValues], (mediaErr, mediaResult) => {
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

app.get("/Comment/:postId", (req, res) => {
  // Change the route to /comments
  const postID = req.params.postId;
  console.log("Display Comment: ", postID);
  const query = `SELECT Comments.CommentID, Users.Username, Users.ProfilePictureURL, Comments.Content, Comments.CommentDate FROM Comments INNER JOIN Users ON Comments.UserID = Users.UserID JOIN Posts ON Users.UserID = Posts.PostID WHERE Comments.PostID = ?;`;
  pool.query(query, [postID], (err, results) => {
    if (err) {
      console.error("Error displaying comment:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    // Results will contain the selected columns for the user's reviews
    res.json({ data: results, success: true });
  });
});

app.get("/Likes", (req, res) => {
  // Change the route to /comments
  // const postID=req.params.postId
  // console.log("Display like postID: ",postID);
  const query = `SELECT P.PostID, P.Content, U.UserID, U.ProfilePictureURL FROM Likes L JOIN Posts P ON L.PostID = P.PostID JOIN Users U ON P.UserID = U.UserID WHERE L.UserID = 11;
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

app.delete("/Unlikes/:postId", (req, res) => {
  const postID = req.params.postId;
  console.log("Unlike the postID:", postID);

  const query = `DELETE FROM Likes WHERE PostID = ?;
`;
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
});

app.put("/SetLikes/:postId", (req, res) => {
  const postID = req.params.postId;
  console.log("like the unlike postID:", postID);

  const query = `INSERT INTO Likes (PostID, UserID) VALUES (?, 11);
`;
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
});

app.post("/LeaveComment/:postId", (req, res) => {
  // Change the route to /comments
  const postID = req.params.postId;
  const content = req.body.content;
  console.log("Insert Comment at, with: ", postID, content);
  const query = `INSERT INTO Comments (UserID, PostID, Content) VALUES (11, ?, ?)`;

  pool.query(query, [postID, content], (err, results) => {
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
