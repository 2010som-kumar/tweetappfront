import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import TweetComponent from "../Tweets/TweetComponent";
import { check, Authentication } from "../Authentication/Authentication";
import "../Tweets/TweetButton.css";
import Tag from "../Tweets/Tag";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tweet, setTweet] = useState("");
  const [flag, setFlag] = useState(false);
  const [tagFlag, setTagFlag] = useState(true);
  const [tag, setTag] = useState("");
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const navigate = useNavigate();
  const [allTweets, setAllTweets] = useState([]);

  const loadTweet = async () => {
    Authentication();
    const res = await fetch(url + "all");
    setAllTweets(await res.json());
    if (!check) {
      navigate("/");
    }
  };
  useEffect(() => {
    loadTweet();
  }, []);

  const onChangeTag = () => {
    setTagFlag(!tagFlag);
  };

  const onChangeTweet = (e) => {
    if (e.target.name === "tweet") {
      setTweet(e.target.value);
      if (e.target.value.length > 0) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } else {
      setTag(e.target.value);
    }
  };

  const handleButton = () => {
    const loginId = localStorage.getItem("loginId");
    const data = {
      tag: tag,
      message: tweet,
    };

    axios
      .post(url + loginId + "/add", data)
      .then((data) => {
        console.log(data.data);
        loadTweet();
        setTweet("");
        setTag("");
        setTagFlag(true);
        setFlag(true);
        alert("You have successfully posted a tweet");
      })
      .catch((error) => {
        console.log(error["response"]["data"]["error-message"]);
        alert(error["response"]["data"]["error-message"]);
      });
  };

  return (
    <>
      <Menu />
      <div className="container">
        <div
          className="d-flex justify-content-center mt-5"
          style={{ width: "61%" }}
        >
          <h4 className="font-weight-bold">Home</h4>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <textarea
            maxLength={144}
            style={{ borderColor: "black", resize: "none" }}
            type="text"
            value={tweet}
            name="tweet"
            rows="4"
            cols="65"
            placeholder="What's Happening?"
            onChange={onChangeTweet}
          />
        </div>

        <Tag
          tagFlag={tagFlag}
          value={tag}
          onChangeTweet={onChangeTweet}
          onChangeTag={onChangeTag}
        />
        <hr
          style={{
            width: "45%",
          }}
        />
        <div
          className="d-flex justify-content-center mt-3"
          style={{ width: "138%" }}
        >
          <button
            className={flag ? "tweetButtonE" : "tweetButtonD"}
            disabled={!flag}
            type="submit"
            onClick={handleButton}
          >
            Tweet
          </button>
        </div>
        <TweetComponent
          loadtweet={() => {
            loadTweet();
          }}
          allTweets={allTweets}
          setAllTweets={setAllTweets}
        />
      </div>
    </>
  );
}
