import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Login/Register";
import logo2 from "../../images/logo2.png";
import main from "../../images/main.png";
import logo from "../../images/logo.png";

export default function LoginRegisterBG(props) {
  const [flag, setFlag] = useState(true);

  const handleChange = (e) => {
    setFlag(e);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <img src={logo} width="60" height="50" alt="" />
        <h4 style={{ color: "white", margin: "auto" }}>Tweet App</h4>
      </nav>
      <div style={{ display: "flex" }}>
        <div className="col-6">
          <img
            src={main}
            style={{
              position: "absolute",
              zIndex: "1",
              width: "100%",
              height: "131%",
            }}
            alt=""
          />
          <p style={{ textAlign: "center" }}>
            <img
              src={logo2}
              style={{
                position: "relative",
                top: "100px",
                zIndex: "2",
                width: "50%",
                height: "69%",
              }}
              alt=""
            />
          </p>
        </div>
        <div className="col-6">
          <div className="container">
            {flag ? (
              <Login handler={handleChange} />
            ) : (
              <Register handler={handleChange} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
