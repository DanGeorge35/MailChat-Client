import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import NoPage from "./pages/404";
import UserLogoutPage from "./pages/logout";
import Dashboard from "./pages/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let BASEURL = "https://mailchatapi.posaccountant.com";
    return (
      <div>
        <Router>
          <Routes>
            <Route index element={<Home BASEURL={BASEURL} />} />
            <Route path="/" element={<Home BASEURL={BASEURL} />} />
            <Route path="/home" element={<Home BASEURL={BASEURL} />} />
            <Route
              path="/dashboard"
              element={<Dashboard BASEURL={BASEURL} />}
            />
            <Route
              path="/dashboard/new-message"
              element={<Dashboard BASEURL={BASEURL} PAGE="new-message" />}
            />

            <Route
              path="/dashboard/inbox"
              element={<Dashboard BASEURL={BASEURL} PAGE="allmessages" />}
            />
            <Route
              path="/dashboard/view-message/:id"
              element={<Dashboard BASEURL={BASEURL} PAGE="view-message" />}
            />
            <Route
              path="/dashboard/sent-messages"
              element={<Dashboard BASEURL={BASEURL} PAGE="sent-messages" />}
            />
            <Route
              path="/logout"
              element={<UserLogoutPage BASEURL={BASEURL} />}
            />
            <Route path="*" element={<NoPage BASEURL={BASEURL} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
