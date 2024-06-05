import React, { useState } from "react";
import Banner from "../components/banner";
import Login from "../components/login";
import Signup from "../components/signup";
import SuccessRegistration from "../components/successregistered";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Home = ({ BASEURL }) => {
  const [viewState, setViewState] = useState(0);
  const loginUser = localStorage.getItem("LoginUser");

  const changeViewState = (view) => {
    setViewState(view);
  };

  if (loginUser) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div>
        <div className="container-fluid">
          <div className="row signSlideCover">
            <div
              className="col-lg-7 d-none d-lg-block"
              style={{ minHeight: "100vh" }}
            >
              <Banner />
            </div>
            <div
              className="col-lg-5 text-center pt-4"
              style={{ backgroundColor: "#f1f1f1", minHeight: "100vh" }}
            >
              <div className="signupLeftBase">
                <div className="text-center registerLogo">
                  <div>
                    <a href="/home">
                      <img
                        src="/logo.png"
                        alt="Cadence"
                        style={{ height: "80px", verticalAlign: "center" }}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  {viewState === 0 ? (
                    <div>
                      <Login BASEURL={BASEURL} />
                      <div className="text-center pt-4">
                        <span>Don&apos;t have an account?</span>
                        <br />
                        <br />
                        <span
                          className="animate__animated animate__fadeIn animate__infinite w3-hover-text-pink"
                          onClick={() => changeViewState(1)}
                          style={{
                            fontSize: "16px",
                            color: "#2c3248",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          &gt;&gt; REGISTER HERE &lt;&lt;
                        </span>
                        <br />
                      </div>
                    </div>
                  ) : viewState === 1 ? (
                    <div>
                      <Signup
                        BASEURL={BASEURL}
                        changeViewState={changeViewState}
                      />
                      <div className="text-center pt-4">
                        <span>Already have an account?</span>
                        <br />
                        <br />
                        <span
                          className="animate__animated animate__fadeIn animate__infinite w3-hover-text-pink"
                          onClick={() => changeViewState(0)}
                          style={{
                            fontSize: "16px",
                            color: "#2c3248",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          &gt;&gt; LOGIN HERE &lt;&lt;
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <SuccessRegistration />
                      <div className="text-center pt-4">
                        <br />
                        <br />
                        <span
                          className="animate__animated animate__fadeIn animate__infinite w3-hover-text-pink"
                          onClick={() => changeViewState(0)}
                          style={{
                            fontSize: "16px",
                            color: "#2c3248",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          LOGIN HERE
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Home.propTypes = {
  BASEURL: PropTypes.string,
};

export default Home;
