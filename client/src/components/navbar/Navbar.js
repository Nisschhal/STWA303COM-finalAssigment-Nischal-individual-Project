import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";

export const Navbar = ({ state, account }) => {
  const { contract } = state;

  const { voter, setVoter } = useContext(UserContext);
  return (
    <div className="nav">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Election_Commission%2C_Nepal.svg/1200px-Election_Commission%2C_Nepal.svg.png"
              alt=""
              width={"100px"}
            />
          </Link>
        </div>
        <div className="spacer"></div>
        <div className="navbar">
          <ul>
            <Link to="/voters" className="navbar-item">
              Voters
            </Link>
            <Link to="/candidates" className="navbar-item">
              Candidates
            </Link>
            <Link to="/voting" className="navbar-item">
              Voting
            </Link>
            {!voter.loggedIn ? (
              <div style={{ display: "inline" }}>
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
                <Link to="/sign-up" className="navbar-item">
                  Sign up
                </Link>
              </div>
            ) : (
              <Link
                to=""
                onClick={() =>
                  setVoter({
                    ...voter,
                    loggedIn: false,
                    winner: "",
                    winningParty: "",
                  })
                }
                className="navbar-item"
              >
                Logout
              </Link>
            )}
          </ul>
        </div>
      </div>
      <p
        class="text-muted lead text-left"
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
    </div>
  );
};
