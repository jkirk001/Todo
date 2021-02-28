import React, { useContext, useState } from "react";
import classes from "./TodoInput.module.css";
import { TodoContext } from "../../context/todo-context";

const TodoInput = () => {
  const todoContext = useContext(TodoContext);
  const [todoState, setTodoState] = useState({ title: "", number: null });

  return (
    <div className={classes.FormContainer}>
      <form
        className={classes.Form}
        autoComplete="off"
        onSubmit={(e) => todoContext.post(e, todoState)}
      >
        <div className={classes.FormItem}>
          <label> Todo</label>
          <input
            type="text"
            name="title"
            value={todoState.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const todoStateCopy = { ...todoState };
                setTodoState({ title: "", number: 0 });
                return todoContext.post(e, todoStateCopy);
              } else {
                return null;
              }
            }}
            onChange={(e) =>
              setTodoState({ ...todoState, title: e.target.value })
            }
          />
        </div>
        <div className={classes.FormItem}>
          <label> Due in: </label>
          <input
            type="number"
            placeholder="Hours"
            name="body"
            value={todoState.number}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const todoStateCopy = { ...todoState };
                setTodoState({ title: "", number: 0 });
                return todoContext.post(e, todoStateCopy);
              } else {
                return null;
              }
            }}
            onChange={(e) =>
              setTodoState({ ...todoState, number: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
