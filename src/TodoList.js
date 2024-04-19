import Calendar from "react-calendar";
import "./TodoList.css"; // Import CSS file for styling
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function TodoList({ landId }) {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [added, setAdded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datesWithTasks, setDatesWithTasks] = useState([]);

  function TodoItem({ task }) {
    return (
      <div className={`todo-item ${task.is_completed ? "completed" : ""}`}>
        <div style={{ display: "flex" }}>
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => toggleCompleted(task.id)}
          />
          <span>{task.name}</span>
        </div>

        <button onClick={() => deleteTask(task.id)}>X</button>
      </div>
    );
  }

  useEffect(() => {
    landId && fetchDateTasks();
  }, [landId, selectedDate]);
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/todo/getDatesWithTasks/${1}`,
        {
          params: {
            map_id: landId,
          },
        }
      );

      setDatesWithTasks(
        response.data.map((dateObj) => new Date(dateObj.date).toDateString())
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    console.log(datesWithTasks);
  }, [datesWithTasks]);

  const fetchDateTasks = async () => {
    console.log(landId);
    try {
      const response = await axios.post(
        `http://localhost:5050/api/todo/getDateTasks/${1}?map_id=${landId}&date=${selectedDate.toDateString()}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (name.trim() === "") {
      console.error("Task name cannot be empty");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/todo/addTask/${1}`,
        {
          params: {
            map_id: landId,
            name: name,
            date: selectedDate.toDateString(),
          },
        }
      );

      setTasks([...tasks, response.data]);
      fetchDateTasks();
      fetchAllTasks();
      setName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/todo/deleteTask/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      fetchDateTasks();
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const isCompleted = !tasks.find((task) => task.id === id).is_completed;
      const response = await axios.get(
        `http://localhost:5050/api/todo/toggleTask/${id}`,
        {
          params: {
            is_completed: isCompleted,
          },
        }
      );

      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task.id === id ? { ...task, is_completed: isCompleted } : task
        );
      });
      setAdded(!added);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  // useEffect(() => {
  //   // fetchDateTasks();
  // }, [added]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {tasks && tasks.map((task) => <TodoItem key={task.id} task={task} />)}
        <div className="add-container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={addTask}>Add</button>
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
