import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";

import LoginRegisterBG from "../LoginRegisterBG/LoginRegisterBG";
import UserTweets from "../Tweets/UserTweets";
import User from "../User/User";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginRegisterBG />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/users" element={<User />}></Route>
        <Route
          exact
          path="/mytweets"
          element={<UserTweets viewedbutton={true} />}
        ></Route>
        <Route
          exact
          path="*"
          element={
            <div className="d-flex justify-content-center">
              <h1 className="text-danger">Page Not Found</h1>
            </div>
          }
        ></Route>

        {/* <Route exact path='/allusers' element={<User/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}
