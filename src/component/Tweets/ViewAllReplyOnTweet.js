import React from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";

export default function ViewAllReplyOnTweet(props) {
  const changeReplyButton = () => {
    props.onHide();
  };
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
          <h6>Message : {props.tweet.message}</h6>
          <p style={{ fontSize: "15px" }}>Tag : {props.tweet.tag}</p>
          <p>
            <b>All Replies</b>
          </p>
          {props.replylist.map((a) => {
            return (
              <>
                <div style={{borderStyle: 'inset'}}className="mt-3" key={a.replyId}>
                <span style={{fontSize:'12px'}} className="float-right mr-2">{moment(a.timestamp).fromNow()}</span>
                  <span style={{fontSize:'12px'}} className="float-right mr-2">Replied By <b>@{a.loginId}</b></span>
                 
                  <div className="ml-2">
                  <p><b>Reply:</b> {a.reply}</p>
                  <p><b>Tag:</b> {a.tag}</p>
                  </div>
                </div>
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center mt-2">
            <button className="tweetButtonE ml-2" onClick={changeReplyButton}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
