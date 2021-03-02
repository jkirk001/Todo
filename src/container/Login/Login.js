import React, { useState } from "react";
import classes from "./Login.module.css";
import { withRouter, Redirect } from "react-router";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthed, setAuthed] = useState(false);

  const loginHandler = (e) => {
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

  let login = (
    <React.Fragment>
      <h2>Login</h2>
      <form className={classes.Form} onSubmit={(e) => loginHandler(e)}>
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
