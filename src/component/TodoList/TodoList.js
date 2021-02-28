import React, { useContext } from "react";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem/TodoListItem";
import { TodoContext } from "../../context/todo-context";

const TodoList = () => {
  const todoContext = useContext(TodoContext);

  const todoItems = todoContext.todos.map((item, index) => {
    let time = item.due - Date.now();

    return (
      <TodoListItem
        key={item.name}
        title={item.title}
        time={time}
        name={item.name}
      />
    );
  });

  return (
    <div className={classes.ListContainer}>
      <ul className={classes.List}>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
