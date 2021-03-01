import { useContext } from "react";
import TodoList from "../TodoList/TodoList";
import TodoInput from "../../container/TodoInput/TodoInput";
import Spinner from "../../ui/Spinner/Spinner";
import { TodoContext } from "../../context/todo-context";

function Main() {
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

export default Main;
