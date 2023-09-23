import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    closeModal();
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email or Username"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        {errors.credential && <p>{errors.credential}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      <button onClick={loginDemo}>Login as Demo</button>
    </>
  );
}

export default LoginFormModal;
