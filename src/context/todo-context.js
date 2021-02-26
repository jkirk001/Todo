import React, { useState } from "react";

export const TodoContext = React.createContext({
  todos: [],
  new: () => {},
  delete: () => {},
});

const TodoContextProvider = (props) => {
  const [allTodos, setAllTodos] = useState([
    { title: "test todo", body: "test body" },
    { title: "test todo", body: "test body" },
    { title: "test todo", body: "test body" },
  ]);

  const newHandler = (newTodo) => {
    setAllTodos([...allTodos, newTodo]);
  };

  const deleteHandler = () => {};

  return (
    <TodoContext.Provider
      value={{
        new: (newTodo) => newHandler(newTodo),
        delete: () => deleteHandler(),
        todos: allTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
