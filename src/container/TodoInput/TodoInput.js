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
        onSubmit={(e) => todoContext.post(e, todoState)}
      >
        <div className={classes.FormItem}>
          <label> Title</label>
          <input
            type="text"
            name="title"
            value={todoState.title}
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
            onChange={(e) =>
              setTodoState({ ...todoState, body: e.target.value })
            }
          />
        </div>
        <button>New ToDo</button>
      </form>
    </div>
  );
};

export default TodoInput;
