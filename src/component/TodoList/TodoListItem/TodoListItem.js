import Timer from "../../Timer/Timer";
import classes from "./TodoListItem.module.css";
import { useContext, useState } from "react";
import { TodoContext } from "../../../context/todo-context";

const TodoListItem = (props) => {
  const [timeLeftClass, setTimeLeftClass] = useState();

  const setTimeState = (time) => {
    setTimeLeftClass((prev) => time);
  };

  let todoContext = useContext(TodoContext);

  let itemClass = classes.TodoItem;

  if (timeLeftClass < 60 * 10) {
    if (timeLeftClass > 0) {
      itemClass = classes.TodoItemClose;
    } else {
      itemClass = classes.TodoItemLate;
    }
  }
  return (
    <li className={itemClass} onClick={() => todoContext.delete(props.name)}>
      <h3>{props.title}</h3>
      <Timer
        timeLeft={props.time / 1000}
        classHandler={(time) => setTimeState(time)}
      />
    </li>
  );
};

export default TodoListItem;
