import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Menu() {
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setUser(e.target.value);
  };

  const handleAllUserButton = () => {
    axios
      .get(url + "users/all/")
      .then((e) => {
        navigate("/users", { state: [e.data, "All Users"] });
      })
      .catch((error) => {
        alert(error["response"]["data"]["error-message"]);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSearchButton = () => {
    if (user.length > 0) {
      axios
        .get(url + "user/search/" + user)
        .then((e) => {
          navigate("/users", { state: [e.data, "Search Users"] });
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
      setUser("");
    } else {
      alert("Please enter something!!!");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link className="nav-link active" aria-current="page" to="/home">
          {" "}
          <img src={logo} width="60" height="40" alt="" />
        </Link>
        <Link className="navbar-brand" to="">
          Tweet App
        </Link>
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Button
                  style={{ backgroundColor: "	#343a40", border: "none" }}
                  className="nav-link"
                  onClick={handleAllUserButton}
                >
                  All Users
                </Button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mytweets">
                  MyTweets
                </Link>
              </li>

              <div className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="search"
                  value={user}
                  placeholder="Search User"
                  aria-label="Search"
                  onChange={onChangeInput}
                />
                <Button onClick={() => handleSearchButton()}>
                  <FaSearch style={{ fontSize: "19px" }} />
                </Button>
              </div>
              <Button onClick={handleLogout} variant="danger ml-3">
                <IoMdLogOut style={{ fontSize: "22px" }} />
              </Button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
