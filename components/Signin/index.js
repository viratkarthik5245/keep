import React from "react";

import { Component } from "react";

import { Link, Navigate } from "react-router-dom";

import "./index.css";

class SignIn extends Component {
  state = {
    us: "",
    pd: "",
    showSubmitError: false,
    errorMsg: "",
    submitForm: false,
  };

  onSubmitForm = async (event) => {
    event.preventDefault();

    const { us, pd } = this.state;

    const localStorageData = await localStorage.getItem("loginuser");
    const parsedData = await JSON.parse(localStorageData);
    const userChecking = parsedData.find((item) => item.name === us);
    if (userChecking) {
      const passwordChecking = parsedData.find(
        (item) => item.name === us && item.password === pd
      );
      if (passwordChecking) {
        this.setState({ submitForm: true });
        this.props.setIsAuthenticated(true);
        console.log("success");
      } else {
        console.log("password wrong");
        this.setState({ showSubmitError: true, errorMsg: "*Invalid Password" });
      }
    } else {
      console.log("usename wrong");
      this.setState({ showSubmitError: true, errorMsg: "*Invalid Username" });
    }
  };

  onEnterUsername = (event) => {
    this.setState({ us: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ pd: event.target.value });
  };

  renderUsername = () => {
    const { us } = this.state;

    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          className="user-input1"
          value={us}
          onChange={this.onEnterUsername}
          style={{ color: "white" }}
        />
      </>
    );
  };

  renderPassword = () => {
    const { pd } = this.state;

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="user-input1"
          id="password"
          type="password"
          placeholder="Password"
          value={pd}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  render() {
    const { showSubmitError, submitForm } = this.state;
    console.log(submitForm);
    return (
      <div className="jobby-app-container">
        <div className="card">
          <img
            src="https://res.cloudinary.com/dlkovvlud/image/upload/v1699081090/Design_a_modern_and_captivating_logo_for_the_Gen-removebg-preview_2_vl2kfw.png"
            alt="website logo"
            className="website-logo"
          />
          <center>
            <h1 className="heading-login">Signin</h1>
          </center>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            {showSubmitError && (
              <p className="error-msg">*invalid user or password</p>
            )}
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="signupp">
              <p className="nothave">Don't have an account</p>
              <Link to="/signup">
                <p className="signup-para">Signup</p>
              </Link>
            </div>

            {/* {showSubmitError && <p className="error-msg">*{errorMsg}</p>} */}
          </form>
          {submitForm ? <Navigate to="/Home" /> : " "}
        </div>
      </div>
    );
  }
}

export default SignIn;
