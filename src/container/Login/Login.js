import React, { useState, useContext } from "react";
import classes from "./Login.module.css";
import { withRouter, Redirect } from "react-router";
import { TodoContext } from "../../context/todo-context";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthed, setAuthed] = useState(false);

  const todoContext = useContext(TodoContext);

  //! Kind of ugly -- LMK if this can be done better
  //* Loads login, unless already Authed -- Then <Redirect /> to "/home" -- Which will load, since loginHandler also setsAuthed.

  let login = (
    <React.Fragment>
      <h2>Login</h2>
      <form
        className={classes.Form}
        onSubmit={(e) => {
          todoContext.login(e, email, password, setAuthed);
        }}
      >
        <div className={classes.FormItem}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.FormItem}>
          <label>Password : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={classes.button}>Enter</button>
      </form>
    </React.Fragment>
  );
  if (isAuthed) {
    login = <Redirect to="/home" />;
  }

  return <div className={classes.LoginDiv}>{login}</div>;
};
export default withRouter(Login);
