import React, { useState } from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

import Swal from "sweetalert2";
import axios from "axios";

export default function Register(props) {
  const showAlert = (data) => {
    Swal.fire({
      title: data.title, //"success",
      text: data.text, //"success",
      icon: data.icon, //"success",
      confirmButtonText: data.button,
    });
  };
  const [backdropOpen, setBackdropOpen] = useState(false);

  const openBackdrop = () => {
    setBackdropOpen(true);
  };

  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  // Define a state to manage form submission

  const [name, setName] = useState("");
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
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${BASEURL}/users`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_access_token_here",
        },
      });

      console.log(response);
      closeBackdrop();
      props.changeViewState(2);
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
              <h5 className=" text-center w3-text-pink pt-4 ">
                <b>Account Registration</b>
              </h5>
              <br />
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                required
              />
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />{" "}
              <br />
              <br></br>
              <button className="btn w-100 btn-secondary" type="submit">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  BASEURL: PropTypes.string,
  changeViewState: PropTypes.func,
};
