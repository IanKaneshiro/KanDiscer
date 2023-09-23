import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [pdga_number, setPdgaNumber] = useState(0);
  const [skill_level, setSkillLevel] = useState("");
  const [throwing_preference, setThrowingPreference] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      first_name,
      last_name,
      email,
      username,
      image_url,
      pdga_number,
      skill_level,
      throwing_preference,
      password,
    };
    if (password === confirmPassword) {
      const data = await dispatch(signUp(user));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors({
        password:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.first_name && <p className="errors">{errors.first_name}</p>}
        <input
          placeholder="Last Name"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.last_name && <p className="errors">{errors.last_name}</p>}
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="errors">{errors.email}</p>}
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />{" "}
        {errors.username && <p className="errors">{errors.username}</p>}
        <input
          placeholder="Image Url"
          type="text"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <input
          placeholder="PDGA Number"
          type="number"
          // value={pdga_number}
          onChange={(e) => setPdgaNumber(e.target.value)}
        />
        {errors.pdga_number && <p className="errors">{errors.pdga_number}</p>}
        <input
          placeholder="Skill Level"
          type="text"
          value={skill_level}
          onChange={(e) => setSkillLevel(e.target.value)}
        />
        {errors.skill_level && <p className="errors">{errors.skill_level}</p>}
        <input
          placeholder="Throwing Preference"
          type="text"
          value={throwing_preference}
          onChange={(e) => setThrowingPreference(e.target.value)}
        />
        {errors.throwing_preference && <p className="errors">{errors.email}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="errors">{errors.password}</p>}
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
