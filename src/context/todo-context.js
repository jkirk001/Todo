import React, { useState, useLayoutEffect } from "react";

export const TodoContext = React.createContext({
  //! Essentially Global state at any point in App that has context
  todos: [],
  new: () => {},
  delete: () => {},
});

const TodoContextProvider = (props) => {
  const [allTodos, setAllTodos] = useState([]);

  //! Uses Fetch API to get todos in DB -- sets it as state
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

  //! Deletes Post in DB, then removes from state
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
  //! Random number used to ID todo items initallly -- Deprecated
  const randIndex = () => {
    return Math.floor(Math.random() * 100 + Math.random() * 555555);
  };
  //! Posts new Todo to DB -- Then adds to state, but filters by due date-- soonest due go first
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
  //! Login Handler for Auth -- Could move the state in here too...
  const loginHandler = (e, email, password, setAuthed) => {
    e.preventDefault();
    let data = { email: email, password: password, returnSecureToken: true };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWnyiTSs75htAGn7r8ze4vkmQ1nFnANQY",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Uh Oh");
        }
      })
      .then((resData) => {
        console.log(resData);
        localStorage.setItem("auth", resData.email);
        setAuthed(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <TodoContext.Provider
      value={{
        delete: (id) => deleteHandler(id),
        post: (event, data) => postTodo(event, data),
        login: loginHandler,
        todos: allTodos,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
//* Context component carries the values here as an object -- Any items wrapped by this component ( index.js, here) and useContext can call any of these methods/values

export default TodoContextProvider;
