import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
export default function Login(props) {
  const navigate = useNavigate();
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const [showForget, setShowForget] = useState(false);
  const [error, setError] = useState({
    loginIdError: "",
    passwordError: "",
  });

  const onChangeInput = (e) => {
    if (e.target.name === "loginId") {
      if (e.target.value.length > 4) {
        setLoginId(e.target.value);
        setError((prev) => ({
          ...prev,
          loginIdError: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          loginIdError: "Minimum length should be 5 ",
        }));
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length > 4) {
        setPassword(e.target.value);
        setError((prev) => ({
          ...prev,
          passwordError: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          passwordError: "Minimum length should be 5 ",
        }));
      }
    }
  };
  const displayError = (e) => {
    if (e.length > 0) {
      return <li className="text-danger">{e}</li>;
    }
  };

  const handleButton = (e) => {
    if (
      loginId !== undefined &&
      password !== undefined &&
      error.loginIdError.length < 1 &&
      error.passwordError.length < 1
    ) {
      const data = {
        loginId: loginId,
        password: password,
      };
      axios
        .post(url + "login", data)
        .then((data) => {
          localStorage.setItem("loginId", loginId);
          navigate("/home");
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }
  };

  const handleCloseForgetButton = () => {
    setShowForget(!showForget);
  };
  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <h2 style={{ textAlign: "center" }}>Sign In to TweetApp</h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Login Id</label>
          <input
            type="text"
            className="form-control"
            name="loginId"
            aria-describedby="loginIdHelp"
            onChange={onChangeInput}
          />
          {displayError(error.loginIdError)}
          <small id="loginIdHelp" className="form-text text-muted">
            We'll never share your Credentiala with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onChangeInput}
          />
          {displayError(error.passwordError)}
        </div>

        <button
          className="btn btn-link float-right "
          onClick={() => handleCloseForgetButton()}
        >
          Forget Password
        </button>
        <ForgetPassword
          show={showForget}
          onHide={() => {
            setShowForget(false);
          }}
        />
        <div className="mt-5" style={{ display: "" }}>
          <button
            type="submit"
            style={{ borderRadius: "40px", width: "40%", marginLeft: "30%" }}
            className="btn btn-primary"
            onClick={handleButton}
          >
            Login
          </button>
          <button
            style={{ borderRadius: "40px", width: "40%", marginLeft: "30%" }}
            className="btn btn-success mt-3"
            onClick={() => props.handler(false)}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
