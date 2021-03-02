import Main from "./component/Main/Main";
import Login from "./container/Login/Login";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    //! "/home" wont render unless user is Authed
    <div className="App">
      <Switch>
        <Route path="/home" component={Main} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
