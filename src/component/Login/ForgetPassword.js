import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function ForgetPassword(props) {
  const [loginId, setLoginId] = useState();

  const [password, setPassword] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [flag, setFlag] = useState(true);
  const contactReg = /^[7-9]\d{9}$/g;
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

  const [error, setError] = useState({
    loginIdError: "",
    passwordError: "",
    contactNumberError: "",
  });
  // const changeForgetButton = () => {
  //   setLoginId("");
  //   setFlag(true);
  // };
  // const changeVerifyButton = () => {
  //   setFlag(true);
  //   props.onHide();
  // };

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
    if (e.target.name === "contactNumber") {
      if (!e.target.value || contactReg.test(e.target.value) === false) {
        setError((prev) => ({
          ...prev,
          contactNumberError: "Contact Number is not valid",
        }));
      } else {
        setContactNumber(e.target.value);
        setError((prev) => ({
          ...prev,
          contactNumberError: "",
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
  const handleLoginIdButton = () => {
    if (loginId !== undefined && error.loginIdError.length < 1) {
      axios(url + "check/" + loginId)
        .then((e) => {
          if (e.data) {
            setFlag(!e.data);
          } else {
            alert("LoginID is not correct");
          }
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }
  };


  const handleButton = () => {
    if (
      password !== undefined &&
      contactNumber !== undefined &&
      error.passwordError.length < 1 &&
      error.passwordError.length < 1
    ) {
      const data = {
        password: password,
        contactNumber: contactNumber,
      };
      axios
        .post(url + loginId + "/forgot", data)
        .then((e) => {
          if (e.data) {
            alert("Password Changed Successfully");
            setFlag(true);
            props.onHide();
          }
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {flag ? <h3>Verify Login</h3> : <h3>Forget Password</h3>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {flag ? (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">LoginId</label>
              <input
                defaultValue={loginId}
                type="text"
                name="loginId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={onChangeInput}
              />
              {displayError(error.loginIdError)}
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={onChangeInput}
                />
                {displayError(error.passwordError)}
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  maxLength={10}
                  onChange={onChangeInput}
                />
                {displayError(error.contactNumberError)}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {flag ? (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  setFlag(true);
                  props.onHide();
                }}
              >
                Back to Login
              </Button>
              <Button variant="success" onClick={() => handleLoginIdButton()}>
                Verify
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  setFlag(true);
                }}
              >
                Back to Login
              </Button>
              <Button variant="success" onClick={() => handleButton()}>
                Change Password
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
