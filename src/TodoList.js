// import React, { useState } from "react";
import Calendar from "react-calendar";
import "./TodoList.css"; // Import CSS file for styling
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (date, text) => {
    try {
      const response = await axios.post("/api/tasks", { date, text });
      setTasks([...tasks, response.data]);
      setText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed: !completed });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Other functions for adding, deleting, and updating tasks
}

function TodoItem({ task, deleteTask, toggleCompleted }) {
  const handleTick = () => {
    toggleCompleted(task.id);
  };

  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`}>
      <div style={{ display: "flex" }}>
        <input type="checkbox" checked={task.completed} onChange={handleTick} />
        <p style={{ marginTop: "5px" }}>{task.text}</p>
      </div>

      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}

function TodoList() {
  const [tasks, setTasks] = useState({});
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (date, text) => {
    const newTasks = { ...tasks };
    if (!newTasks[date]) {
      newTasks[date] = [];
    }
    const newTask = { id: Date.now(), text, completed: false };
    newTasks[date].push(newTask);
    setTasks(newTasks);
    setText("");
  };

  const deleteTask = (date, id) => {
    const newTasks = { ...tasks };
    if (newTasks[date]) {
      newTasks[date] = newTasks[date].filter((task) => task.id !== id);
      if (newTasks[date].length === 0) {
        delete newTasks[date];
      }
      setTasks(newTasks);
    }
  };

  const toggleCompleted = (date, id) => {
    const newTasks = { ...tasks };
    if (newTasks[date]) {
      newTasks[date] = newTasks[date].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(newTasks);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const datesWithTasks = Object.keys(tasks);

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {tasks[selectedDate.toDateString()] &&
          tasks[selectedDate.toDateString()].map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={() =>
                deleteTask(selectedDate.toDateString(), task.id)
              }
              toggleCompleted={() =>
                toggleCompleted(selectedDate.toDateString(), task.id)
              }
            />
          ))}
        <div className="add-container">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={() => addTask(selectedDate.toDateString(), text)}>
            Add
          </button>
        </div>
      </div>
      <div className="sidebar">
        <h3>Calendar</h3>
        <div className="big-calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="big-calendar"
            tileClassName={({ date }) =>
              datesWithTasks.includes(date.toDateString())
                ? "react-calendar__month-view__days__day--has-tasks"
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
