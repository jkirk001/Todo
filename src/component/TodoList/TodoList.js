import React, { useContext } from "react";
import classes from "./TodoList.module.css";
import { TodoContext } from "../../context/todo-context";

const TodoList = () => {
  const todoContext = useContext(TodoContext);

  const todoItems = todoContext.todos.map((item, index) => {
    return (
      <li key={index}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </li>
    );
  });
  return (
    <div className={classes.ListContainer}>
      <button
        onClick={() => todoContext.new({ title: "WHOA", body: "BODY BODY" })}
      >
        New ToDo
      </button>
      <ul className={classes.List}>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
