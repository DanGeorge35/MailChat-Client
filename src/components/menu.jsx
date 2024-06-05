import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const Menu = ({ BASEURL }) => {
  let loginUser = localStorage.getItem("LoginUser");
  loginUser = JSON.parse(loginUser);

  const [metrics, setMetrics] = useState({ Total: 0, Unread: 0 });
  const [isLoading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/messages/${loginUser.data.id}/user/metrics`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUser.token}`,
          },
        }
      );
      console.log(response.data);
      setMetrics(response.data.data.Metric);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();

    const intervalId = setInterval(fetchMetrics, 10000); // 10000ms = 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [BASEURL]);

  return (
    <div className="px-3">
      <NavLink
        to="/dashboard/inbox"
        aria-current="page"
        className="btn btn-sm pt-1 pb-1   nav-link"
        style={{ borderRadius: "10px 0px 0px 0px", border: "1px solid #ddd" }}
      >
        INBOX
      </NavLink>

      <NavLink
        to="/dashboard/sent-messages"
        className="btn btn-sm pt-1 pb-1 nav-link"
        style={{ borderRadius: "0px 10px 0px 0px", border: "1px solid #ddd" }}
      >
        SENT
      </NavLink>

      <small style={{ position: "absolute", right: "25px" }}>
        {isLoading
          ? "Loading..."
          : ` ${metrics.Unread} Unread  /  ${metrics.Total} Msg(s) `}
      </small>
    </div>
  );
};

Menu.propTypes = {
  BASEURL: PropTypes.string.isRequired,
};

export default Menu;
