import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="login-page__container">
      <h1>Log In</h1>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <label for="credential">Email or Username</label>
        <input
          id="credential"
          placeholder="Email or Username"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <label for="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="errors">{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      <div className="login__options">
        <button onClick={loginDemo}>Login as Demo</button>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
