import React, { useEffect, useState } from "react";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFavoriteBorder, MdOutlineDoubleArrow } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import Reply from "./Reply";
import EditTweet from "./EditTweet";
import ViewAllReplyOnTweet from "./ViewAllReplyOnTweet";
export default function TweetComponent(props) {
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const [replyList, setReplyList] = useState([]);
  const [replyShow, setReplyShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [allReplyShow, setAllReplyShow] = useState(false);
  const [userLikeTweets, setUserLikeTweets] = useState([]);
  const [totalLikes, setTotalLikes] = useState({});
  const loginId = localStorage.getItem("loginId");
  const [tweet, setTweet] = useState({});

  useEffect(() => {
    const list = props.allTweets.filter(
      (val) => val.likes.filter((p) => p.loginId === loginId).length > 0
    );
    setUserLikeTweets(list);
    props.allTweets.map((e) => {     
       setTotalLikes((p) => ({ ...p, [e.tweetId]: e.likes.length }));
  });
  }, [props.allTweets, loginId]);

  const handleLikeButton = (tweetId) => {
    axios
      .put(url + loginId + "/like/" + tweetId)
      .then((e) => {
        if (e.data.likes.filter((p) => p.loginId === loginId).length > 0) {
          setUserLikeTweets(userLikeTweets.concat(e.data));
          setTotalLikes((e) => ({ ...e, [tweetId]: totalLikes[tweetId] + 1 }));
        } else {
          setUserLikeTweets(
            userLikeTweets.filter((e) => e.tweetId !== tweetId)
          );
          setTotalLikes((e) => ({ ...e, [tweetId]: totalLikes[tweetId] - 1 }));
        }
      })
      .catch((error) => {
        alert(error["response"]["data"]["error-message"]);
      });
  };
  const handleDeleteButton = (tweetId) => {
    axios
      .delete(url + loginId + "/delete/" + tweetId)
      .then((e) => {
        const all = props.allTweets.filter((p) => p.tweetId !== e.data.tweetId);
        alert("You have deleted this tweet");
        if (all.length > 0) {
          props.setAllTweet(all);
        } else {
          props.setflag(false);
        }
      })
      .catch((error) => {
        alert(error["response"]["data"]["error-message"]);
      });
  };

  const handleViewAllReplyOnTweet = (tweetId) => {
    axios
      .get(url + "allreplies/" + tweetId)
      .then((data) => {
        setReplyList(data.data);
        if (data.data.length > 0) {
          setAllReplyShow(!allReplyShow);
          setTweet(props.allTweets.filter((e) => e.tweetId === tweetId)[0]);
        }
      })
      .catch((error) => {
        alert(error["response"]["data"]["error-message"]);
      });
  };

  const handleEditButton = (id) => {
    setEditShow(!editShow);
    setTweet(props.allTweets.filter((e) => e.tweetId === id)[0]);
  };

  const handleReplyButton = (id) => {
    setReplyShow(!replyShow);
    setTweet(props.allTweets.filter((e) => e.tweetId === id)[0]);
  };

  const viewEditAndDeleteButton = (val) => {
    return (
      <>
        <button
          onClick={() => handleEditButton(val.tweetId)}
          style={{ border: "none", backgroundColor: "white" }}
        >
          <span>
            <FaEdit style={{ fontSize: "20px" }} />
          </span>
        </button>
        <EditTweet
          loadtweet={props.loadtweet}
          show={editShow}
          tweet={tweet}
          onHide={() => setEditShow(false)}
        />
        <button
          onClick={() => handleDeleteButton(val.tweetId)}
          style={{ border: "none", backgroundColor: "white" }}
        >
          <span>
            <RiDeleteBin5Line style={{ fontSize: "20px" }} />
          </span>
        </button>
      </>
    );
  };

  return (
    <>
      {props.allTweets
        .slice(0)
        .reverse()
        .map((val) => {
          return (
            <div
              className="d-flex justify-content-center mt-3"
              key={val.tweetId}
            >
              <div
                className=" p-3"
                style={{ zIndex: "5", right: "0", bottom: "0", width: "55%" }}
              >
                <div
                  id="liveToast"
                  className="toast show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-delay="2000"
                  style={{ maxWidth: "100%" }}
                >
                  <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..." />
                    <b className="mr-auto">{val.loginId}</b>
                    <p className="mr-3">{moment(val.timestamp).fromNow()}</p>
                    {props.viewedbutton ? viewEditAndDeleteButton(val) : ""}
                  </div>
                  <div className="toast-body">
                    <h6> {val.message}</h6>
                  </div>
                  <div className="toast-body">
                    <p> Tag : {val.tag}</p>

                    <div className="d-flex justify-content-center mt-3">
                      <button
                        onClick={() => handleLikeButton(val.tweetId)}
                        style={{ border: "none", backgroundColor: "white" }}
                      >
                        <span style={{ fontSize: "22px" }}>
                          {userLikeTweets.filter(
                            (e) => e.tweetId === val.tweetId
                          ).length !== 1 ? (
                            <MdFavoriteBorder />
                          ) : (
                            <FcLike />
                          )}
                        </span>
                      </button>
                      <span className="ml-1 mt-2" style={{ fontSize: "20px" }}>
                        {
                          totalLikes[
                            Object.keys(totalLikes).filter(
                              (e) => parseInt(e) === val.tweetId
                            )
                          ]
                        }
                      </span>

                      <button
                        style={{ border: "none", backgroundColor: "white" }}
                        onClick={() => handleReplyButton(val.tweetId)}
                      >
                        <span
                          className="ml-5 mt-2"
                          style={{ fontSize: "22px", color: "black" }}
                        >
                          <TbMessageCircle />
                        </span>
                      </button>

                      <Reply
                        show={replyShow}
                        tweet={tweet}
                        onHide={() => {
                          setReplyShow(false);
                        }}
                      />
                      <button
                        onClick={() => handleViewAllReplyOnTweet(val.tweetId)}
                        style={{ border: "none", backgroundColor: "white" }}
                      >
                        <span className="ml-5 mt-2">
                          <MdOutlineDoubleArrow style={{ fontSize: "20px" }} />
                        </span>
                      </button>
                      <ViewAllReplyOnTweet
                        tweet={tweet}
                        show={allReplyShow}
                        replylist={replyList}
                        onHide={() => setAllReplyShow(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
