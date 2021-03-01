import Timer from "../../Timer/Timer";
import classes from "./TodoListItem.module.css";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../../context/todo-context";

const TodoListItem = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.time - Date.now());
  const [timeLeftClass, setTimeLeftClass] = useState(classes.TodoItem);

  const setTimeState = (time) => {
    setTimeLeft((prev) => time);
  };

  let todoContext = useContext(TodoContext);

  //? TESTING WATER ON ADDING QUICK CLASS ON STATE CHANGE TO FORCE WIGGLE
  useEffect(() => {
    if (timeLeft < 60 * 10) {
      if (timeLeft > 0) {
        if (timeLeftClass !== classes.TodoItemClose)
          setTimeLeftClass(classes.TodoItemClose);
      } else {
        if (timeLeftClass !== classes.TodoItemLate)
          setTimeLeftClass(classes.TodoItemLate);
      }
    } else {
      if (timeLeftClass !== classes.TodoItemEarly)
        setTimeLeftClass(classes.TodoItemEarly);
    }
  }, [timeLeft, timeLeftClass]);
  //? END TEST
  return (
    <li
      key={timeLeftClass}
      className={timeLeftClass}
      onClick={() => {
        todoContext.delete(props.name);
      }}
    >
      <h3>{props.title}</h3>
      <Timer
        timeLeft={(props.time - Date.now()) / 1000}
        classHandler={(time) => setTimeState(time)}
      />
    </li>
  );
};

export default TodoListItem;
