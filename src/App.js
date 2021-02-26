import TodoList from "./component/TodoList/TodoList";
import TodoInput from "./container/TodoInput/TodoInput";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
