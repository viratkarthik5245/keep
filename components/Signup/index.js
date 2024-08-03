import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [res, setRes] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setRes("*Inputs should not be empty");
      return;
    }

    if (password !== confirmPassword) {
      setRes("Passwords do not match");
      return;
    }

    const existingUsersData = localStorage.getItem("loginuser");
    const parsedData = JSON.parse(existingUsersData) || [];

    const isDuplicateUser = parsedData.some((user) => user.name === username);
    if (isDuplicateUser) {
      setRes("Username already exists");
    } else {
      const updatedData = [...parsedData, { name: username, password }];
      localStorage.setItem("loginuser", JSON.stringify(updatedData));
      setRes("User signup successfully");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    }
  };

  return (
    <div className="bg">
      <div className="card-container">
        <img
          src="https://res.cloudinary.com/dlkovvlud/image/upload/v1699081090/Design_a_modern_and_captivating_logo_for_the_Gen-removebg-preview_2_vl2kfw.png"
          alt="website logo"
          className="website-logo"
        />
        <center>
          <h1 className="heading-signup">Signup</h1>
        </center>
        <form className="form">
          <div className="inner-form">
            <label className="label">USERNAME</label>
            <input
              type="text"
              onChange={handleUsernameChange}
              value={username}
              className="user-input"
              placeholder="Username"
            />
          </div>
          <div className="inner-form">
            <label className="label">PASSWORD</label>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              className="user-input"
              placeholder="Password"
            />
          </div>
          <div className="inner-form">
            <label className="label">CONFIRM PASSWORD</label>
            <input
              type="password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              className="user-input"
              placeholder="Confirm Password"
            />
          </div>
          <p className="response-message">{res}</p>
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Signup
          </button>
          <div className="signin">
            <p className="already">you have already account</p>
            <Link to="/">
              <p className="login-button-signup-page">Signin</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
