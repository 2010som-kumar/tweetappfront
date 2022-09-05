import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import { check, Authentication } from "../Authentication/Authentication";

export default function User(props) {
  const location = useLocation();
  const navigate = useNavigate();

  let loadRoute = async () => {
    Authentication();
    if (!check) {
      navigate("/");
    }
  };

  useEffect((e) => {
    loadRoute();
  }, []);

  return (
    <>
      <Menu />
      <div className="container">
        <h3 className="d-flex justify-content-center mt-2">
          {location.state[1]}
        </h3>
        {location.state[0].map((user) => {
          return (
            <div className="d-flex justify-content-center " key={user.loginId}>
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
                    <strong className="mr-auto">{user.loginId}</strong>
                  </div>
                  <div className="toast-body">
                    <h5>
                      Name : {user.firstName} {user.lastName}
                    </h5>
                    <h6> Email : {user.emailId}</h6>
                    <h6> Contact : {user.contactNumber}</h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
