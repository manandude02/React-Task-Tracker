import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";
import "../App.css";

const TaskList = () => {
  const [taskArr, setTaskArr] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }, [taskArr]);

  const handleDelete = (id) => {
    setTaskArr(taskArr.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTaskArr(
      taskArr.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedTask = taskArr.find((task) => task.id === +draggedId);

    // Update the state to reflect the new order
    setTaskArr((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== +draggedId);
      const targetIndex = newTasks.findIndex((task) => task.id === +targetId);
      newTasks.splice(targetIndex, 0, draggedTask);
      return newTasks;
    });
  };

  const addTask = () => {
    let newTask = {
      id: taskArr.length + 1,
      text: taskText,
      completed: false,
      dateAdded: new Date().toLocaleDateString(),
    };
    setTaskText("");
    setTaskArr((taskArr) => [...taskArr, newTask]);
  };

  return (
    <div className="task-list-container">
      <TaskInput
        addTask={addTask}
        setTaskText={setTaskText}
        taskText={taskText}
      />

      <div className="filter-buttons">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setFilter(1)}
        >
          Show completed tasks
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setFilter(2)}
        >
          Show incomplete tasks
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setFilter(0)}
        >
          Reset filter
        </button>
      </div>

      {filter === 0 &&
        taskArr.map((task) => (
          <Task
            key={task.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            id={task.id}
            text={task.text}
            dateAdded={task.dateAdded}
            isCompleted={task.completed}
            handleDelete={handleDelete}
            toggleComplete={toggleComplete}
          />
        ))}

      {filter === 1 &&
        taskArr
          .filter((task) => task.completed === true)
          .map((task) => (
            <Task
              key={task.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              id={task.id}
              text={task.text}
              dateAdded={task.dateAdded}
              isCompleted={task.completed}
              handleDelete={handleDelete}
              toggleComplete={toggleComplete}
            />
          ))}

      {filter === 2 &&
        taskArr
          .filter((task) => task.completed === false)
          .map((task) => (
            <Task
              key={task.id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              id={task.id}
              text={task.text}
              dateAdded={task.dateAdded}
              isCompleted={task.completed}
              handleDelete={handleDelete}
              toggleComplete={toggleComplete}
            />
          ))}
    </div>
  );
};

export default TaskList;
