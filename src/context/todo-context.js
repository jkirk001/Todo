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

  useLayoutEffect(() => {
    fetch("https://react-hooks-8671f-default-rtdb.firebaseio.com/todos.json")
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const nearlyTodos = Object.entries(resData);
        const finalTodos = [];
        for (let each of nearlyTodos) {
          let item = { ...each[1], name: each[0] };
          finalTodos.push(item);
        }

        setAllTodos(finalTodos);
      });
  }, []);

  const deleteHandler = (id) => {
    fetch("");
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
  };

  const randIndex = () => {
    return Math.floor(Math.random() * 100 + Math.random() * 555555);
  };
  const postTodo = (event, data) => {
    event.preventDefault();

    fetch("https://react-hooks-8671f-default-rtdb.firebaseio.com/todos.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: randIndex() }),
    }).then((res) => {
      console.log(res);
      setAllTodos([...allTodos, { ...data, id: randIndex() }]);
    });
  };

  return (
    <TodoContext.Provider
      value={{
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
