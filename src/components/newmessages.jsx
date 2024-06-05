import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

const NewMessage = ({ BASEURL }) => {
  const [userLoadData, setUserData] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const navigate = useNavigate();
  let loginUser = localStorage.getItem("LoginUser");
  loginUser = JSON.parse(loginUser);

  const showAlert = (data, onSuccess) => {
    Swal.fire({
      title: data.title,
      text: data.text,
      icon: data.icon,
      confirmButtonText: data.button,
    }).then((result) => {
      if (result.isConfirmed && onSuccess) {
        onSuccess();
      }
    });
  };

  const [backdropOpen, setBackdropOpen] = useState(false);

  const openBackdrop = () => {
    setBackdropOpen(true);
  };

  const closeBackdrop = () => {
    setBackdropOpen(false);
  };

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setSearching(true);
        const response = await axios.get(`${BASEURL}/users/otherusers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUser.token}`,
          },
        });
        console.log(response.data.data);
        setUserData(response.data.data.rows);
        setSearching(false);
      } catch (error) {
        setSearching(false);
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [BASEURL, loginUser.token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("subject:", subject);
    console.log("message:", message);

    openBackdrop();
    const formData = {
      email: email,
      subject: subject,
      content: message,
    };

    try {
      const response = await axios.post(`${BASEURL}/messages`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginUser.token}`,
        },
      });
      closeBackdrop();
      showAlert(
        {
          title: "Success",
          text: response.data.message,
          icon: "success",
          button: "Ok",
        },
        () => {
          navigate("/dashboard"); // Navigate to messages page
        }
      );
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

    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleUserload = async (data) => {
    try {
      setSearching(true);
      const response = await axios.get(`${BASEURL}/users/${data}/findusers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginUser.token}`,
        },
        validateStatus: false,
      });
      setSearching(false);
      setUserData(response.data.data.rows);
    } catch (error) {
      setSearching(false);
      setUserData([]);
    }
  };

  const handleSelect = (data) => {
    document.getElementById("searchinput").value = data;
    setEmail(data);
    document.getElementById("searchpane").style.display = "none";
  };

  const timerRef = useRef(null);

  function loadUser(userData) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleUserload(userData);
    }, 2000);
  }

  console.log(BASEURL, loginUser);

  return (
    <div className="card">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSendMessage}>
        <div className="card-header pt-3 pb-3">
          <div className="pb-3 pt-2">
            <NavLink
              to="/dashboard"
              aria-current="page"
              className="btn rounded-5 btn-secondary pt-1 pb-1 pe-3 px-3"
            >
              <ArrowBackIosOutlinedIcon style={{ fontSize: "17px" }} /> Back
            </NavLink>
          </div>

          <div className="row">
            <div className="col-md-3 pt-3">
              <span>To</span>
            </div>
            <div className="col-md-9" style={{ position: "relative" }}>
              <div className="input-group">
                <input
                  id="searchinput"
                  className="form-control pt-1 pb-1 rounded-5 border-1"
                  placeholder="Recipient.."
                  onChange={(e) => loadUser(e.target.value)}
                  onFocus={() => {
                    document.getElementById("searchpane").style.display =
                      "block";
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    marginLeft: "10px",
                    marginTop: "-6px",
                    padding: "20px",
                  }}
                >
                  <span className="material-symbols-outlined">search</span>
                </span>
              </div>
              <div
                className="w3-card "
                id="searchpane"
                style={{
                  display: "none",
                  minHeight: "100px",
                  maxHeight: "200px",
                  backgroundColor: "#ddd",
                  position: "absolute",
                  width: "80%",
                  left: "10%",
                  marginTop: "2px",
                  borderRadius: "10px",
                  overflowY: "auto",
                }}
              >
                {userLoadData.length > 0 ? (
                  userLoadData.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 w3-hover-grey border-bottom border-2 border-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleSelect(item.email);
                      }}
                    >
                      <b>{item.name}</b> - <small>{item.email}</small>
                    </div>
                  ))
                ) : isSearching === true ? (
                  <div className="p-4 text-center text-info">Loading...</div>
                ) : (
                  <div
                    className="p-4 text-center text-danger"
                    onClick={() => {
                      document.getElementById("searchpane").style.display =
                        "none";
                    }}
                  >
                    No User Found
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-3 pt-3">
              <span>Subject</span>
            </div>
            <div className="col-md-9">
              <input
                className="form-control pt-1 pb-1 rounded-5 border-1"
                placeholder="Enter subject..."
                onChange={(e) => setSubject(e.target.value)}
                onClick={() => {
                  document.getElementById("searchpane").style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0" style={{ height: "80vh" }}>
          <textarea
            className="form-control mt-0 rounded-0 pt-4"
            style={{
              height: "60%",
              border: "none",
              borderBottom: "1px solid #ddd",
            }}
            placeholder="Write your message..."
            onClick={() => {
              document.getElementById("searchpane").style.display = "none";
            }}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="btn rounded-5 btn-secondary pt-1 pb-1 pe-3 px-3 m-4 w3-right"
          >
            Send Message <SendOutlinedIcon style={{ fontSize: "17px" }} />
          </button>
        </div>
      </form>
    </div>
  );
};

NewMessage.propTypes = {
  BASEURL: PropTypes.string,
};

export default NewMessage;
