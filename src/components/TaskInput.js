import React from "react";
import "../App.css";

const TaskInput = (props) => {
  return (
    <div className="task-input-container">
      <label htmlFor="taskInput" className="input-label">
        Enter a Task:
      </label>
      <input
        id="taskInput"
        type="text"
        value={props.taskText}
        onChange={(e) => props.setTaskText(e.target.value)}
        className="input-field"
      />
      <button className="add-button" onClick={() => props.addTask()}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
