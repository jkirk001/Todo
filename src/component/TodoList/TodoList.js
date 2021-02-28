import React, { useContext } from "react";
import classes from "./TodoList.module.css";
import { TodoContext } from "../../context/todo-context";

const TodoList = () => {
  const todoContext = useContext(TodoContext);

  //! Trying to create a streaming time from state --- MOVED TO OWN COMPONENT FOR EASE

  const todoItems = todoContext.todos.map((item, index) => {
    let itemClass = classes.TodoItem;
    if (item.due < Date.now()) {
      itemClass = classes.TodoItemLate;
    }
    let time = item.due - Date.now();
    let hours = Math.floor(time / 3600000);
    let min = Math.floor((time % 3600000) / 60000);
    let sec = Math.floor(((time % 3600000) % 60000) / 1000);
    let timeLeft = `Time Left: ${hours}h, ${min}m, ${sec}s`;
    if (time <= 0) timeLeft = `Time is up!`;
    return (
      <li
        className={itemClass}
        key={index}
        onClick={() => todoContext.delete(item.name)}
      >
        <h3>{item.title}</h3>
        <p>{timeLeft}</p>
      </li>
    );
  });

  return (
    <div className={classes.ListContainer}>
      <ul className={classes.List}>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
