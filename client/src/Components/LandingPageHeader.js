import React from "react";
import "../StyleSheets/LandingHeader.css";
import { Link } from "react-router-dom";
function LandingPageHeader() {
  return (
    <div>
      <div>
        <ul className="landing-nav">
          <li>
            <Link to="/">INVESCO</Link>
          </li>
          <li>
            <Link to="/registration">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPageHeader;
