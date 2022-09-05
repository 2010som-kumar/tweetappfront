import React, { useState } from "react";
import axios from "axios";
export default function Register(props) {
  const url ="https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/"
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const [contactNumber, setContactNumber] = useState();


  const reg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const contactReg=/^[7-9]\d{9}$/g

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    loginIdError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    contactNumberError: "",
  });

  const onChangeInput = (e) => {
    if (e.target.name === "firstName") {
      if (e.target.value.length > 1) {
        console.log("sadf" + e.target.value);
        setFirstName(e.target.value);
        setError((prev) => ({
          ...prev,
          firstNameError: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          firstNameError: "First Name is Required",
        }));
        
      }
    }
    if (e.target.name === "lastName") {
      if (e.target.value.length > 1) {
        setLastName(e.target.value);
        setError((prev) => ({
          ...prev,
          lastNameError: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          lastNameError: "Last Name is Required",
        }));
      }
    }
    if (e.target.name === "email") {
      if (!e.target.value || reg.test(e.target.value) === false) {
        setError((prev) => ({
          ...prev,
          emailError: "Email is Required",
        }));
      } else {
        setEmail(e.target.value);
        setError((prev) => ({
          ...prev,
          emailError: "",
        }));
      }
    }

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
    if (e.target.name === "confirmPassword") {
      if (e.target.value === password) {
        // setConfirmPassword(e.target.value);
        setError((prev) => ({
          ...prev,
          confirmPasswordError: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          confirmPasswordError: "password and confirm password are not same",
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
  }
  const displayError = (e) => {
    if (e.length > 0) {
      return <li className="text-danger">{e}</li>;
    }
  };
  const handleButton = (e) => {

    if(firstName!==undefined && lastName!==undefined && email!==undefined &&
      loginId!==undefined &&password!==undefined &&contactNumber!==undefined && error.firstNameError.length<1 && error.lastNameError.length<1 &&
      error.emailError.length<1 && error.loginIdError.length<1 &&
      error.passwordError.length<1 && error.confirmPasswordError.length<1 &&
      error.contactNumberError.length<1){
    const data = {
      firstName: firstName,
      lastName: lastName,
      emailId:email,
      loginId:loginId,
      password:password,
      contactNumber:contactNumber
    };
    console.log(data);
    axios
      .post(url+'register', data)
      .then((data) => {
        console.log(data.data);
        alert("You have Successfully Registered")
        props.handler(true);
       
      
      })
      .catch((error) => {
        console.log(error['response']['data']['error-message']);
        alert(error['response']['data']['error-message']);
        
      });
  }
  };
  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Join With Us Sign Up</h2>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              onChange={onChangeInput}
            />
            {displayError(error.firstNameError)}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
             onChange={onChangeInput}
            />
            {displayError(error.lastNameError)}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
      
            onChange={onChangeInput}
          />
          {displayError(error.emailError)}
        </div>
        <div className="form-group ">
          <label htmlFor="loginId">Login Id</label>
          <input
            type="text"
            className="form-control"
            name="loginId"
        
            onChange={onChangeInput}
          />
          {displayError(error.loginIdError)}
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
           
              onChange={onChangeInput}
            />
            {displayError(error.passwordError)}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              
              onChange={onChangeInput}
            />
            {displayError(error.confirmPasswordError)}
          </div>
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
        <br />
        <div style={{ display: "" }}>
         
        <button
            className="btn btn-primary "
            aria-current="page"
            onClick={() => props.handler(true)}
          >
           Back To Login
          </button>
          <button
            type="submit"
          
            className="btn btn-success ml-2 "
            onClick={handleButton}
          >
            Register
          </button>

        </div>
      </div>
    </>
  );
}
