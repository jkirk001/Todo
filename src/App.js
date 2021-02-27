import { useContext } from "react";
import TodoList from "./component/TodoList/TodoList";
import TodoInput from "./container/TodoInput/TodoInput";
import Spinner from "./ui/Spinner/Spinner";
import "./App.css";
import { TodoContext } from "./context/todo-context";

function App() {
  const todoContext = useContext(TodoContext);

  let loadingList = <Spinner />;
  if (todoContext.todos.length > 0) {
    loadingList = <TodoList />;
  }
  return (
    <div className="App">
      <h1>Todo with Hooks</h1>
      <TodoInput />
      {loadingList}
    </div>
  );
}

export default App;
