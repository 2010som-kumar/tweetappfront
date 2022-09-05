import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import TweetComponent from "./TweetComponent";

export default function UserTweets(props) {
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

  const [flag, setFlag] = useState(true);
  const [myTweets, setMyTweets] = useState([]);
  const loginId = localStorage.getItem("loginId");

  let loadTweet = () => {
    axios(url + loginId)
      .then((e) => {
        setMyTweets(e.data);
      })
      .catch((error) => {
        setMyTweets([]);
      });
  };

  useEffect(() => {
    loadTweet();
  }, []);
  return (
    <>
      <Menu />
      <div className="d-flex justify-content-center mt-3 text-info">
        <h3>My All Tweets</h3>
      </div>

      {flag ? (
        <TweetComponent
          loadtweet={loadTweet}
          viewedbutton={props.viewedbutton}
          setAllTweet={setMyTweets}
          allTweets={myTweets}
          setflag={setFlag}
        />
      ) : (
        <div className="d-flex justify-content-center mt-3 text-info">
          No Tweet is Available
        </div>
      )}
    </>
  );
}
