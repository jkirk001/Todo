//import { useEffect, useState } from "react";
import TodoList from "./component/TodoList/TodoList";
import TodoInput from "./container/TodoInput/TodoInput";
import "./App.css";

function App() {
  //const [classArr, setClassArr] = useState(0);

  //!TRied to make className change, and create a moving transforming background
  //#region
  /*useEffect(() => {
    let bg = setInterval(() => {
      setClassArr((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(bg);
  }, []);
  
  console.log(classArr);
  let style = "App";
  if (classArr === 0) style = "App";
  if (classArr === 1) style = "App1";
  if (classArr === 2) style = "App2";
  if (classArr === 3) {
    setClassArr(() => 0);
  }*/
  //#endregion
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
