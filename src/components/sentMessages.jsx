import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Menu from "./menu";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const SentMessages = ({ BASEURL }) => {
  const [userMessage, setUserMessage] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let loginUser = localStorage.getItem("LoginUser");
  loginUser = JSON.parse(loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASEURL}/messages/${loginUser.data.id}/user/sent`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginUser.token}`,
            },
          }
        );
        console.log(response.data.data.rows);
        setUserMessage(response.data.data.rows);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [BASEURL, loginUser.data.id, loginUser.token]);

  const handleMessageClick = (id) => {
    navigate(`/dashboard/view-message/${id}`);
  };

  return (
    <div className="card">
      <div className="card-header p-0 ">
        <div className="p-4">
          Messages
          <NavLink
            to="/dashboard/new-message"
            aria-current="page"
            className="btn btn-primary pt-1 pb-1 btn-sm w3-right"
          >
            New Message
          </NavLink>
        </div>
        <div className="p" style={{ overflow: "hidden" }}>
          <Menu BASEURL={BASEURL} />
        </div>
      </div>
      <div className="card-body p-0" style={{ height: "80vh" }}>
        {isLoading ? (
          <div className="p-4 text-center text-info">Loading...</div>
        ) : userMessage.length > 0 ? (
          userMessage.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-4 w3-hover-grey ${
                item.isRead ? "" : "bg-light"
              }`}
              style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
              onClick={() => handleMessageClick(item.id)}
            >
              <div>
                <small className="w3-right">
                  <i>To:</i> {item.toUserInfo.name}
                </small>
                <b> {item.subject}</b>
                {!item.isRead ? (
                  <span className="badge bg-primary ms-2">Unread</span>
                ) : (
                  <span className="badge bg-success ms-2">Read</span>
                )}
              </div>
              <div>{item.content.substring(0, 40)}... </div>
              <small className="w3-right bg-secondary px-3 rounded-3 text-white">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })
                  .replace("about", "")
                  .trim()}
              </small>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-danger">No Messages Found</div>
        )}
      </div>
    </div>
  );
};

SentMessages.propTypes = {
  BASEURL: PropTypes.string.isRequired,
};

export default SentMessages;
