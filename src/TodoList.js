import React, { useState } from "react";
import Calendar from "react-calendar";
import "./TodoList.css"; // Import CSS file for styling

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
