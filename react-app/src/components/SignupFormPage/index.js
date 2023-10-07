import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { skillOptions, throwingOptions } from "../../utils/seederData";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("image_url", image_url);
    formData.append("pdga_number", pdga_number);
    formData.append("skill_level", skill_level);
    formData.append("throwing_preference", throwing_preference);
    formData.append("password", password);

    if (password === confirmPassword) {
      const data = await dispatch(signUp(formData));
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
    <div className="signup__container">
      <h1>Sign Up</h1>
      <form
        className="signup__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.first_name && <p className="errors">{errors.first_name}</p>}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.last_name && <p className="errors">{errors.last_name}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="errors">{errors.email}</p>}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className="errors">{errors.username}</p>}
        <label htmlFor="img">Profile Image (Optional)</label>
        <input
          id="img"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <label htmlFor="pdgaNumber">PDGA Number</label>
        <input
          id="pdgaNumber"
          placeholder="PDGA Number"
          type="number"
          onChange={(e) => setPdgaNumber(e.target.value)}
        />
        {errors.pdga_number && <p className="errors">{errors.pdga_number}</p>}
        <label htmlFor="skillLevel">Skill Level</label>
        <select
          id="skillLevel"
          value={skill_level}
          onChange={(e) => setSkillLevel(e.target.value)}
        >
          <option disabled value="">
            Please select an option...
          </option>
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {errors.skill_level && <p className="errors">{errors.skill_level}</p>}
        <label htmlFor="throwingPreference">Throwing Preference</label>
        <select
          id="throwingPreference"
          value={throwing_preference}
          onChange={(e) => setThrowingPreference(e.target.value)}
        >
          <option disabled value="">
            Please select an option...
          </option>
          {throwingOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {errors.throwing_preference && <p className="errors">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="errors">{errors.password}</p>}
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button className="signup-options" onClick={() => history.push("/login")}>
        Already a user? Log in
      </button>
    </div>
  );
}

export default SignupFormPage;
