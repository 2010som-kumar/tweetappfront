import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import moment from "moment";
import axios from 'axios';
import Tag from './Tag';
import "./TweetButton.css";
export default function EditTweet(props) {

  const url ="https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const loginId = localStorage.getItem("loginId");
const [tagFlag, setTagFlag] = useState(true);
const [flag, setFlag] = useState(true);
const [newMessage, setNewMessage] = useState("");
const [tag, setTag] = useState("");

useEffect(() => {
  setNewMessage(props.tweet.message);
  setTag(props.tweet.tag);
 
},[props.tweet]);
const onChangeTag = () => {
  console.log("onchangetag")
  setTagFlag(!tagFlag);
};

const changeEditButton = () => {
  console.log("changeEditButton")
  props.onHide();
  setFlag(false);
};

const onChangeInput = (e) => {
  console.log("onChangeInput")
  if (e.target.name === "message") {
    setNewMessage(e.target.value);
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
      message:newMessage
  }

  axios.put(url+loginId+"/update/"+props.tweet.tweetId,data)
  .then((e) => {
    setNewMessage("");
          alert(" Tweet Updated Successfully")
          props.onHide();
          props.loadtweet();
        
        
    })
    .catch((error) => {
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
      <h6> <div className="d-flex justify-content-center mt-3">
            <textarea
              maxLength={50}
              style={{ borderColor: "black", resize: "none" }}
              defaultValue={props.tweet.message}
              type="text"
              name="message"
              rows="5"
              cols="70"
              placeholder="What's Happening?"
              onChange={onChangeInput}
            />
          </div></h6>
          <Tag
            tagFlag={!tagFlag}
            onChangeTweet={onChangeInput}
            onChangeTag={onChangeTag}
            value={props.tweet.tag}
          />
       
         
         
      </Modal.Body>
      <Modal.Footer>
      <div className="d-flex justify-content-center mt-2">
            <button
              className={flag ? "tweetButtonE" : "tweetButtonD"}
              disabled={!flag}
              onClick={handleButton}

            >
              Update
            </button>
            <button className="tweetButtonE ml-2" onClick={changeEditButton}>
              Close
            </button>
          </div>
      </Modal.Footer>
    </Modal>
    </>
  )
}
