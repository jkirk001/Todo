import React, { useState, useLayoutEffect } from "react";

export const TodoContext = React.createContext({
  todos: [],
  new: () => {},
  delete: () => {},
});

const TodoContextProvider = (props) => {
  const [allTodos, setAllTodos] = useState([
    { title: "test todo", body: "test body", id: "1x" },
    { title: "test todo", body: "test body", id: "2z" },
    { title: "test todo", body: "test body", id: "3w" },
  ]);

  const newHandler = (newTodo) => {
    setAllTodos([...allTodos, newTodo]);
  };

  const deleteHandler = (id) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
  };

  const randIndex = () => {
    return Math.floor(Math.random() * 100 * Math.random());
  };
  const postTodo = (event, data) => {
    event.preventDefault();

    fetch("https://react-hooks-8671f-default-rtdb.firebaseio.com/todos.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: randIndex() }),
    });
  };

  return (
    <TodoContext.Provider
      value={{
        new: (newTodo) => newHandler(newTodo),
        delete: (id) => deleteHandler(id),
        post: (event, data) => postTodo(event, data),
        todos: allTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
