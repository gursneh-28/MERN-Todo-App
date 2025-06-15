import React, { useState } from "react";
import "./Card.css";

function Card({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <div className="card-overlay">
      <form onSubmit={handleSubmit} className="card-container">
        <label>Task :</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Card;
