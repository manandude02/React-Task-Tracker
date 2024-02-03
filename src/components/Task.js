import React from "react";
import "../App.css";

const Task = (props) => {
  return (
    <div
      className="task-container"
      draggable
      onDragStart={(e) => props.onDragStart(e, props.id)}
      onDragOver={props.onDragOver}
      onDrop={(e) => props.onDrop(e, props.id)}
    >
      <span className="task-text">{props.text} </span>
      <span className="task-date"> Date created: {props.dateAdded}</span>
      <div className="task-buttons">
        <button
          className="btn btn-primary"
          onClick={() => props.handleDelete(props.id)}
        >
          Delete
        </button>
        <button
          className={props.isCompleted ? "btn btn-success" : "btn btn-danger"}
          onClick={() => props.toggleComplete(props.id)}
        >
          Task {props.isCompleted ? "completed" : "incomplete"}
        </button>
      </div>
    </div>
  );
};

export default Task;
