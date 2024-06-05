import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));

  console.log(loginUser);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg border-2 border-bottom fixed-top p-1"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container" style={{ height: "60px", width: "100vw" }}>
          <a className="navbar-brand p-0" href="#" style={{ outline: "none" }}>
            <img src="/logo.png" alt="Cadence" style={{ height: "50px" }} />
          </a>
          <div>
            <span className="mx-4">
              <span></span>
              {loginUser.data.name}
            </span>

            <NavLink
              to="/logout"
              aria-current="page"
              className=" btn btn-tertiary pt-1 pb-1 btn-sm  "
            >
              Logout
            </NavLink>
          </div>
        </div>
      </nav>

      {/* <menu
        className="border-2 border-warning p-1"
        style={{ backgroundColor: "#ff" }}
      >
        <div>
          <div id="navbarSupportedContent">
            <ul className="menu mb-0 px-0 mx-0">
              <li
                className="menu-item"
                style={{ paddingLeft: "80px", paddingTop: "60px" }}
              ></li>
              <li className="menu-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Inbox
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to="/reservation"
                  className="nav-link"
                  aria-current="page"
                >
                  Drafts
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/contact" className="nav-link" aria-current="page">
                  Sent
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </menu> */}
    </div>
  );
};

export default Header;
