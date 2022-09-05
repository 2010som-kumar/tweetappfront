import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import "./TweetButton.css";
import Tag from "./Tag";
import axios from "axios";
export default function Reply(props) {
    const url ="https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
    const loginId = localStorage.getItem("loginId");
  const [tagFlag, setTagFlag] = useState(true);
  const [flag, setFlag] = useState(false);
  const [reply, setReply] = useState();
  const [tag, setTag] = useState();
  const onChangeTag = () => {
    setTagFlag(!tagFlag);
  };

  const changeReplyButton = () => {
    props.onHide();
    setFlag(false);
  };
 
  const onChangeReply = (e) => {
    if (e.target.name === "reply") {
      setReply(e.target.value);
      if (e.target.value.length > 0) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } else {
      setTag(e.target.value);
    }
  };

  const handleButton=()=>{
    const data={
        tag:tag,
        reply:reply
    }
    axios.post(url+loginId+"/reply/"+props.tweet.tweetId,data)
    .then((e) => {
        setReply("");
        setFlag(true);
            alert("Replied Successfully")
            props.onHide();
          
      })
      .catch((error) => {
        console.log(error["response"]["data"]["error-message"]);
        alert(error["response"]["data"]["error-message"]);
      });
  }
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>{props.tweet.loginId}</strong>
            <small style={{ marginLeft: "20px", fontSize: "13px" }}>
              {moment(props.tweet.timestamp).fromNow()}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{props.tweet.message}</h6>
          <p style={{ fontSize: "15px" }}>Tag : {props.tweet.tag}</p>
          <p>
            Replying to <b>@{props.tweet.loginId}</b>
          </p>
          <div className="d-flex justify-content-center mt-3">
            <textarea
              maxLength={50}
              style={{ borderColor: "black", resize: "none" }}
              value={reply}
              type="text"
              name="reply"
              rows="5"
              cols="65"
              placeholder="What's Happening?"
              onChange={onChangeReply}
            />
          </div>
          <Tag
            tagFlag={tagFlag}
            onChangeTweet={onChangeReply}
            onChangeTag={onChangeTag}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center mt-2">
            <button
              className={flag ? "tweetButtonE" : "tweetButtonD"}
              disabled={!flag}
              onClick={handleButton}

            >
              Reply
            </button>
            <button className="tweetButtonE ml-2" onClick={changeReplyButton}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
