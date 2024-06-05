import React, { useState } from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

import Swal from "sweetalert2";
import axios from "axios";

export default function Login(props) {
  const showAlert = (data) => {
    Swal.fire({
      title: data.title, //"success",
      text: data.text, //"success",
      icon: data.icon, //"success",
      confirmButtonText: data.button,
    });
  };
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [unreadMsg, setUnreadMsg] = useState("");
  const [totalMsg, setTotalMsg] = useState("");

  const openBackdrop = () => {
    setBackdropOpen(true);
  };

  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  // Define a state to manage form submission

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmission = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Perform any form submission logic here, e.g., send data to a server
    console.log("email:", email);
    const BASEURL = props.BASEURL;
    //Loading
    openBackdrop();
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${BASEURL}/auth`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_access_token_here",
        },
      });

      response.data.credentials = formData;

      localStorage.setItem("LoginUser", JSON.stringify(response.data));

      setUserName(response.data.data.name);
      setUnreadMsg(response.data.metric.Unread);
      setTotalMsg(response.data.metric.Total);
      document.getElementById("greetings").style.display = "block";
      closeBackdrop();
      // redirect to dashboard
      // window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        showAlert({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          button: "Ok",
        });
      } else {
        console.error(error.message);
        showAlert({
          title: "Error",
          text: error.message,
          icon: "error",
          button: "Ok",
        });
      }
    } finally {
      closeBackdrop();
    }

    // Reset the form fields
  };

  return (
    <div>
      <div
        id="greetings"
        className="w3-display-container"
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          backgroundColor: "#00000063",
          display: "none",
        }}
      >
        <div
          className="w3-display-middle row-padding"
          style={{ width: "100%" }}
        >
          <div
            className="col-lg-6 offset-lg-3 w3-white"
            style={{ height: "50vh" }}
          >
            <div className="w3-display-middle" style={{ width: "100%" }}>
              <h4 className="p-3"> YOU ARE WELCOME</h4>
              <div className="p-3"> {username}</div>
              <div className="p-3">
                You have {unreadMsg} unread messages out of {totalMsg} total
              </div>
              <div className="p-3">
                <button
                  className="btn btn-primary px-5"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  View Messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backdropOpen}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <form onSubmit={handleFormSubmission}>
              <h5 className=" w3-text-pink pt-4 ">
                <b>Account Login</b>
              </h5>

              <br />
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <input
                className="form-control"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <br></br>
              <br></br>

              <button className="btn w-100 btn-secondary" type="submit">
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  BASEURL: PropTypes.string,
};
