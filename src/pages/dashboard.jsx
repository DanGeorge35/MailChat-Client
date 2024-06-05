import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/header";
import InboxMessages from "../components/inboxMessages";
import SentMessages from "../components/sentMessages";
import ViewMessage from "../components/viewmessages";
import NewMessage from "../components/newmessages";
const Dashboard = ({ BASEURL, PAGE }) => {
  const loginUser = localStorage.getItem("LoginUser");
  console.log(BASEURL, loginUser);

  if (!PAGE) {
    return <Navigate to="inbox" />;
  }
  if (loginUser) {
    return (
      <div>
        <Header />

        <div className="row pt-5 mt-3">
          <div className="col-lg-6 offset-lg-3">
            {PAGE === "new-message" ? (
              <NewMessage BASEURL={BASEURL} />
            ) : PAGE === "view-message" ? (
              <ViewMessage BASEURL={BASEURL} />
            ) : PAGE === "sent-messages" ? (
              <SentMessages BASEURL={BASEURL} />
            ) : (
              <InboxMessages BASEURL={BASEURL} />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

Dashboard.propTypes = {
  BASEURL: PropTypes.string,
  PAGE: PropTypes.string,
};

export default Dashboard;
