import React, { useEffect, useState } from "react";
import { useContext } from "react";
import TodoList from "../TodoList/TodoList";
import TodoInput from "../../container/TodoInput/TodoInput";
import Spinner from "../../ui/Spinner/Spinner";
import { TodoContext } from "../../context/todo-context";
import { Redirect } from "react-router";

function Main() {
  const todoContext = useContext(TodoContext);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) <Redirect to="/" />;
    else return;
  }, [reload]);

  let loadingList = <Spinner />;
  if (todoContext.todos.length > 0) {
    loadingList = <TodoList />;
  }

  const load = localStorage.getItem("auth");
  let main = <Redirect to="/" />;
  if (load) {
    main = (
      <React.Fragment>
        <h1>Todo with Hooks</h1>
        <TodoInput />
        {loadingList}
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            setReload(true);
          }}
        >
          Logout
        </button>
      </React.Fragment>
    );
  }
  return <div>{main}</div>;
}

export default Main;
