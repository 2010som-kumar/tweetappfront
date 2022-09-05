import axios from "axios";

var check = false;
Authentication();
function Authentication() {
  const loginId = localStorage.getItem("loginId");
  const url = "https://cors-everywhere.herokuapp.com/http://Tweetappebs-env.eba-xx8ddgmq.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  axios(url + "check/" + loginId).then((e) => {
    check = e.data;
  });
}
export { check, Authentication };
