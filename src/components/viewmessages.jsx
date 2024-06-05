import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

const ViewMessage = ({ BASEURL }) => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASEURL}/messages/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUser.token}`,
          },
        });
        console.log("data", response.data);
        setMessage(response.data.data);
        setLoading(false);

        // Mark the message as read
        if (!response.data.data.isRead) {
          await axios.put(
            `${BASEURL}/messages/${id}/read`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginUser.token}`,
              },
            }
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch message:", error);
      }
    };

    fetchMessage();
  }, [BASEURL, id, loginUser.token]);

  return (
    <div className="card">
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
        Message Details
      </div>
      <div className="card-body p-0" style={{ minHeight: "80vh" }}>
        {isLoading ? (
          <div className="p-4 text-center text-danger">Loading...</div>
        ) : message ? (
          <div className="p-4">
            <div className="">
              <span
                className={`badge ${
                  message.isRead ? "bg-success" : "bg-primary"
                }`}
              >
                {message.isRead ? "Read" : "Unread"}
              </span>
            </div>
            <div className=" pb-5" style={{ textAlign: "right" }}>
              <b>From:</b> <br />
              {message.fromUserInfo.name} ({message.fromUserInfo.email})
              <br />
              <b>Time:</b> {new Date(message.createdAt).toLocaleString()}
            </div>
            <div>
              <b>To:</b> {message.toUserInfo.name} ({message.toUserInfo.email})
            </div>
            <br />
            <i>Subject:</i>
            <div>
              <h5 style={{ textTransform: "capitalize" }}>{message.subject}</h5>
            </div>
            <br />
            <i>Message:</i> <br />
            <div
              className="p-3 mt-2 rounded-2"
              style={{ backgroundColor: "#eeeeee", minHeight: "200px" }}
            >
              {message.content}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-danger">Message not found</div>
        )}
      </div>
    </div>
  );
};

ViewMessage.propTypes = {
  BASEURL: PropTypes.string.isRequired,
};

export default ViewMessage;
