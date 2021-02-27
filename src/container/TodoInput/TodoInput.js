import React, { useContext, useState } from "react";
import classes from "./TodoInput.module.css";
import { TodoContext } from "../../context/todo-context";

const TodoInput = () => {
  const todoContext = useContext(TodoContext);
  const [todoState, setTodoState] = useState({ title: "", body: "" });

  return (
    <div className={classes.FormContainer}>
      <form
        className={classes.Form}
        autoComplete="off"
        onSubmit={(e) => todoContext.post(e, todoState)}
      >
        <div className={classes.FormItem}>
          <label> Title</label>
          <input
            type="text"
            name="title"
            value={todoState.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const todoStateCopy = { ...todoState };
                setTodoState({ title: "", body: "" });
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
          <label> Body</label>
          <input
            type="text"
            name="body"
            value={todoState.body}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const todoStateCopy = { ...todoState };
                setTodoState({ title: "", body: "" });
                return todoContext.post(e, todoStateCopy);
              } else {
                return null;
              }
            }}
            onChange={(e) =>
              setTodoState({ ...todoState, body: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
