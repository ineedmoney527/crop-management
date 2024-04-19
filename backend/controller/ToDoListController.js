import { Router } from "express";
import connection from "../config/dbConnection.js";
const router = Router();

// GET all tasks
router.get("/getDatesWithTasks/:userId", async (req, res) => {
  try {
    const { map_id } = req.query;

    const sqlQuery =
      "SELECT DATE_FORMAT(t.date, '%a %b %e %Y') AS date FROM `task` t JOIN `map` m ON t.map_id = m.id JOIN `users` u ON t.user_id = u.UserID WHERE t.user_id = ? AND t.map_id = ?";

    connection.query(sqlQuery, [req.params.userId, map_id], (err, results) => {
      if (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Error fetching tasks" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getDateTasks/:id", async (req, res) => {
  const { map_id, date } = req.query;
  console.log(map_id);
  try {
    const sqlQuery =
      "SELECT t.task_id AS `id`, t.name, DATE_FORMAT(t.date, '%a %b %e %Y') AS date, t.is_completed FROM `task` t JOIN `map` m ON t.map_id = m.id JOIN `users` u ON t.user_id = u.UserID WHERE t.user_id = ? AND t.map_id = ? AND t.date = STR_TO_DATE(?, '%a %b %d %Y');";
    connection.query(
      sqlQuery,
      [req.params.id, map_id, date],
      (err, results) => {
        if (err) {
          console.log(results);
          console.error("Error fetching tasks:", err);
          res.status(500).json({ error: "Error fetching tasks" });
        } else {
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.get("/addTask/:userId", async (req, res) => {
  try {
    const { map_id, name, date } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Task name cannot be empty" });
    }

    const sqlQuery =
      "INSERT INTO task (`user_id`, `map_id`, `name`, `date`, `is_completed`) VALUES (?, ?, ?, STR_TO_DATE(?, '%a %b %d %Y'), ?)";
    connection.query(
      sqlQuery,
      [req.params.userId, map_id, name, date, false],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error adding task" });
        } else {
          const createdTaskQuery = "SELECT * FROM task WHERE task_id = ?";
          connection.query(
            createdTaskQuery,
            [results.insertId],
            (err, createdTask) => {
              if (err) {
                res.status(500).json({ error: "Error fetching created task" });
              } else {
                res.status(201).json(createdTask[0]);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const sqlQuery = "DELETE FROM task WHERE task_id = ?;";
    connection.query(sqlQuery, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error deleting task" });
      } else {
        res.status(200).json({ message: "Task deleted successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (Update) a task (Toggle completion status)
router.get("/toggleTask/:id", async (req, res) => {
  try {
    const { is_completed } = req.query;

    const sqlQuery = "UPDATE task SET is_completed = ? WHERE task_id = ?";
    connection.query(
      sqlQuery,
      [is_completed, req.params.id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error updating task" });
        } else {
          res.status(200).json({ message: "Task updated successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
