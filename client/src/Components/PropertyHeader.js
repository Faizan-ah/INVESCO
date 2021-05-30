import React, { Component } from "react";
import "../StyleSheets/Header.css";
import { Link } from "react-router-dom";
export class PropertyHeader extends Component {
  state = {
    data: [],
  };

  render() {
    return (
      <div>
        <ul className="property-topbar">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          {/* <li><Link onClick={this.handleClick}><NotificationsIcon/></Link></li> */}
        </ul>
      </div>
    );
  }
}

export default PropertyHeader;
