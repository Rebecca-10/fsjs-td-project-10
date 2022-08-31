import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const {context} = props;
  const authUser = context.authenticatedUser;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          {/* <a href="index.html">Courses</a> */}
          <Link to={"/"}>Courses </Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName} </span>
                <li>
                  {/* <a href="sign-in.html">Sign In</a> */}
                  <Link to={"/signout"}>Sign Out</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  {/* <a href="sign-up.html">Sign Up</a> */}
                  <Link to={"/signup"}>Sign Up</Link>
                </li>
                <li>
                  {/* <a href="sign-in.html">Sign In</a> */}
                  <Link to={"/signin"}>Sign In</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
