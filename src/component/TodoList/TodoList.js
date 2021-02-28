import React, { useContext, useEffect, useState } from "react";
import classes from "./TodoList.module.css";
import Timer from "../Timer/Timer";
import { TodoContext } from "../../context/todo-context";

const TodoList = () => {
  const todoContext = useContext(TodoContext);

  //#region
  const todoItems = todoContext.todos.map((item, index) => {
    let itemClass = classes.TodoItem;
    if (item.due - Date.now() < 10 * 60000) {
      if (item.due - Date.now() > 0) {
        itemClass = classes.TodoItemClose;
      } else {
        itemClass = classes.TodoItemLate;
      }
    }
    let time = item.due - Date.now();

    //#endregion

    //! ^^^Backup^^^^
    //! Attempted class setting through useEffect below. FAILED FOR NOW
    //#region
    /*const [itemDetails, setItemDetails] = useState([]);

  const todoItems = todoContext.todos.map((item, index) => {
    let time = item.due - Date.now();
    useEffect(() => {
      // exit early when we reach 0
      if (!time || time <= 0) {
        setItemDetails((prev) => {
          const lol = prev.filter((todoState)=> todoState.name !== item.name );

          return [...lol, { name: lol.name, timeLeft: 0 }];
        });
      }

      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setTimeout(() => {
        setTimeLeft((prev)=>{
          prev.filter((todoState)=> {

            return timeLeft - 1;
          })
          
        })
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => {
        clearInterval(intervalId);
      };
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]); */
    //#endregion

    return (
      <li
        className={itemClass}
        key={item.name}
        onClick={() => todoContext.delete(item.name)}
      >
        <h3>{item.title}</h3>
        <Timer timeLeft={time / 1000} />
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
