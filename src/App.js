import { useEffect } from "react";
import TodoList from "./component/TodoList/TodoList";
import TodoInput from "./container/TodoInput/TodoInput";
import "./App.css";

function App() {
  let name = ["App"];
  //!TRied to make className change, and create a moving transforming background
  //#region
  /*useEffect(() => {
    setInterval(() => {
      console.log(name.join(""));
      if (name.join("") === "App") {
        return name.push("1");
      } else if (name.join("") === "App1") {
        return name.push("2");
      } else {
        return (name = ["App"]);
      }
    }, 2000);
  }, []); */
  //#endregion

  console.log(name.join(""));
  return (
    <div className={name.join("")}>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
