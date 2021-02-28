import React, { useState, useLayoutEffect } from "react";

export const TodoContext = React.createContext({
  todos: [],
  new: () => {},
  delete: () => {},
});

const TodoContextProvider = (props) => {
  const [allTodos, setAllTodos] = useState([]);

  useLayoutEffect(() => {
    fetch(
      'https://react-hooks-8671f-default-rtdb.firebaseio.com/todos2.json?orderby="due"'
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const nearlyTodos = Object.entries(resData);
        let finalTodos = [];
        for (let each of nearlyTodos) {
          let item = { ...each[1], name: each[0] };
          finalTodos.push(item);
        }
        finalTodos = finalTodos.sort((a, b) => (a.due > b.due ? 1 : -1));
        setAllTodos(finalTodos);
      });
  }, []);

  const deleteHandler = (id) => {
    fetch(
      `https://react-hooks-8671f-default-rtdb.firebaseio.com/todos2/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        const updatedTodos = allTodos.filter((todo) => todo.name !== id);
        setAllTodos(updatedTodos);
      })
      .catch((e) => console.log(e.message));
  };

  const randIndex = () => {
    return Math.floor(Math.random() * 100 + Math.random() * 555555);
  };
  const postTodo = (event, data) => {
    event.preventDefault();

    fetch("https://react-hooks-8671f-default-rtdb.firebaseio.com/todos2.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id: randIndex(),
        date: Date.now(),
        due: Date.now() + 3600000 * parseFloat(data.number),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        //! SORTING ARRAY BEFORE UPDATING STATE
        const localUpdate = [
          ...allTodos,
          {
            ...data,
            id: randIndex(),
            name: resData.name,
            date: Date.now(),
            due: Date.now() + 3600000 * parseFloat(data.number),
          },
        ].sort((a, b) => (a.due > b.due ? 1 : -1));
        setAllTodos(localUpdate);
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
